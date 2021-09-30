import firebase from 'firebase/app'
// the below imports are option - comment out what you don't need
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/performance'







NEXT_PUBLIC_FIREBASE_API_KEY= "AIzaSyAgU3aTPfCRS90VJaPuSwnQKBaDzRabtKk"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN= "schedulingpb.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_DATABASE_URL= "https://schedulingpb-default-rtdb.firebaseio.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID= "schedulingpb"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET= "schedulingpb.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID= "797935234997"
NEXT_PUBLIC_FIREBASE_APP_ID= "1:797935234997:web:e689cd1ea9b1d11d8133fc"

//# for firebase-admin
//FIREBASE_CLIENT_EMAIL=
//FIREBASE_PRIVATE_KEY=


const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}



export default function initFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp(clientCredentials)
        // Check that `window` is in scope for the analytics module!
        if (typeof window !== 'undefined') {
            // Enable analytics. https://firebase.google.com/docs/analytics/get-started
            if ('measurementId' in clientCredentials) {
                firebase.analytics()
                firebase.performance()
            }
        }
        console.log('Firebase was successfully init.')
    }
}


// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional



// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
