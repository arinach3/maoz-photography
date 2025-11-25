import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGfgvBmJ4tIThLsXrulTkTzkGRFgP8Gdc",
  authDomain: "maoz-photography.firebaseapp.com",
  projectId: "maoz-photography",
  storageBucket: "maoz-photography.firebasestorage.app",
  messagingSenderId: "60659018882",
  appId: "1:60659018882:web:7e44d327e19710c7fdd89b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);