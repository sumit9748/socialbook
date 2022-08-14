import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyBauuA63lmMA9XFHRIUtRUNZ8pLt9g3Nek",
    authDomain: "socialmeo-c671e.firebaseapp.com",
    projectId: "socialmeo-c671e",
    storageBucket: "socialmeo-c671e.appspot.com",
    messagingSenderId: "1008548068290",
    appId: "1:1008548068290:web:84d201514c829e3c5f345b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);