import { db } from '../config/firebase.js';
import { companies, offers, usersOffers } from '../data/initData.js';
import { initAdminMetadata } from './adminMetadataService.js';

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
  return { message: 'Users are now created via Firebase Auth. Use /api/init/admin-metadata to initialize admin metadata.' };
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

  const adminMetadataResult = await initAdminMetadata(companiesResult.companyIds);
  results.adminMetadata = adminMetadataResult;

  results.users = { message: 'Users are created via Firebase Auth on signup' };

  results.usersOffers = { message: 'User-offer relationships require existing users' };

  return results;
};

