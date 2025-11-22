import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const projectId = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID;
  let privateKey = process.env.EXPO_PUBLIC_FIREBASE_PRIVATE_KEY;
  const clientEmail = process.env.EXPO_PUBLIC_FIREBASE_CLIENT_EMAIL;

  if (!projectId || !privateKey || !clientEmail) {
    throw new Error(
      'Missing Firebase Admin SDK credentials. Please set in .env:\n' +
      '  - EXPO_PUBLIC_FIREBASE_PROJECT_ID\n' +
      '  - EXPO_PUBLIC_FIREBASE_PRIVATE_KEY (with \\n for newlines, all on one line)\n' +
      '  - EXPO_PUBLIC_FIREBASE_CLIENT_EMAIL\n\n' +
      'Get these from: Firebase Console → Project Settings → Service Accounts → Generate New Private Key'
    );
  }

  // Clean up the private key - handle multiple formats
  // Remove surrounding quotes, commas, and whitespace that might come from JSON
  privateKey = privateKey
    .replace(/^["']+|["']+$/g, '')  // Remove surrounding quotes
    .replace(/,\s*$/, '')            // Remove trailing comma (from JSON)
    .trim();
  
  // If it has \n escape sequences, convert them to actual newlines
  // If it already has actual newlines, that's fine - keep them
  if (privateKey.includes('\\n') && !privateKey.includes('\n')) {
    privateKey = privateKey.replace(/\\n/g, '\n');
  }
  
  // Ensure proper newline at the end if missing
  if (!privateKey.endsWith('\n')) {
    privateKey += '\n';
  }

  // Validate private key format
  if (!privateKey.includes('BEGIN PRIVATE KEY') || !privateKey.includes('END PRIVATE KEY')) {
    throw new Error(
      'Invalid private key format. The key must include:\n' +
      '  -----BEGIN PRIVATE KEY-----\n' +
      '  ...key content...\n' +
      '  -----END PRIVATE KEY-----'
    );
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        privateKey,
        clientEmail,
      }),
    });
  } catch (error) {
    console.error('Firebase Admin SDK initialization failed:');
    console.error('Project ID:', projectId);
    console.error('Client Email:', clientEmail);
    console.error('Private Key starts with:', privateKey.substring(0, 50));
    console.error('Private Key ends with:', privateKey.substring(privateKey.length - 50));
    throw error;
  }
}

const db = admin.firestore();

export { db };

