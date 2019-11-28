import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyC7pYV3comYGDCKAksj4Ur7D8fiAAFrz_c",
    authDomain: "trippy-tincture.firebaseapp.com",
    databaseURL: "https://trippy-tincture.firebaseio.com",
    projectId: "trippy-tincture",
    storageBucket: "trippy-tincture.appspot.com",
    messagingSenderId: "15453813353",
    appId: "1:15453813353:web:569a3e3f144a509270c0f8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase