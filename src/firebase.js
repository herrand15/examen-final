import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCW2pzc5fJUfriKMzYOBx0URkZctU2UIpQ",
    authDomain: "finalexam-faa56.firebaseapp.com",
    databaseURL: "https://finalexam-faa56.firebaseio.com",
    projectId: "finalexam-faa56",
    storageBucket: "finalexam-faa56.appspot.com",
    messagingSenderId: "692250976593",
    appId: "1:692250976593:web:f9fbfb023461b1c7113370",
};
// Initialize Firebase
var firebdb = firebase.initializeApp(firebaseConfig);
export default firebdb;
