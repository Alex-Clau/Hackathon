import { db } from '../config/firebase.js';
import { companies, offers, users, usersOffers } from '../data/initData.js';

export const initCompanies = async () => {
  const companyIds = [];
  for (const company of companies) {
    const docRef = await db.collection('companies').add(company);
    companyIds.push(docRef.id);
  }
  return { companyIds, count: companyIds.length };
};

export const initOffers = async (companyIds) => {
  if (!companyIds || companyIds.length === 0) {
    throw new Error('Company IDs required');
  }

  const offerIds = [];
  for (const offer of offers) {
    const companyId = companyIds[offer.companyIndex];
    if (!companyId) continue;

    const docRef = await db.collection('offers').add({
      companyId,
      productOfferName: offer.productOfferName,
      discountSize: offer.discountSize,
      offerEndDate: offer.offerEndDate,
      createdAt: new Date(),
    });
    offerIds.push(docRef.id);
  }
  return { offerIds, count: offerIds.length };
};

export const initUsers = async () => {
  const userIds = [];
  for (const user of users) {
    const docRef = await db.collection('users').add({
      name: user.name,
      email: user.email,
    });
    userIds.push(docRef.id);
  }
  return { userIds, count: userIds.length };
};

export const initUsersOffers = async (userIds, offerIds) => {
  if (!userIds || userIds.length === 0 || !offerIds || offerIds.length === 0) {
    throw new Error('User IDs and Offer IDs required');
  }

  const relationshipIds = [];
  for (const userOffer of usersOffers) {
    const userId = userIds[userOffer.userIndex];
    const offerId = offerIds[userOffer.offerIndex];

    if (!userId || !offerId) continue;

    const docRef = await db.collection('usersOffers').add({
      userId,
      offerId,
    });
    relationshipIds.push(docRef.id);
  }
  return { relationshipIds, count: relationshipIds.length };
};

export const initAll = async () => {
  const results = {};

  const companiesResult = await initCompanies();
  results.companies = companiesResult;

  const offersResult = await initOffers(companiesResult.companyIds);
  results.offers = offersResult;

  const usersResult = await initUsers();
  results.users = usersResult;

  const usersOffersResult = await initUsersOffers(
    usersResult.userIds,
    offersResult.offerIds
  );
  results.usersOffers = usersOffersResult;

  return results;
};

