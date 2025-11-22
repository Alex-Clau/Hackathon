import { useState, useCallback } from "react";
import { collection, query, where, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export interface UserOffer {
  id: string;
  userId: string;
  offerId: string;
  companyId?: string;
  status: "pending" | "active" | "redeemed";
  offer?: {
    id: string;
    productOfferName: string;
    discountSize: string;
    description?: string;
  };
}

export const usePendingOffers = (adminEmail: string | null) => {
  const [pendingOffers, setPendingOffers] = useState<UserOffer[]>([]);
  const [activeOffers, setActiveOffers] = useState<UserOffer[]>([]);
  const [loading, setLoading] = useState(false);

  const getAdminCompanyId = useCallback(async (adminEmail: string): Promise<string | null> => {
    try {
      const q = query(
        collection(db, "adminMetadata"),
        where("email", "==", adminEmail)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const adminData = snapshot.docs[0].data();
        return adminData.companyId || null;
      }
      return null;
    } catch (error) {
      console.error("Error fetching admin metadata:", error);
      return null;
    }
  }, []);

  const fetchUserOffers = useCallback(async (userId: string, adminEmail: string | null) => {
    if (!userId) {
      setPendingOffers([]);
      setActiveOffers([]);
      return;
    }

    try {
      setLoading(true);
      
      // Get admin's company ID (optional - we'll show all offers regardless)
      let adminCompanyId: string | null = null;
      if (adminEmail) {
        adminCompanyId = await getAdminCompanyId(adminEmail);
        if (!adminCompanyId) {
          console.warn("Admin company ID not found - will show all offers but disable actions");
        }
      }

      const q = query(
        collection(db, "usersOffers"),
        where("userId", "==", userId)
      );
      const snapshot = await getDocs(q);
      const offers = await Promise.all(
        snapshot.docs.map(async (docSnapshot) => {
          const data = docSnapshot.data();
          
          try {
            const offerDoc = await getDoc(doc(db, "offers", data.offerId));
            if (!offerDoc.exists()) {
              return null;
            }
            
            const offerData = offerDoc.data();
            
            // Filter by company ID if admin - only show offers from admin's company
            if (adminCompanyId) {
              const userOfferCompanyId = data.companyId ? String(data.companyId) : null;
              const offerCompanyId = offerData.companyId ? String(offerData.companyId) : null;
              const adminCompanyIdStr = String(adminCompanyId);
              
              // Include if either the userOffer.companyId or offer.companyId matches the admin's company
              const matchesCompany = 
                (userOfferCompanyId && userOfferCompanyId === adminCompanyIdStr) || 
                (offerCompanyId && offerCompanyId === adminCompanyIdStr);
              
              if (!matchesCompany) {
                return null;
              }
            }
            
            return {
              id: docSnapshot.id,
              userId: data.userId,
              offerId: data.offerId,
              companyId: data.companyId || offerData.companyId,
              status: data.status || "pending",
              offer: {
                id: offerDoc.id,
                productOfferName: offerData.productOfferName,
                discountSize: offerData.discountSize,
                description: offerData.description || '',
              },
            };
          } catch (error) {
            console.error("Error fetching offer details:", error);
            return null;
          }
        })
      );
      const validOffers = offers.filter((o) => o !== null && o.offer) as UserOffer[];
      const pending = validOffers.filter((o) => o.status === "pending");
      const active = validOffers.filter((o) => o.status === "active");
      setPendingOffers(pending);
      setActiveOffers(active);
    } catch (error) {
      console.error("Error fetching user offers:", error);
    } finally {
      setLoading(false);
    }
  }, [getAdminCompanyId]);

  const activateOffer = async (userOfferId: string): Promise<boolean> => {
    try {
      // Get the user offer to check the offer details
      const userOfferDoc = await getDoc(doc(db, "usersOffers", userOfferId));
      if (!userOfferDoc.exists()) {
        console.error("User offer not found:", userOfferId);
        return false;
      }

      const userOfferData = userOfferDoc.data();
      const offerId = userOfferData.offerId;

      // Check if the offer is expired
      const offerDoc = await getDoc(doc(db, "offers", offerId));
      if (!offerDoc.exists()) {
        console.error("Offer not found:", offerId);
        return false;
      }

      const offerData = offerDoc.data();
      const offerEndDate = offerData.offerEndDate?.toDate 
        ? offerData.offerEndDate.toDate() 
        : new Date(offerData.offerEndDate);
      
      if (offerEndDate <= new Date()) {
        console.error("Cannot activate expired offer:", offerId);
        return false;
      }

      await updateDoc(doc(db, "usersOffers", userOfferId), {
        status: "active",
      });
      
      // Refresh offers after activation
      const userId = userOfferData.userId;
      if (userId) {
        await fetchUserOffers(userId, adminEmail);
      }
      return true;
    } catch (error) {
      console.error("Error activating offer:", error);
      return false;
    }
  };

  const redeemOffer = async (userOfferId: string): Promise<boolean> => {
    try {
      await updateDoc(doc(db, "usersOffers", userOfferId), {
        status: "redeemed",
      });
      // Refresh offers after redemption
      const userOfferDoc = await getDoc(doc(db, "usersOffers", userOfferId));
      if (userOfferDoc.exists()) {
        const userId = userOfferDoc.data().userId;
        if (userId) {
          await fetchUserOffers(userId, adminEmail);
        }
      }
      return true;
    } catch (error) {
      console.error("Error redeeming offer:", error);
      return false;
    }
  };

  return {
    pendingOffers,
    activeOffers,
    loading,
    fetchPendingOffers: fetchUserOffers,
    activateOffer,
    redeemOffer,
  };
};

