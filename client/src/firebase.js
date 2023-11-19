// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mern-auth-54682.firebaseapp.com",
  projectId: "mern-auth-54682",
  storageBucket: "mern-auth-54682.appspot.com",
  messagingSenderId: "731596839144",
  appId: "1:731596839144:web:43a13019e7b1b21064915d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);