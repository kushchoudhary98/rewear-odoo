// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDr2j97PXgE4Z20kZY8NQmVurm45Bnlmm0",
  authDomain: "rewear-kc-odoo.firebaseapp.com",
  projectId: "rewear-kc-odoo",
  storageBucket: "rewear-kc-odoo.appspot.com",
  messagingSenderId: "737280390554",
  appId: "1:737280390554:web:f971c0522768966943b623",
  measurementId: "G-H1H1M8QRMH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);