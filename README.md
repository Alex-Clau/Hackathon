# 🌱 Eco Rewards - Sustainable Fashion App

[![Award Winner](https://img.shields.io/badge/🏆-Award--Winning%20Hackathon%20Project-FFD700?style=for-the-badge&logo=trophy)](https://github.com/Alex-Clau/Hackathon)

> A mobile app that uses AI to help you make sustainable fashion choices. Assess clothing quality, donate responsibly,
> and earn discounts from eco-friendly brands.

---

## 👥 Team

<p align="center">
  <a href="https://github.com/Alex-Clau"><img src="https://github.com/Alex-Clau.png?size=50" width="50" height="50" style="border-radius: 50%;" alt="Alex-Clau"/></a>
  <a href="https://github.com/FazacasMihai"><img src="https://github.com/FazacasMihai.png?size=50" width="50" height="50" style="border-radius: 50%;" alt="FazacasMihai"/></a>
  <a href="https://github.com/FloreaAndreiCiprian"><img src="https://github.com/FloreaAndreiCiprian.png?size=50" width="50" height="50" style="border-radius: 50%;" alt="FloreaAndreiCiprian"/></a>
  <a href="https://github.com/ghimpumihai"><img src="https://github.com/ghimpumihai.png?size=50" width="50" height="50" style="border-radius: 50%;" alt="ghimpumihai"/></a>
  <a href="https://github.com/notbriana"><img src="https://github.com/notbriana.png?size=50" width="50" height="50" style="border-radius: 50%;" alt="notbriana"/></a>
  <a href="https://github.com/PaulFulop"><img src="https://github.com/PaulFulop.png?size=50" width="50" height="50" style="border-radius: 50%;" alt="PaulFulop"/></a>
</p>

---

## 🎥 Demo Videos

> 💡 **Tip:** For the best understanding of the app, play both videos concurrently! 

|                                                                                👤 User Experience                                                                                |                                                                               👨‍💼 Admin Dashboard                                                                               |
|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| [![Play User Demo](https://img.shields.io/badge/▶️-Play%20User%20Demo-4CAF50?style=for-the-badge)](https://github.com/Alex-Clau/Hackathon/releases/download/Demo/DemoClient.mp4) | [![Play Admin Demo](https://img.shields.io/badge/▶️-Play%20Admin%20Demo-FF9800?style=for-the-badge)](https://github.com/Alex-Clau/Hackathon/releases/download/Demo/DemoAdmin.mp4) |

<div>

[![Open Both Videos Side-by-Side](https://img.shields.io/badge/🎬-Open%20Both%20Videos%20Side--by--Side-4CAF50?style=for-the-badge)](https://htmlpreview.github.io/?https://raw.githubusercontent.com/Alex-Clau/Hackathon/main/docs/demo-videos.html)

</div>

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
- 📱 **QR Codes** - Approve and Redeem offers by scanning QR codes
- 🔍 **User Insights** - Monitor donation activity and offer redemption rates

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/) ![Node.js Status](https://img.shields.io/badge/✓-Ready-4CAF50?style=flat-square)
- **npm** (comes with Node.js) ![npm Status](https://img.shields.io/badge/✓-Ready-4CAF50?style=flat-square)

### What You'll Need

Before starting, make sure you have:

- 🔥 **Firebase Project** - Create one at [Firebase Console](https://console.firebase.google.com/)
- 🤖 **Google Gemini API Key** - Get one at [Google AI Studio](https://makersuite.google.com/app/apikey)

### Setup Process

This project consists of two parts that need to be set up:

1. **Backend API** - Must be running first (provides API endpoints for the mobile app)
2. **Mobile App** - Connects to the backend API

> ⚠️ **Important:** Set up the backend first, as the mobile app depends on it.

### Detailed Setup Guides

Follow these guides in order:

#### Step 1: Backend Setup

👉 **[View Backend Setup Guide](backend/README.md)**

The backend requires:
- Firebase configuration (API Key, Auth Domain, Project ID, Storage Bucket, Messaging Sender ID, App ID)
- Firebase Admin SDK credentials (Client Email, Private Key)
- Google Gemini API Key

#### Step 2: Mobile App Setup

👉 **[View Mobile App Setup Guide](mobile-app/README.md)**

The mobile app requires:
- Firebase configuration (same Firebase project as backend)
- Backend API must be running

### Quick Verification

After setup, verify everything works:

1. ✅ Backend server running at `http://localhost:3000`
2. ✅ Mobile app connects to backend
3. ✅ Firebase authentication works
4. ✅ AI quality check endpoint responds

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


## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ for a sustainable future**

</div>
