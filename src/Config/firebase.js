import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCRwK_ISRALkWj31xPa-iBGICT67wwPeeA",
    authDomain: "pictionar-io.firebaseapp.com",
    projectId: "pictionar-io",
    storageBucket: "pictionar-io.appspot.com",
    messagingSenderId: "39757631102",
    appId: "1:39757631102:web:a707c39d881ef8b996d22f",
    measurementId: "G-G3D1HLDD39"
  };

 firebase.initializeApp(firebaseConfig);
 //firebase.auth = firebase.auth();
 
 export default firebase;