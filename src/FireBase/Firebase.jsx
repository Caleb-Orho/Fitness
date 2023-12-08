// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDP-ts4JEax7TxrqaNi3oyp0IGIhoiMll8",
    authDomain: "fitnessapp-70bb6.firebaseapp.com",
    projectId: "fitnessapp-70bb6",
    storageBucket: "fitnessapp-70bb6.appspot.com",
    messagingSenderId: "962052096744",
    appId: "1:962052096744:web:35fc42a2f6ac98994aff5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app);