// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  getReactNativePersistance,
  initializeAuth,
  setPersistence,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdgxZsFOfwvgv9jtoc4B6lbOJ6YMJ3JCE",
  authDomain: "uchatfir.firebaseapp.com",
  projectId: "uchatfir",
  storageBucket: "uchatfir.appspot.com",
  messagingSenderId: "797810381096",
  appId: "1:797810381096:web:d64730f228dea42979001d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistance(AsyncStorage),
// });

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("persistance set SUcessfully");
  })
  .catch((error) => {
    console.error("error seting persistance", error);
  });

export const db = getFirestore(app);

export const userRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
