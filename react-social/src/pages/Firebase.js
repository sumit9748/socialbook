
import firebase from 'firebase/app'
import 'firebase/storage'

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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()
//analytics is optional for this tutoral 
firebase.analytics();

export default { storage, firebase };