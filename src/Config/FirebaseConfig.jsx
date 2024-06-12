// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8vPSdv3rZ7OzGoD0PJTiBjg004LpfLfU",
  authDomain: "foog-function.firebaseapp.com",
  projectId: "foog-function",
  storageBucket: "foog-function.appspot.com",
  messagingSenderId: "800129609862",
  appId: "1:800129609862:web:64e3614402561c929c2107",
  measurementId: "G-MS8SZS4EZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);