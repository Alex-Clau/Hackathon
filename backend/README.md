# 🔧 Backend API

> REST API server for managing companies, offers, and AI-powered quality checks.

---

## ⚡ Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
API_HOST=192.168.34.48
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
EXPO_PUBLIC_FIREBASE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GEMINI_API_KEY=your-gemini-key
```

### 3. Get Your Credentials

**Firebase Admin SDK:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Project Settings → Service Accounts
3. Click "Generate new private key"
4. Copy values to `.env`

**Google Gemini API:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to `.env` as `GEMINI_API_KEY`

### 4. Start Server

```bash
npm start
```

> 🎉 Server is running at `http://localhost:3000`

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

**Happy coding! 🚀**
