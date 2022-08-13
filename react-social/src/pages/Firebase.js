import firebase from 'firebase/app'
import 'firebase/storage'

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBauuA63lmMA9XFHRIUtRUNZ8pLt9g3Nek",
    authDomain: "socialmeo-c671e.firebaseapp.com",
    projectId: "socialmeo-c671e",
    storageBucket: "socialmeo-c671e.appspot.com",
    messagingSenderId: "1008548068290",
    appId: "1:1008548068290:web:84d201514c829e3c5f345b",
    databaseURL: "https://socialbooksumit.herokuapp.com/",
    measurementId: "super secret as;dlkfjal;dskjf"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
//analytics is optional for this tutoral 
const storage = firebase.storage()
firebase.analytics();

export default { storage, firebase };