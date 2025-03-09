import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLjvw0r0Ac0zeeveZyq6OzuWhs532yhuY",
  authDomain: "oder-392ac.firebaseapp.com",
  projectId: "oder-392ac",
  storageBucket: "oder-392ac.firebasestorage.app",
  messagingSenderId: "798354348550",
  appId: "1:798354348550:web:418ded739147ca1ab58187",
  measurementId: "G-GJZW93Q2VH",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
export { auth, app };
