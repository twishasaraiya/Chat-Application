import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAyItHK9KhbGCqdSjsBSW3O7ZeR2Z1xmRk",
    authDomain: "react-stack-6765e.firebaseapp.com",
    databaseURL: "https://react-stack-6765e.firebaseio.com",
    projectId: "react-stack-6765e",
    storageBucket: "react-stack-6765e.appspot.com",
    messagingSenderId: "510382972922"
  };

firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
