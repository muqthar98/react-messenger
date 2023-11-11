// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp2O0DaEZk75MpaGlttWRY9ZMNzsgN5_g",
  authDomain: "messenger-app-af140.firebaseapp.com",
  projectId: "messenger-app-af140",
  storageBucket: "messenger-app-af140.appspot.com",
  messagingSenderId: "481813432425",
  appId: "1:481813432425:web:d17f377d0ffc90fef53af8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth,app};