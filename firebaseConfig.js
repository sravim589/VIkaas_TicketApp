import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCdoCMea-NACqrUu_fxS9NFIf1NII0s3Es",
  authDomain: "authotp-88578.firebaseapp.com",
  databaseURL: "https://authotp-88578.firebaseio.com",
  projectId: "authotp-88578",
  storageBucket: "authotp-88578.appspot.com",
  messagingSenderId: "1023611003526",
  appId: "1:1023611003526:android:e47108ce67bd2594c32707",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase, firestore, auth };