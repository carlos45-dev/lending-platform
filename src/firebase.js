// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // ✅ ADD THIS

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyMn-5rA06QuMZC3l4BxxidLjo_VH67FA",
  authDomain: "unifund-lending-application.firebaseapp.com",
  projectId: "unifund-lending-application",
  storageBucket: "unifund-lending-application.firebasestorage.app",
  messagingSenderId: "659826185839",
  appId: "1:659826185839:web:ff5df12888451660359f9a",
  measurementId: "G-WN5L1WRG2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // ✅ Initialize auth

// ✅ Export what you need
export { auth, app };
