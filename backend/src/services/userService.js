import { db } from '../config/firebase.js';

export const getUserByUid = async (uid) => {
  const doc = await db.collection('users').doc(uid).get();
  if (!doc.exists) {
    return null;
  }
  return doc.data();
};

export const createOrUpdateUser = async (uid, userData) => {
  const userRef = db.collection('users').doc(uid);
  const doc = await userRef.get();

  if (doc.exists) {
    // Only update fields that are provided, don't overwrite existing totalKgDonated if not provided
    const updateData = { ...userData, updatedAt: new Date() };
    await userRef.update(updateData);
  } else {
    // Initialize new user with default values for donation tracking
    await userRef.set({
      ...userData,
      totalKgDonated: userData.totalKgDonated !== undefined ? userData.totalKgDonated : 0,
      donations: userData.donations || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return getUserByUid(uid);
};

export const getAdminMetadataByEmail = async (email) => {
  const snapshot = await db
    .collection('adminMetadata')
    .where('email', '==', email)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  };
};

