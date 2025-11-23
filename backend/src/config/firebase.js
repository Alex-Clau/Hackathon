import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, readFileSync } from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const serviceAccountPath = join(__dirname, '../../serviceAccountKey.json');

if (!admin.apps.length) {
  try {
    if (existsSync(serviceAccountPath)) {
      const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('Firebase Admin SDK initialized using serviceAccountKey.json');
    } else {
      const projectId = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID;
      let privateKey = process.env.EXPO_PUBLIC_FIREBASE_PRIVATE_KEY;
      const clientEmail = process.env.EXPO_PUBLIC_FIREBASE_CLIENT_EMAIL;

      if (!projectId || !privateKey || !clientEmail) {
        throw new Error(
          'Missing Firebase Admin SDK credentials.'
        );
      }

      privateKey = privateKey.replace(/^"|"$/g, '').replace(/,$/, '').trim();

      if (privateKey.includes('\\n') && !privateKey.includes('\n')) {
        privateKey = privateKey.replace(/\\n/g, '\n');
      }

      if (!privateKey.includes('BEGIN PRIVATE KEY') || !privateKey.includes('END PRIVATE KEY')) {
        throw new Error(
          'Invalid private key format.'
        );;
      }

      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          privateKey,
          clientEmail,
        }),
      });
      console.log('Firebase Admin SDK initialized using env');
    }
  } catch (error) {
    console.error('Firebase Admin SDK initialization failed:');
    console.error('Error details:', error.message);
    throw error;
  }
}

const db = admin.firestore();

export { db };

