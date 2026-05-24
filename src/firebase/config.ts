// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// 1. Importamos la función necesaria para la base de datos (Firestore)
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQLNZ0SRAI1r-j3YuzKb8l3YZm6CccRs0",
  authDomain: "finalpj-edya2.firebaseapp.com",
  projectId: "finalpj-edya2",
  storageBucket: "finalpj-edya2.firebasestorage.app",
  messagingSenderId: "453837912370",
  appId: "1:453837912370:web:454de8a739f404fb8d3f2b",
  measurementId: "G-V8BHX2G2HL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// 2. Inicializamos y exportamos 'db' correctamente como una exportación nombrada
export const db = getFirestore(app);