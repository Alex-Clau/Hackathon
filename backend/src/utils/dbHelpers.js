import { db } from '../config/firebase.js';
import { companies, offers } from '../data/initData.js';

export const getCompanyIdsByOrder = async () => {
  const snapshot = await db.collection('companies').get();
  if (snapshot.empty) {
    return [];
  }

  const companiesMap = new Map();
  snapshot.docs.forEach((doc) => {
    companiesMap.set(doc.data().name, doc.id);
  });

  return companies.map((company) => companiesMap.get(company.name)).filter(Boolean);
};

export const getUserIdsByOrder = async () => {
  const snapshot = await db.collection('users').get();
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map((doc) => doc.id);
};

export const getOfferIdsByOrder = async () => {
  const companyIds = await getCompanyIdsByOrder();
  if (companyIds.length === 0) {
    return [];
  }

  const snapshot = await db.collection('offers').get();
  if (snapshot.empty) {
    return [];
  }

  const offersMap = new Map();
  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    const key = `${data.companyId}-${data.productOfferName}`;
    offersMap.set(key, doc.id);
  });

  return offers.map((offer) => {
    const companyId = companyIds[offer.companyIndex];
    if (!companyId) return null;
    const key = `${companyId}-${offer.productOfferName}`;
    return offersMap.get(key);
  }).filter(Boolean);
};
