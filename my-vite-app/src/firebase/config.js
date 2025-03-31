// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Using environment variables for secure config management
console.log("API Key:", import.meta.env.VITE_FIREBASE_API_KEY);

// Use environment variables if available, otherwise use fallback values
// IMPORTANT: Remove these fallback values in production
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAUzefEnnQsgERlBKeqfBcaY9cqGUbylkA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "wastefoodmanagement-48e25.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "wastefoodmanagement-48e25",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "wastefoodmanagement-48e25.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "935643868580",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:935643868580:web:52aa60abe42423100ce531",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-80DCRL63DY"
};

console.log("Firebase config:", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app; 