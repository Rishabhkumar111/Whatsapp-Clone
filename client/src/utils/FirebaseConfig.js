import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCY0A3xdyOLShKGHT16vwCecSQsrucXm9U",
  authDomain: "whatsapp-clone-c9944.firebaseapp.com",
  projectId: "whatsapp-clone-c9944",
  storageBucket: "whatsapp-clone-c9944.appspot.com",
  messagingSenderId: "650904132643",
  appId: "1:650904132643:web:2ad3bf1224b0618ee16596",
  measurementId: "G-9090HPK3VQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);