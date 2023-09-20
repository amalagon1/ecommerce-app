import Firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import { initializeApp } from '@firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAlEYqf5S5RQAxPQ_MibgLDGkShyUrI1KI",
    authDomain: "test-project-94c92.firebaseapp.com",
    projectId: "test-project-94c92",
    storageBucket: "test-project-94c92.appspot.com",
    messagingSenderId: "181256789630",
    appId: "1:181256789630:web:5661552a04f5615677c22f",
    measurementId: "G-KG7ZTDLBDD"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
