import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXQhkZ0-QC2lM4Xzy4wb_LruzkRuJfgrg",
  authDomain: "unifund-lending-applicat-c2347.firebaseapp.com",
  projectId: "unifund-lending-applicat-c2347",
  storageBucket: "unifund-lending-applicat-c2347.firebasestorage.app",
  messagingSenderId: "510300911232",
  appId: "1:510300911232:web:ad6255b79e9de9eea9d865",
  measurementId: "G-9RRFGB89XG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Auth, Firestore, and Storage
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export for use in components
export { app, auth, db, storage, analytics };