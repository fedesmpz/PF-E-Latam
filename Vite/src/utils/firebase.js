import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAHyuTJvff4-iZYd53_WZFgmmNhw6sQBPw",
    authDomain: "e-latam.firebaseapp.com",
    projectId: "e-latam",
    storageBucket: "e-latam.appspot.com",
    messagingSenderId: "961763374248",
    appId: "1:961763374248:web:4bc8c641972c952ad93e9d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app);
export { auth, firestore };