# Backend API

REST API server for managing companies, offers, and user-offer relationships with Firestore.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
   - `PORT`: Server port (default: 3000)
   - `API_HOST`: Your computer's IP address for mobile device access (e.g., `192.168.34.48`)
   - Firebase Admin SDK credentials:
     - `EXPO_PUBLIC_FIREBASE_PROJECT_ID`: Your Firebase project ID
     - `EXPO_PUBLIC_FIREBASE_PRIVATE_KEY`: Your Firebase service account private key (with `\n` for newlines)
     - `EXPO_PUBLIC_FIREBASE_CLIENT_EMAIL`: Your Firebase service account email

3. Get Firebase Admin SDK credentials:
   - Go to Firebase Console → Project Settings → Service Accounts
   - Generate a new private key
   - Copy the values to your `.env` file
   - Alternatively, place `serviceAccountKey.json` in the backend folder

4. Start the server:
```bash
npm start
```

## API Endpoints

### Health Check
- **GET** `/health` - Check if server is running

### Companies
- **GET** `/api/companies` - Get all companies
- **GET** `/api/companies/:id` - Get company by ID

### Offers
- **GET** `/api/offers` - Get all offers
- **GET** `/api/offers?grouped=true` - Get offers grouped by company
- **GET** `/api/offers/:id` - Get offer by ID

### User Offers
- **GET** `/api/users/:userId/offers` - Get all offers for a specific user

### Initialization (Seeding)
- **POST** `/api/init/all` - Initialize all data (companies, offers, users, user-offers)
- **POST** `/api/init/companies` - Initialize companies only
- **POST** `/api/init/offers` - Initialize offers only
- **POST** `/api/init/users` - Initialize users only
- **POST** `/api/init/users-offers` - Initialize user-offer relationships only

## Static Files

Company logos are served from `/images/companies/` directory.

## Architecture

- **Modular Structure**: Code is organized into separate modules (routes, services, utils)
- **Database**: Firestore for data storage
- **Clean Code**: Proper error handling and consistent response format
