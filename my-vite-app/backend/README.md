# SmartBin Backend API

This is the backend server for the SmartBin waste management application. It provides a RESTful API for managing waste bins, users, and notifications using Firebase services.

## Features

- **User Management**: Registration, authentication, and user profile management with Firebase Auth
- **Bin Management**: Create, update, delete, and monitor waste bins with Firestore
- **Notification System**: Real-time alerts and notifications for bin status
- **Statistics**: Advanced analytics and statistics for waste management

## Tech Stack

- Node.js and Express
- Firebase Authentication
- Cloud Firestore for data storage
- RESTful API design

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- Firebase project with Authentication and Firestore enabled

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```
5. Update the `.env` file with your Firebase credentials

### Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication methods (Email/Password, Google)
3. Create a Firestore database
4. Go to Project Settings > Service Accounts
5. Generate a new private key (this will download a JSON file)
6. Use the values from the JSON file to fill in the Firebase-related variables in your `.env` file

### Running the Server

Development mode:
```
npm run dev
```

Production mode:
```
npm start
```

## API Endpoints

### Authentication

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get specific user (admin only)
- `PATCH /api/users/:id/role` - Update user role (admin only)
- `PATCH /api/users/:id/status` - Activate/deactivate user (admin only)

### Bins

- `GET /api/bins` - Get all bins (with filtering)
- `GET /api/bins/:id` - Get a specific bin
- `POST /api/bins` - Create a new bin
- `PUT /api/bins/:id` - Update a bin
- `PATCH /api/bins/:id/sensor` - Update bin sensor data
- `POST /api/bins/:id/empty` - Record bin emptying
- `DELETE /api/bins/:id` - Delete a bin
- `GET /api/bins/:id/stats` - Get bin statistics

### Notifications

- `GET /api/notifications` - Get all notifications
- `GET /api/notifications/unread-count` - Get unread notification count
- `GET /api/notifications/:id` - Get a specific notification
- `PATCH /api/notifications/:id/read` - Mark notification as read
- `POST /api/notifications/mark-all-read` - Mark all notifications as read
- `POST /api/notifications` - Create a notification (admin only)
- `DELETE /api/notifications/:id` - Delete a notification
- `DELETE /api/notifications/clear-read` - Delete all read notifications

## Authentication

The API uses Firebase Authentication. To access protected endpoints, include the Firebase ID token in the Authorization header:

```
Authorization: Bearer <firebase-id-token>
```

## Database Structure

The application uses the following Firestore collections:

- `users` - User accounts and profiles
- `bins` - Waste bin information and sensor data
- `notifications` - System and user notifications

## Environment Variables

See `.env.example` for all required environment variables.

## Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

Error responses have the following format:

```json
{
  "message": "Error message description"
}
```

## License

This project is licensed under the MIT License. 