# 📱 Mobile App

> React Native app built with Expo for sustainable fashion and clothing donation management.

---

## 🚀 Quick Setup

### 1. Install Dependencies

   ```bash
   npm install
   ```

### 2. Configure Environment

Create a `.env` file in the `mobile-app/` directory:

```env
EXPO_PUBLIC_API_URL=http://192.168.34.48:3000/api
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
```

> 💡 **Firebase Config**: 
> 1. Go to [Firebase Console](https://console.firebase.google.com/)
> 2. Project Settings → General
> 3. Scroll to "Your apps" → Click web icon (`</>`)
> 4. Copy config values to `.env`

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

**Ready to build something awesome! 🎉**
