// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration (corrected)
const firebaseConfig = {
  apiKey: "AIzaSyCyMn-5rA06QuMZC3l4BxxidLjo_VH67FA",
  authDomain: "unifund-lending-application.firebaseapp.com",
  projectId: "unifund-lending-application",
  storageBucket: "unifund-lending-application.appspot.com", // ✅ FIXED
  messagingSenderId: "659826185839",
  appId: "1:659826185839:web:ff5df12888451660359f9a",
  measurementId: "G-WN5L1WRG2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in components
export { app, auth, db, analytics };
