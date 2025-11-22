import { db } from '../config/firebase.js';
import { getOffersByCompanyId } from './offerService.js';

export const getAdminStats = async (companyId) => {
  const offers = await getOffersByCompanyId(companyId);
  
  const now = new Date();
  const activeOffers = offers.filter((offer) => {
    const endDate = offer.offerEndDate?.toDate ? offer.offerEndDate.toDate() : new Date(offer.offerEndDate);
    return endDate > now;
  });
  const expiredOffers = offers.filter((offer) => {
    const endDate = offer.offerEndDate?.toDate ? offer.offerEndDate.toDate() : new Date(offer.offerEndDate);
    return endDate <= now;
  });

  const usersOffersSnapshot = await db
    .collection('usersOffers')
    .get();

  const companyOfferIds = new Set(offers.map((o) => o.id));
  const totalEngagements = usersOffersSnapshot.docs.filter((doc) =>
    companyOfferIds.has(doc.data().offerId)
  ).length;

  return {
    totalOffers: offers.length,
    activeOffers: activeOffers.length,
    expiredOffers: expiredOffers.length,
    totalEngagements,
    offers: offers.map((offer) => {
      const endDate = offer.offerEndDate?.toDate ? offer.offerEndDate.toDate() : new Date(offer.offerEndDate);
      return {
        id: offer.id,
        productOfferName: offer.productOfferName,
        discountSize: offer.discountSize,
        offerEndDate: offer.offerEndDate,
        isActive: endDate > now,
      };
    }),
  };
};

