import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from "firebase/app";
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpwv-7iwr5rY0HojpCoW5e0T0_jD_NAtE",
  authDomain: "moviecart-39771.firebaseapp.com",
  projectId: "moviecart-39771",
  storageBucket: "moviecart-39771.appspot.com",
  messagingSenderId: "1013555150840",
  appId: "1:1013555150840:web:5a575a9b6955c7260ce00d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

