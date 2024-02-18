// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5mqi4E-3Y6JAHGAnZsRKYa9PdGO2HUbU",
  authDomain: "aimarket-dbd5b.firebaseapp.com",
  projectId: "aimarket-dbd5b",
  storageBucket: "aimarket-dbd5b.appspot.com",
  messagingSenderId: "533336481610",
  appId: "1:533336481610:web:cfd824c0ad8b8c24d82bb3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
