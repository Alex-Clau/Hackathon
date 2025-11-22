import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      privateKey: process.env.EXPO_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.EXPO_PUBLIC_FIREBASE_CLIENT_EMAIL,
    }),
  });
}

const db = admin.firestore();

export { db };

