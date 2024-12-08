// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBwM8QD-OFjxWVJBuBw9LNCZZD_2PXlbWo",
    authDomain: "testing-e3143.firebaseapp.com",
    projectId: "testing-e3143",
    storageBucket: "testing-e3143.firebasestorage.app",
    messagingSenderId: "850744534076",
    appId: "1:850744534076:web:40d06c5dc343bad2620f39",
    measurementId: "G-ELBDSTEG2F"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();  
export const auth = getAuth(app);
export const db = getFirestore(app);
