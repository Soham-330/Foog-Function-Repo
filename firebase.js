// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpUaSZPeObTZdeustHJ9FT9rg1iLP346o",
  authDomain: "foogfunction-5af77.firebaseapp.com",
  projectId: "foogfunction-5af77",
  storageBucket: "foogfunction-5af77.appspot.com",
  messagingSenderId: "71733818311",
  appId: "1:71733818311:web:1eea635707f2987c7c9fe2",
  measurementId: "G-LVWEGJETEL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);