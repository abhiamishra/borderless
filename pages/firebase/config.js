// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOM0gSHJtbmoqIAcNT682Xys4wx2UfSLE",
  authDomain: "borderless-7aa31.firebaseapp.com",
  projectId: "borderless-7aa31",
  storageBucket: "borderless-7aa31.appspot.com",
  messagingSenderId: "590296820387",
  appId: "1:590296820387:web:8a7694678b974fc033ad16",
  measurementId: "G-YV1DCGPR1R"
};

// Initialize Firebase
const firebase_app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(firebase_app);

export {firebase_app, auth}