import app from "firebase/app";
import firebase  from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCa1eXxGhhJIwynDFiGpbZY09871aqrjC8",
  authDomain: "proyectointegrador-firebase.firebaseapp.com",
  projectId: "proyectointegrador-firebase",
  storageBucket: "proyectointegrador-firebase.firebasestorage.app",
  messagingSenderId: "402371640233",
  appId: "1:402371640233:web:c93c63323ba34dda7222b8"
};

app.initializeApp(firebaseConfig);

export const db = app.firestore();
export const auth = firebase.auth();
export const storage = app.storage();