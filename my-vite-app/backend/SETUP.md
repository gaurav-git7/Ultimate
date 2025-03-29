# SmartBin Backend Setup Guide

Follow these steps to set up your backend server for the SmartBin application.

## Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your Firebase Admin SDK credentials

## Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication methods:
   - Email/Password
   - Google Sign-in
3. Create a Firestore database:
   - Go to Firestore Database in the console
   - Click "Create database"
   - Choose "Start in test mode" (later secure with rules)
   - Select a location close to your users
4. Generate a Firebase Admin SDK private key:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Copy the values from the downloaded JSON file to your `.env` file

## Starting the Server

Development mode (with auto-reload):
```
npm run dev
```

Production mode:
```
npm start
```

The server will run on the port specified in your `.env` file (default: 5000).

## API Endpoints

Once the server is running, you can access the API endpoints. Refer to the README.md file for a complete list of available endpoints.

## Integration with Frontend

To connect your frontend to this backend:

1. Make sure both frontend and backend servers are running
2. Configure your frontend to send requests to `http://localhost:5000/api/` (or your custom port)
3. Ensure Firebase configuration in the frontend matches the project used for the backend

## Firestore Database Structure

The backend uses the following Firestore collections:

1. `users` - Stores user information
2. `bins` - Stores waste bin data
3. `notifications` - Stores system notifications

## Securing Your Firestore Database

After testing, secure your database with proper Firestore rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && (request.auth.uid == userId || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow write: if request.auth != null && (request.auth.uid == userId || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    match /bins/{binId} {
      allow read: if request.auth != null && (resource.data.owner == request.auth.uid || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow write: if request.auth != null && (resource.data.owner == request.auth.uid || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    match /notifications/{notificationId} {
      allow read: if request.auth != null && resource.data.user == request.auth.uid;
      allow write: if request.auth != null && resource.data.user == request.auth.uid;
    }
  }
}
```

## Troubleshooting

- **Firebase Authentication Issues**: Verify your Firebase project settings and ensure the private key in `.env` is correct
- **Firestore Access Issues**: Check your Firebase project permissions and rules
- **CORS Errors**: The server is configured to accept requests from `http://localhost:3000` by default; modify the `CORS_ORIGIN` in `.env` if needed 