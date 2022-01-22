import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2HYY0xY-QrTa3Tv3IGG6FrT_giiNnMX0",
  authDomain: "alexandria-e8a09.firebaseapp.com",
  projectId: "alexandria-e8a09",
  storageBucket: "alexandria-e8a09.appspot.com",
  messagingSenderId: "145198781181",
  appId: "1:145198781181:web:02f20a8b357954ba08e494",
  measurementId: "G-DBLL4Z6ELR",
};

initializeApp(firebaseConfig);
const projectAuth = getAuth();
const projectStorage = getStorage();

export { projectAuth, projectStorage }