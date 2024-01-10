// Import the functions you need from the SDKs you need

import "firebase/auth";
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebase_config = {
    apiKey: "AIzaSyBCGhj6Hlsa8bu1SDRKI6uOTwOv8KFrGUc",
    authDomain: "otp-verification-d84c5.firebaseapp.com",
    projectId: "otp-verification-d84c5",
    storageBucket: "otp-verification-d84c5.appspot.com",
    messagingSenderId: "38447685949",
    appId: "1:38447685949:web:5f38ea786946027194a554"
};

// Initialize Firebase
firebase.initializeApp(firebase_config);

export default firebase;
