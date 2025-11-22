import { db } from '../config/firebase.js';
import { getOfferById } from './offerService.js';

export const getUserOffers = async (userId) => {
  const snapshot = await db
    .collection('usersOffers')
    .where('userId', '==', userId)
    .get();

  const userOffers = [];
  for (const doc of snapshot.docs) {
    const userOfferData = doc.data();
    const offer = await getOfferById(userOfferData.offerId);

    if (offer) {
      userOffers.push({
        id: doc.id,
        offerId: userOfferData.offerId,
        userId: userOfferData.userId,
        status: userOfferData.status || 'pending',
        createdAt: userOfferData.createdAt,
        offer,
      });
    }
  }

  return userOffers;
};

