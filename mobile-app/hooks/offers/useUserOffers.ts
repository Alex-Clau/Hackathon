import { useState, useEffect, useCallback } from "react";
import { collection, query, where, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useAuthContext } from "../../contexts/AuthContext";

export interface UserOffer {
  id: string;
  userId: string;
  offerId: string;
  companyId?: string;
  status: "pending" | "active" | "redeemed";
  createdAt: any;
    offer?: {
      id: string;
      productOfferName: string;
      discountSize: string;
      description?: string;
      offerEndDate: any;
    };
}

export const useUserOffers = () => {
  const { user } = useAuthContext();
  const [userOffers, setUserOffers] = useState<UserOffer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserOffers = useCallback(async () => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const q = query(
        collection(db, "usersOffers"),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const offers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserOffer[];

      // Fetch offer details for each user offer
      const offersWithDetails = await Promise.all(
        offers.map(async (userOffer) => {
          try {
            const offerDoc = await getDoc(doc(db, "offers", userOffer.offerId));
            if (offerDoc.exists()) {
              const offerData = offerDoc.data();
              return {
                ...userOffer,
                offer: {
                  id: offerDoc.id,
                  productOfferName: offerData.productOfferName,
                  discountSize: offerData.discountSize,
                  offerEndDate: offerData.offerEndDate,
                },
              };
            }
            return userOffer;
          } catch {
            return userOffer;
          }
        })
      );

      setUserOffers(offersWithDetails);
    } catch (error) {
      console.error("Error fetching user offers:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    fetchUserOffers();
  }, [fetchUserOffers]);

  const activateOffer = async (offerId: string, companyId: string): Promise<boolean> => {
    if (!user?.uid) return false;

    // Check if offer is already activated
    const alreadyActivated = userOffers.some(
      (uo) => uo.offerId === offerId && uo.status !== "redeemed"
    );
    if (alreadyActivated) {
      return false;
    }

    try {
      await addDoc(collection(db, "usersOffers"), {
        userId: user.uid,
        offerId,
        companyId,
        status: "pending",
        createdAt: new Date(),
      });
      await fetchUserOffers();
      return true;
    } catch (error) {
      console.error("Error activating offer:", error);
      return false;
    }
  };

  return { userOffers, loading, activateOffer, refresh: fetchUserOffers };
};

