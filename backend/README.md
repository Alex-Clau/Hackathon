# 🔧 Backend API

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment

Create `.env` in `backend/`:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
EXPO_PUBLIC_FIREBASE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
EXPO_PUBLIC_FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GEMINI_API_KEY=your-gemini-key
API_HOST=YOUR_IP
PORT=3000
```

**Get credentials:**
- **Firebase config:** [Firebase Console](https://console.firebase.google.com/) → Project Settings → Your apps → Web app
- **Firebase Admin SDK:** Project Settings → Service Accounts → Generate new private key
- **Gemini API Key:** [Google AI Studio](https://makersuite.google.com/app/apikey)

**API_HOST:** Set to your machine's IP (same as `EXPO_PUBLIC_API_URL` in mobile app). Required for images to load on mobile devices.

### 3. Start Server
```bash
npm start
```

### 4. Initialize Database (Optional)
```bash
curl -X POST http://localhost:3000/api/init/all
```

## API Endpoints

- `GET /health` - Health check
- `GET /api/companies` - Get all companies
- `GET /api/offers?grouped=true` - Get offers grouped by company
- `POST /api/ai/quality-check` - AI quality check
- `POST /api/init/all` - Initialize database
