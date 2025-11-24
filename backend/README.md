# 🔧 Backend API

> REST API server for managing companies, offers, and AI-powered quality checks.

> ⚠️ **Important:** Set up the backend first before setting up the mobile app, as the mobile app depends on the backend API.

---

## ⚡ Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the `backend/` directory:

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
```

### 3. Get Your Credentials

<details>
<summary>🔥 <strong>Firebase Configuration</strong></summary>

**Firebase Web App Config:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Project Settings → General → Your apps → Web app (click `</>` icon)
4. Copy these values to your `.env` file:
   - `apiKey` → `EXPO_PUBLIC_FIREBASE_API_KEY`
   - `authDomain` → `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `projectId` → `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
   - `storageBucket` → `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `messagingSenderId` → `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `appId` → `EXPO_PUBLIC_FIREBASE_APP_ID`

**Firebase Admin SDK (for backend):**
1. In Firebase Console: Project Settings → Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Copy `client_email` → `EXPO_PUBLIC_FIREBASE_CLIENT_EMAIL`
5. Copy `private_key` → `EXPO_PUBLIC_FIREBASE_PRIVATE_KEY` (keep the quotes and `\n` characters)

</details>

<details>
<summary>🤖 <strong>Google Gemini API Key</strong></summary>

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key to your `.env` file as `GEMINI_API_KEY`

</details>

### 4. Start Server

```bash
npm start
```

> 🎉 Server is running at `http://localhost:3000`

### 5. Initialize Database (Optional)

To seed the database with sample companies and offers:

```bash
curl -X POST http://localhost:3000/api/init/all
```

This will create:
- Sample companies (Nike, Adidas, Zara, H&M, Puma)
- Sample offers for each company
- Admin metadata for testing

---

## 📡 API Endpoints

### Health Check
```
GET /health
```

### Companies
```
GET /api/companies              # Get all companies
GET /api/companies/:id          # Get company by ID
```

### Offers
```
GET /api/offers                 # Get all offers
GET /api/offers?grouped=true    # Get offers grouped by company
GET /api/offers/:id             # Get offer by ID
```

### AI Quality Check
```
POST /api/ai/quality-check
Body: { "image": "base64ImageString" }
Returns: { tier, qualityScore, confidence, recommendation, ... }
```

### Database Initialization
```
POST /api/init/all              # Initialize all data
POST /api/init/companies        # Initialize companies only
POST /api/init/offers           # Initialize offers only
```

---



