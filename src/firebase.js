// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFmsobse7c-MWYMbTA-Xbw-nvE6BbUCiQ",
  authDomain: "wedding-app-8e143.firebaseapp.com",
  projectId: "wedding-app-8e143",
  storageBucket: "wedding-app-8e143.firebasestorage.app",
  messagingSenderId: "281530153971",
  appId: "1:281530153971:web:d47ce069c16c45d8343086",
  measurementId: "G-9NLD248JY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);