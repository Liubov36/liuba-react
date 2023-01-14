import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = { 
    apiKey : "AIzaSyBizZjzn1vp8kFpy5DQ_TvAwkZkYnxiZo4" , 
    authDomain : "liuba-react.firebaseapp.com" , 
    projectId : "liuba-react" , 
    storageBucket : "liuba-react.appspot.com" , 
    messagingSenderId : "750563889952" , 
    appID : "1:750563889952:web:b991aba804c5a834273d45" , 
    measurementId : "G-J1RZKX981N" 
  };
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);