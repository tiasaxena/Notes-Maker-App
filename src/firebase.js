import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAMOqdOShPeNhdEbBn6OuC_nRHMIe9BQdU",
    authDomain: "notes-maker-app.firebaseapp.com",
    projectId: "notes-maker-app",
    storageBucket: "notes-maker-app.appspot.com",
    messagingSenderId: "1000610485552",
    appId: "1:1000610485552:web:439e4a89d77965c556a4f5",
    measurementId: "G-HBRS5T99PF",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);