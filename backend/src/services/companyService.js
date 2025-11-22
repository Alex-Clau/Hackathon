import { db } from '../config/firebase.js';

export const getAllCompanies = async () => {
  const snapshot = await db.collection('companies').get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getCompanyById = async (companyId) => {
  const doc = await db.collection('companies').doc(companyId).get();
  if (!doc.exists) {
    return null;
  }
  return {
    id: doc.id,
    ...doc.data(),
  };
};

