import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwQyl1D2Jzd4YFchWaWN9ahxKKywxYmkQ",
  authDomain: "whatsapp-mern-32e01.firebaseapp.com",
  databaseURL: "https://whatsapp-mern-32e01.firebaseio.com",
  projectId: "whatsapp-mern-32e01",
  storageBucket: "whatsapp-mern-32e01.appspot.com",
  messagingSenderId: "198131752310",
  appId: "1:198131752310:web:e08dacd598c9624db9ee57",
  measurementId: "G-YKDVQKH14Z",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
