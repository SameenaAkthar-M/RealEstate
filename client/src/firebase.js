// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-51941.firebaseapp.com",
  projectId: "mern-estate-51941",
  storageBucket: "mern-estate-51941.firebasestorage.app",
  messagingSenderId: "492509735300",
  appId: "1:492509735300:web:4d27fca95cb0432016d5d1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);