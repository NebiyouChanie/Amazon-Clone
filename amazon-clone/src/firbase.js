// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBygv2epsrqZP5Gj4jqfUOWKMsHFZwKFv4",
  authDomain: "clone-1cbdf.firebaseapp.com",
  projectId: "clone-1cbdf",
  storageBucket: "clone-1cbdf.appspot.com",
  messagingSenderId: "351422174384",
  appId: "1:351422174384:web:61fde47df9c0ba25449775",
  measurementId: "G-S211CQ4H1K"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
