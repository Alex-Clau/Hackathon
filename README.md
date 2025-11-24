# 🌱 Eco Rewards - Sustainable Fashion App

[![Award Winner](https://img.shields.io/badge/🏆-Award--Winning%20Hackathon%20Project-FFD700?style=for-the-badge&logo=trophy)](https://github.com/Alex-Clau/Hackathon)

> A mobile app that uses AI to help you make sustainable fashion choices. Assess clothing quality, donate responsibly, and earn rewards from eco-friendly brands.

---

## 🛠️ Built With

### Backend

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

### Mobile

[![React Native](https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Firebase Auth](https://img.shields.io/badge/Firebase%20Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/docs/auth)
[![NativeWind](https://img.shields.io/badge/NativeWind-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://www.nativewind.dev/)

---

## 📋 Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/) ![Node.js Status](https://img.shields.io/badge/✓-Ready-4CAF50?style=flat-square)
- **npm** (comes with Node.js) ![npm Status](https://img.shields.io/badge/✓-Ready-4CAF50?style=flat-square)

---

## ✨ What It Does

Transform your wardrobe into a force for good! This app helps you:

### 👤 For Users

- 🤖 **AI Quality Check** - Snap a photo, get instant recommendations (DONATE/RECYCLE/REJECT)
- 🎁 **Exclusive Offers** - Unlock discounts from sustainable fashion brands
- 🏆 **Earn Badges** - Track your environmental impact and earn rewards (1kg, 50kg, 100kg, 200kg milestones)
- 📱 **QR Codes** - Generate and scan QR codes for easy offer redemption
- 📊 **Impact Dashboard** - See your CO₂ saved, water saved, and landfill space saved
- 👤 **User Profile** - View donation history, earned badges, and account information
- 📸 **Photo Analysis** - AI-powered clothing condition assessment with detailed recommendations

### 👨‍💼 For Administrators

- 📈 **Statistics Dashboard** - View total offers, active/expired offers, and user engagements
- ✅ **Offer Management** - Activate and redeem user offers with one click
- 📋 **Pending Offers** - Review and manage pending offer requests
- 📊 **Analytics** - Track company performance and user engagement metrics
- 🔍 **User Insights** - Monitor donation activity and offer redemption rates

---

## 🎥 Demo Videos

> 💡 **Tip:** For the best understanding of the app, play both videos concurrently! Click both links below to open them in separate tabs, then arrange your browser windows side-by-side.

| 👤 User Experience | 👨‍💼 Admin Dashboard |
|:---:|:---:|
| [![Play User Demo](https://img.shields.io/badge/▶️-Play%20User%20Demo-4CAF50?style=for-the-badge)](https://github.com/Alex-Clau/Hackathon/releases/download/Demo/DemoClient.mp4) | [![Play Admin Demo](https://img.shields.io/badge/▶️-Play%20Admin%20Demo-FF9800?style=for-the-badge)](https://github.com/Alex-Clau/Hackathon/releases/download/Demo/DemoAdmin.mp4) |

<div>

[![Open Both Videos Side-by-Side](https://img.shields.io/badge/🎬-Open%20Both%20Videos%20Side--by--Side-4CAF50?style=for-the-badge)](https://htmlpreview.github.io/?https://raw.githubusercontent.com/Alex-Clau/Hackathon/main/docs/demo-videos.html)

</div>

---

## 🚀 Quick Start

### Step 1: Backend Setup

```bash
cd backend
npm install
```

**Create `backend/.env` file:**

```env
PORT=3000
API_HOST=192.168.34.48  # Your local IP address
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
EXPO_PUBLIC_FIREBASE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GEMINI_API_KEY=your-gemini-key
```

<details>
<summary>💡 <strong>Need credentials?</strong></summary>

- **Firebase**: Go to [Firebase Console](https://console.firebase.google.com/) → Project Settings → Service Accounts → Generate new private key
- **Gemini AI**: Get your key at [Google AI Studio](https://makersuite.google.com/app/apikey)

</details>

**Start the server:**

```bash
npm start
```

![Server Status](https://img.shields.io/badge/✅-Server%20running%20at%20http://localhost:3000-4CAF50?style=flat-square)

---

### Step 2: Mobile App Setup

```bash
cd mobile-app
npm install
```

**Create `mobile-app/.env` file:**

```env
EXPO_PUBLIC_API_URL=http://192.168.34.48:3000/api
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
```

<details>
<summary>💡 <strong>Firebase Config</strong></summary>

Firebase Console → Project Settings → General → Your apps → Web app (click `</>` icon)

</details>

**Start the app:**

```bash
npm start
```

**Then:**
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

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ for a sustainable future**

</div>
