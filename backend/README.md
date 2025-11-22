# Backend API

REST API server for authentication with JWT tokens and Firestore.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env
```

3. Configure your environment variables:
   - `PORT`: Server port (default: 3000)
   - `JWT_SECRET`: Secret key for JWT tokens
   - `JWT_EXPIRES_IN`: Token expiration time (default: 7d)
   - Firebase Admin SDK credentials:
     - `FIREBASE_PROJECT_ID`: Your Firebase project ID
     - `FIREBASE_PRIVATE_KEY`: Your Firebase service account private key
     - `FIREBASE_CLIENT_EMAIL`: Your Firebase service account email

4. Get Firebase Admin SDK credentials:
   - Go to Firebase Console → Project Settings → Service Accounts
   - Generate a new private key
   - Copy the values to your `.env` file

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### POST /api/auth/signup
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt-token"
  }
}
```

### POST /api/auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt-token"
  }
}
```

## Architecture

- **Modular Structure**: Code is organized into separate modules (routes, services, utils)
- **Validation**: Uses Zod for request validation
- **Security**: Passwords are encrypted with bcrypt, JWT tokens for authentication
- **Database**: Firestore for user storage
- **Clean Code**: TypeScript-ready structure with proper error handling

