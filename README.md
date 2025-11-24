<h1 style="color: #2E7D32;">🌱 Eco Rewards - Sustainable Fashion App</h1>

<p style="color: #FFD700; font-weight: bold;">🏆 <strong>Award-Winning Hackathon Project</strong></p>

> A mobile app that uses AI to help you make sustainable fashion choices. Assess clothing quality, donate responsibly, and earn rewards from eco-friendly brands.

---

<h2 style="color: #2E7D32;">📋 Prerequisites</h2>

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/) <span style="color: #4F6F52;">✓</span>
- **npm** (comes with Node.js) <span style="color: #4F6F52;">✓</span>

---

<h2 style="color: #2E7D32;">✨ What It Does</h2>

<p style="color: #4F6F52; font-size: 1.1em;">Transform your wardrobe into a force for good! This app helps you:</p>

<h3 style="color: #2E7D32;">For Users 👤</h3>
<ul style="color: #4F6F52;">
  <li>🤖 <strong style="color: #2E7D32;">AI Quality Check</strong> - Snap a photo, get instant recommendations (DONATE/RECYCLE/REJECT)</li>
  <li>🎁 <strong style="color: #2E7D32;">Exclusive Offers</strong> - Unlock discounts from sustainable fashion brands</li>
  <li>🏆 <strong style="color: #2E7D32;">Earn Badges</strong> - Track your environmental impact and earn rewards (1kg, 50kg, 100kg, 200kg milestones)</li>
  <li>📱 <strong style="color: #2E7D32;">QR Codes</strong> - Generate and scan QR codes for easy offer redemption</li>
  <li>📊 <strong style="color: #2E7D32;">Impact Dashboard</strong> - See your CO₂ saved, water saved, and landfill space saved</li>
  <li>👤 <strong style="color: #2E7D32;">User Profile</strong> - View donation history, earned badges, and account information</li>
  <li>📸 <strong style="color: #2E7D32;">Photo Analysis</strong> - AI-powered clothing condition assessment with detailed recommendations</li>
</ul>

<h3 style="color: #FF9800;">For Administrators 👨‍💼</h3>
<ul style="color: #4F6F52;">
  <li>📈 <strong style="color: #FF9800;">Statistics Dashboard</strong> - View total offers, active/expired offers, and user engagements</li>
  <li>✅ <strong style="color: #FF9800;">Offer Management</strong> - Activate and redeem user offers with one click</li>
  <li>📋 <strong style="color: #FF9800;">Pending Offers</strong> - Review and manage pending offer requests</li>
  <li>📊 <strong style="color: #FF9800;">Analytics</strong> - Track company performance and user engagement metrics</li>
  <li>🔍 <strong style="color: #FF9800;">User Insights</strong> - Monitor donation activity and offer redemption rates</li>
</ul>

---

<h2 style="color: #2E7D32;">🎥 Demo Videos</h2>

<div style="background: #E8F5E9; border-left: 4px solid #4CAF50; padding: 15px; border-radius: 8px; margin: 20px 0;">
  <strong style="color: #2E7D32;">💡 Tip:</strong> <span style="color: #4F6F52;">For the best understanding of the app, play both videos concurrently! Click both links below to open them in separate tabs, then arrange your browser windows side-by-side.</span>
</div>

<table align="center" style="margin: 20px auto;">
  <tr>
    <td align="center" style="padding: 20px; vertical-align: top;">
      <h3 style="color: #2E7D32; margin: 0 0 15px 0;">👤 User Experience</h3>
      <a href="https://github.com/Alex-Clau/Hackathon/releases/download/Demo/DemoClient.mp4" target="_blank">
        <strong style="font-size: 1.2em; color: #4CAF50;">▶️ Play User Demo</strong>
      </a>
    </td>
    <td align="center" style="padding: 20px; vertical-align: top;">
      <h3 style="color: #FF9800; margin: 0 0 15px 0;">👨‍💼 Admin Dashboard</h3>
      <a href="https://github.com/Alex-Clau/Hackathon/releases/download/Demo/DemoAdmin.mp4" target="_blank">
        <strong style="font-size: 1.2em; color: #FF6B35;">▶️ Play Admin Demo</strong>
      </a>
    </td>
  </tr>
</table>

<p style="text-align: center; margin-top: 20px;">
  <strong style="color: #4F6F52;">Or use the interactive viewer:</strong> 
  <a href="https://htmlpreview.github.io/?https://raw.githubusercontent.com/Alex-Clau/Hackathon/main/docs/demo-videos.html" style="color: #4CAF50; font-weight: bold;">🎬 Open Both Videos Side-by-Side</a>
</p>

---

<h2 style="color: #2E7D32;">🚀 Quick Start</h2>

<h3 style="color: #2E7D32;">Step 1: Backend Setup</h3>

```bash
cd backend
npm install
```

<p style="color: #4F6F52; font-weight: bold;">Create <code style="background: #E8F5E9; padding: 2px 6px; border-radius: 4px; color: #2E7D32;">backend/.env</code> file:</p>

```env
PORT=3000
API_HOST=192.168.34.48  # Your local IP address
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
EXPO_PUBLIC_FIREBASE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GEMINI_API_KEY=your-gemini-key
```

<div style="background: #E8F5E9; border-left: 4px solid #4CAF50; padding: 15px; border-radius: 8px; margin: 15px 0;">
  <strong style="color: #2E7D32;">💡 Need credentials?</strong>
  <ul style="color: #4F6F52; margin-top: 10px;">
    <li><strong>Firebase</strong>: Go to <a href="https://console.firebase.google.com/" style="color: #4CAF50;">Firebase Console</a> → Project Settings → Service Accounts → Generate new private key</li>
    <li><strong>Gemini AI</strong>: Get your key at <a href="https://makersuite.google.com/app/apikey" style="color: #4CAF50;">Google AI Studio</a></li>
  </ul>
</div>

<p style="color: #4F6F52; font-weight: bold;">Start the server:</p>

```bash
npm start
```

<p style="color: #4CAF50; font-weight: bold;">✅ Server running at <code style="background: #E8F5E9; padding: 4px 8px; border-radius: 4px; color: #2E7D32;">http://localhost:3000</code></p>

---

<h3 style="color: #2E7D32;">Step 2: Mobile App Setup</h3>

```bash
cd mobile-app
npm install
```

<p style="color: #4F6F52; font-weight: bold;">Create <code style="background: #E8F5E9; padding: 2px 6px; border-radius: 4px; color: #2E7D32;">mobile-app/.env</code> file:</p>

```env
EXPO_PUBLIC_API_URL=http://192.168.34.48:3000/api
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
```

<div style="background: #E8F5E9; border-left: 4px solid #4CAF50; padding: 15px; border-radius: 8px; margin: 15px 0;">
  <strong style="color: #2E7D32;">💡 Firebase Config:</strong> <span style="color: #4F6F52;">Firebase Console → Project Settings → General → Your apps → Web app (click <code style="background: #FFF; padding: 2px 6px; border-radius: 3px;">&lt;/&gt;</code> icon)</span>
</div>

<p style="color: #4F6F52; font-weight: bold;">Start the app:</p>

```bash
npm start
```

<p style="color: #4F6F52; font-weight: bold;">Then:</p>
<ul style="color: #4F6F52;">
  <li>Press <code style="background: #E8F5E9; padding: 2px 6px; border-radius: 4px; color: #2E7D32;">i</code> for iOS Simulator</li>
  <li>Press <code style="background: #E8F5E9; padding: 2px 6px; border-radius: 4px; color: #2E7D32;">a</code> for Android Emulator</li>
  <li>Scan QR code with <a href="https://expo.dev/go" style="color: #4CAF50; font-weight: bold;">Expo Go</a> on your phone</li>
</ul>

---

<h3 style="color: #2E7D32;">Step 3: Initialize Database (Optional)</h3>

<p style="color: #4F6F52;">Seed the database with sample data:</p>

```bash
curl -X POST http://localhost:3000/api/init/all
```

---

<h2 style="color: #2E7D32;">🛠️ Built With</h2>

<p><strong style="color: #2E7D32; font-size: 1.1em;">Backend</strong></p>
<ul style="color: #4F6F52;">
  <li><span style="color: #2E7D32;">Node.js</span> + <span style="color: #2E7D32;">Express</span></li>
  <li><span style="color: #FF9800;">Firebase</span> (Firestore)</li>
  <li><span style="color: #4285F4;">Google Gemini AI</span></li>
</ul>

<p><strong style="color: #2E7D32; font-size: 1.1em;">Mobile</strong></p>
<ul style="color: #4F6F52;">
  <li><span style="color: #61DAFB;">React Native</span> + <span style="color: #2E7D32;">Expo</span></li>
  <li><span style="color: #FF9800;">Firebase Auth</span></li>
  <li><span style="color: #06B6D4;">NativeWind</span> (Tailwind for RN)</li>
</ul>

---

<p style="text-align: center; color: #4F6F52; font-size: 1.1em; margin-top: 30px;">
  <strong style="color: #2E7D32;">Made with <span style="color: #E91E63;">❤️</span> for a sustainable future</strong>
</p>
