import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFmsobse7c-MWYMbTA-Xbw-nvE6BbUCiQ",
  authDomain: "wedding-app-8e143.firebaseapp.com",
  projectId: "wedding-app-8e143",
  storageBucket: "wedding-app-8e143.firebasestorage.app",
  messagingSenderId: "281530153971",
  appId: "1:281530153971:web:d47ce069c16c45d8343086"
};

// 🔥 initialize app
const app = initializeApp(firebaseConfig);

// 🔥 export database
export const db = getFirestore(app);