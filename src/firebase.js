// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA578gl1eqwP8y64XMu_siMy28XuldBD98",
  authDomain: "tarek-doctor-app.firebaseapp.com",
  databaseURL: "https://tarek-doctor-app-default-rtdb.firebaseio.com",
  projectId: "tarek-doctor-app",
  storageBucket: "tarek-doctor-app.appspot.com",
  messagingSenderId: "552670165262",
  appId: "1:552670165262:web:958d5c99427ea332473f5f",
  measurementId: "G-Q8PTQF6BQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
