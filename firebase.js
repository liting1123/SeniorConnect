import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "uncleaunty-app.firebaseapp.com",
  databaseURL: "https://uncleaunty-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "uncleaunty-app",
  storageBucket: "uncleaunty-app.firebasestorage.app",
  messagingSenderId: "285281834576",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const database = getDatabase(app);