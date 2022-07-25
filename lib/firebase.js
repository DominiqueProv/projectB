// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQDXjmerWwaEpTlPzOPOqnMabVHGYAcPs",
  authDomain: "projectb-52a1b.firebaseapp.com",
  projectId: "projectb-52a1b",
  storageBucket: "projectb-52a1b.appspot.com",
  messagingSenderId: "47614136318",
  appId: "1:47614136318:web:7c2ad3d70d5de10bfdbaaf",
  measurementId: "G-VGWFEYVK0R",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

export const database = getFirestore(firebase.initializeApp(firebaseConfig));
export const storage = getStorage(firebase.initializeApp(firebaseConfig));
