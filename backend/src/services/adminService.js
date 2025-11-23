import { db } from '../config/firebase.js';
import { getOffersByCompanyId } from './offerService.js';

export const getAdminStats = async (companyId) => {
  const offers = await getOffersByCompanyId(companyId);
  
  const now = new Date();
  const activeOffers = offers.filter((offer) => {
    if (!offer.offerEndDate) return false;
    const endDate = offer.offerEndDate?.toDate ? offer.offerEndDate.toDate() : new Date(offer.offerEndDate);
    return endDate > now;
  });
  const expiredOffers = offers.filter((offer) => {
    if (!offer.offerEndDate) return true;
    const endDate = offer.offerEndDate?.toDate ? offer.offerEndDate.toDate() : new Date(offer.offerEndDate);
    return endDate <= now;
  });

  const companyOfferIds = new Set(offers.map((o) => o.id));
  
  // Query usersOffers that match company's offer IDs (limit of 10)
  const companyOfferIdsArray = Array.from(companyOfferIds);
  let usersOffersSnapshot;
  
  if (companyOfferIdsArray.length <= 10 && companyOfferIdsArray.length > 0) {
    usersOffersSnapshot = await db
      .collection('usersOffers')
      .where('offerId', 'in', companyOfferIdsArray)
      .get();
  } else {
    // Get all user offers and filter in memory (companies with >10 offers)
    usersOffersSnapshot = await db
      .collection('usersOffers')
      .get();
  }

  // Count only active and redeemed offers (not pending) as engagements
  const totalEngagements = usersOffersSnapshot.docs.filter((doc) => {
    const data = doc.data();
    const offerId = data.offerId;
    const status = data.status || 'pending';
    
    // Check if this offer belongs to the company AND is active/redeemed
    return companyOfferIds.has(offerId) && (status === 'active' || status === 'redeemed');
  }).length;

  return {
    totalOffers: offers.length,
    activeOffers: activeOffers.length,
    expiredOffers: expiredOffers.length,
    totalEngagements,
    offers: offers.map((offer) => {
      const endDate = offer.offerEndDate?.toDate ? offer.offerEndDate.toDate() : new Date(offer.offerEndDate);
      // Convert Firestore Timestamp to ISO string for API response
      const offerEndDateValue = offer.offerEndDate?.toDate 
        ? offer.offerEndDate.toDate().toISOString()
        : (offer.offerEndDate instanceof Date 
          ? offer.offerEndDate.toISOString() 
          : offer.offerEndDate);
      return {
        id: offer.id,
        productOfferName: offer.productOfferName,
        discountSize: offer.discountSize,
        description: offer.description || '',
        offerEndDate: offerEndDateValue,
        isActive: endDate > now,
      };
    }),
  };
};

