# 📱 Mobile App

> ⚠️ **Prerequisite:** Set up the [backend API](../backend/README.md) first.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment

Create `.env` in `mobile-app/`:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
EXPO_PUBLIC_API_URL=http://YOUR_IP:3000/api
```

**Get Firebase config:** [Firebase Console](https://console.firebase.google.com/) → Project Settings → Your apps → Web app (`</>`)

**EXPO_PUBLIC_API_URL:**
- iOS Simulator/Physical Device: Use your machine's IP (e.g., `http://192.168.1.100:3000/api`)
- Android Emulator: `http://10.0.2.2:3000/api`
- Web: `http://localhost:3000/api`

**Find your IP:**
- macOS/Linux: `ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1`
- Windows: `ipconfig` → look for IPv4 Address

### 3. Start
```bash
npm start
```

Press `i` for iOS, `a` for Android, or scan QR code for physical device.

## Troubleshooting

**Can't connect to backend:**
- Backend server must be running
- Use IP address (not `localhost`) in `EXPO_PUBLIC_API_URL`
- Update IP if you change networks

**Images not loading:**
- Set `API_HOST` in backend `.env` to match your IP (same as `EXPO_PUBLIC_API_URL`)
- Restart backend after updating `API_HOST`
