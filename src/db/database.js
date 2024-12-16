import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAar7WxY0DFXxnO6JZZ1snzDmLcs7xFGkk",
  authDomain: "kientechblog.firebaseapp.com",
  projectId: "kientechblog",
  storageBucket: "kientechblog.firebasestorage.app",
  messagingSenderId: "826097235210",
  appId: "1:826097235210:web:31c77ce06797df98da36f3",
  measurementId: "G-ZZ7MNW151T",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
