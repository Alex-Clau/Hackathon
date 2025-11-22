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
          'Missing Firebase Admin SDK credentials.\n\n' +
          'Option 1 (Recommended): Place serviceAccountKey.json in the backend folder\n' +
          '  Get it from: Firebase Console → Project Settings → Service Accounts → Generate New Private Key\n\n' +
          'Option 2: Set environment variables:\n' +
          '  - EXPO_PUBLIC_FIREBASE_PROJECT_ID\n' +
          '  - EXPO_PUBLIC_FIREBASE_PRIVATE_KEY (with \\n for newlines, all on one line)\n' +
          '  - EXPO_PUBLIC_FIREBASE_CLIENT_EMAIL'
        );
      }

      privateKey = privateKey.replace(/^"|"$/g, '').replace(/,$/, '').trim();

      if (privateKey.includes('\\n') && !privateKey.includes('\n')) {
        privateKey = privateKey.replace(/\\n/g, '\n');
      }

      if (!privateKey.includes('BEGIN PRIVATE KEY') || !privateKey.includes('END PRIVATE KEY')) {
        throw new Error(
          'Invalid private key format. The key must include:\n' +
          '  -----BEGIN PRIVATE KEY-----\n' +
          '  ...key content...\n' +
          '  -----END PRIVATE KEY-----'
        );
      }

      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          privateKey,
          clientEmail,
        }),
      });
      console.log('Firebase Admin SDK initialized using environment variables');
    }
  } catch (error) {
    console.error('Firebase Admin SDK initialization failed:');
    console.error('Error details:', error.message);
    throw error;
  }
}

const db = admin.firestore();

export { db };

