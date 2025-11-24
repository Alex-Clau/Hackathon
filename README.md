<h1 style="color: #2E7D32;">🌱 Eco Rewards - Sustainable Fashion App</h1>

<p style="color: #FFD700; font-weight: bold;">🏆 <strong>Award-Winning Hackathon Project</strong></p>

> A mobile app that uses AI to help you make sustainable fashion choices. Assess clothing quality, donate responsibly, and earn rewards from eco-friendly brands.

## ✨ What It Does

Transform your wardrobe into a force for good! This app helps you:

### For Users 👤
- 🤖 **AI Quality Check** - Snap a photo, get instant recommendations (DONATE/RECYCLE/REJECT)
- 🎁 **Exclusive Offers** - Unlock discounts from sustainable fashion brands
- 🏆 **Earn Badges** - Track your environmental impact and earn rewards (1kg, 50kg, 100kg, 200kg milestones)
- 📱 **QR Codes** - Generate and scan QR codes for easy offer redemption
- 📊 **Impact Dashboard** - See your CO₂ saved, water saved, and landfill space saved
- 👤 **User Profile** - View donation history, earned badges, and account information
- 📸 **Photo Analysis** - AI-powered clothing condition assessment with detailed recommendations

### For Administrators 👨‍💼
- 📈 **Statistics Dashboard** - View total offers, active/expired offers, and user engagements
- ✅ **Offer Management** - Activate and redeem user offers with one click
- 📋 **Pending Offers** - Review and manage pending offer requests
- 📊 **Analytics** - Track company performance and user engagement metrics
- 🔍 **User Insights** - Monitor donation activity and offer redemption rates

---

## 🚀 Quick Start

### Step 1: Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env` file:

```env
PORT=3000
API_HOST=192.168.34.48  # Your local IP address
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
EXPO_PUBLIC_FIREBASE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GEMINI_API_KEY=your-gemini-key
```

> 💡 **Need credentials?**
> - **Firebase**: Go to [Firebase Console](https://console.firebase.google.com/) → Project Settings → Service Accounts → Generate new private key
> - **Gemini AI**: Get your key at [Google AI Studio](https://makersuite.google.com/app/apikey)

Start the server:

```bash
npm start
```

✅ Server running at `http://localhost:3000`

---

### Step 2: Mobile App Setup

```bash
cd mobile-app
npm install
```

Create `mobile-app/.env` file:

```env
EXPO_PUBLIC_API_URL=http://192.168.34.48:3000/api
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
```

> 💡 **Firebase Config**: Firebase Console → Project Settings → General → Your apps → Web app (click `</>` icon)

Start the app:

```bash
npm start
```

Then:
- Press `i` for iOS Simulator
- Press `a` for Android Emulator  
- Scan QR code with [Expo Go](https://expo.dev/go) on your phone

---

### Step 3: Initialize Database (Optional)

Seed the database with sample data:

```bash
curl -X POST http://localhost:3000/api/init/all
```

---

## 🎥 Demo Videos

> 💡 **Tip:** For the best understanding of the app, play both videos concurrently!

<div align="center">
  <table>
    <tr>
      <td align="center" width="50%">
        <h3>👤 User Experience</h3>
        <video width="100%" controls style="border-radius: 8px; max-width: 500px;">
          <source src="https://github.com/Alex-Clau/Hackathon/releases/download/Demo/DemoClient.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </td>
      <td align="center" width="50%">
        <h3>👨‍💼 Admin Dashboard</h3>
        <video width="100%" controls style="border-radius: 8px; max-width: 500px;">
          <source src="https://github.com/Alex-Clau/Hackathon/releases/download/Demo/DemoAdmin.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </td>
    </tr>
  </table>
</div>

---

## 🛠️ Built With

**Backend**
- Node.js + Express
- Firebase (Firestore)
- Google Gemini AI

**Mobile**
- React Native + Expo
- Firebase Auth
- NativeWind (Tailwind for RN)

---

**Made with ❤️ for a sustainable future**
