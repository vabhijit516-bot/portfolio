// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACo0CwNHtCjw9yQ8-gsbGt7znSHw7rzoc",
  authDomain: "abhijitportfolio-3d187.firebaseapp.com",
  projectId: "abhijitportfolio-3d187",
  storageBucket: "abhijitportfolio-3d187.firebasestorage.app",
  messagingSenderId: "955196829093",
  appId: "1:955196829093:web:612f95cbd8e00fb87d0c4c",
  measurementId: "G-KBFDNDN034"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);