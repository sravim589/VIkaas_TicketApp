import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAMS40Wv1FcJ8oXhJ0vV4yi6FOQw2ViNTg",
  authDomain: "authotp-88578.firebaseapp.com",
  databaseURL: "https://authotp-88578-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "authotp-88578",
  storageBucket: "authotp-88578.appspot.com",
  messagingSenderId: "1023611003526",
  appId: "1:1023611003526:web:c8d701dd2b3a2d8cc32707",
  measurementId: "G-51B2S59CY4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
