import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB-szdpxtXPajz_oYPz7caFMoQAvZZXjyI",
  authDomain: "mymoney-aebc4.firebaseapp.com",
  projectId: "mymoney-aebc4",
  storageBucket: "mymoney-aebc4.appspot.com",
  messagingSenderId: "990764057419",
  appId: "1:990764057419:web:6e57f5f4d46bdf8cc2dece"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp
const timeStamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth,timeStamp };
