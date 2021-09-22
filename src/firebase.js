// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhSNmkcgwoDMJrWaEtNoLPC3cuy9Vp2KU",
  authDomain: "riddc-volume-viewer.firebaseapp.com",
  projectId: "riddc-volume-viewer",
  storageBucket: "riddc-volume-viewer.appspot.com",
  messagingSenderId: "357016017864",
  appId: "1:357016017864:web:1e7e8c19e5fd48de15befd",
  measurementId: "G-63QGRJJJQ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
