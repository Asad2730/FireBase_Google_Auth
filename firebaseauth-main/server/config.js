const firebase = require("firebase");

// firebaseConfig = {
//   apiKey: "AIzaSyDgUGp5FIGmZdP37xie31eTbKgQSuuWduQ",
//   authDomain: "authentication-2c701.firebaseapp.com",
//   projectId: "authentication-2c701",
//   storageBucket: "authentication-2c701.appspot.com",
//   messagingSenderId: "229995530695",
//   appId: "1:229995530695:web:469668f3b1b4a3256ef1e2",
//   measurementId: "G-T71LP3GJ85",
// };

 firebaseConfig = {
  apiKey: "AIzaSyAgzBQnWah5E00dRCP429IapMdZXtoXU_Y",
  authDomain: "flutterproject-17d98.firebaseapp.com",
  databaseURL: "https://flutterproject-17d98-default-rtdb.firebaseio.com",
  projectId: "flutterproject-17d98",
  storageBucket: "flutterproject-17d98.appspot.com",
  messagingSenderId: "25931669200",
  appId: "1:25931669200:web:d0e6150212703630bb88d5"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
module.exports = User;
