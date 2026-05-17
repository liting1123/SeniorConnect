// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjGqNtm17fdNUfU5twhJt8Wc20OEB0B28",
  authDomain: "uncleaunty-app.firebaseapp.com",
  databaseURL: "https://uncleaunty-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "uncleaunty-app",
  storageBucket: "uncleaunty-app.firebasestorage.app",
  messagingSenderId: "285281834576",
  appId: "1:285281834576:web:b02bf5636bead00effa355",
  measurementId: "G-Y9JX43E2RN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, analytics, auth, database };
