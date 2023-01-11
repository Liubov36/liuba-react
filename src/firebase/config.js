import * as firebase from 'firebase';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: 'AIzaSyBizZjzn1vp8kFpy5DQ_TvAwkZkYnxiZo4',
    authDomain: 'liuba-react.firebaseapp.com',
    projectId: 'liuba-react',
    storageBucket: 'liuba-react.appspot.com',
    messagingSenderId: '750563889952',
    appId: '1:750563889952:web:b991aba804c5a834273d45',
    measurementId: 'G-J1RZKX981N'
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);