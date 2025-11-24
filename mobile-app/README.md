# 📱 Mobile App

> React Native app built with Expo for sustainable fashion and clothing donation management.

> ⚠️ **Prerequisite:** Make sure the [backend API](../backend/README.md) is set up and running before starting the mobile app.

---

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the `mobile-app/` directory:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
```

<details>
<summary>💡 <strong>How to get Firebase Config</strong></summary>

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Project Settings → General
4. Scroll to "Your apps" section
5. Click the web icon (`</>`)
6. Copy the config values to your `.env` file

**Note:** Use the same Firebase project as your backend for consistency.

</details>

### 3. Start Development Server

```bash
npm start
```

### 4. Run on Device

After starting, choose your platform:

- **iOS Simulator**: Press `i` (requires Xcode on macOS)
- **Android Emulator**: Press `a` (requires Android Studio)
- **Physical Device**: 
  - Install [Expo Go](https://expo.dev/go) app
  - Scan the QR code from terminal
  - Make sure device and computer are on same Wi-Fi

---

## ✨ Features

- 🔐 Email/password authentication
- 📸 AI-powered quality checks
- 🎁 Browse company offers
- 📱 QR code generation & scanning
- 🏆 Badge system & impact tracking
- 👨‍💼 Admin dashboard

---

## 🔧 Troubleshooting

### App shows "No offers available"

- Make sure the backend server is running at `http://localhost:3000`
- Check that you've initialized the database (see [Backend README](../backend/README.md))
- Verify your Firebase project ID matches in both backend and mobile app `.env` files

### Authentication not working

- Ensure Firebase Auth is enabled in your Firebase Console
- Verify all Firebase config values are correct in your `.env` file
- Check that you're using the same Firebase project for both backend and mobile app

### Can't connect to backend

- Verify the backend server is running
- Check your network connection
- Make sure both devices are on the same network (for physical devices)

---
