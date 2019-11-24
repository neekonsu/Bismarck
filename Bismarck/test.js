var firebase = require('firebase');
// define private firebase credentials
var moment = require("moment");
var firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyAn_mPJ2bBVWPLAms_gTNFSAecCtGIA53I",
  authDomain: "bismarck-a7d2f.firebaseapp.com",
  databaseURL: "https://bismarck-a7d2f.firebaseio.com",
  projectId: "bismarck-a7d2f",
  storageBucket: "bismarck-a7d2f.appspot.com",
  messagingSenderId: "991036476249",
  appId: "1:991036476249:web:ba145381c33bba4eb51a48"
};
// initialize firebase app
firebase.initializeApp(firebaseConfig);
var ref = firebase.app().database().ref();
for (var i=0; i<100;i++) {
    var date = new Date();
    ref.child("timestamps").push(date.getMonth()+"month "+date.getDate()+"date "+moment().get("hour") + "hours " + moment().get("minute") + "minutes " + moment().get("second") + "seconds " + moment().get("millisecond") + "milliseconds");
}