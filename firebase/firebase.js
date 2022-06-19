import firebase from "firebase"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDUt1cBbiR6VS57TUCdQr12lsllNOjE2jQ",
  authDomain: "tv-shows-app-def5a.firebaseapp.com",
  projectId: "tv-shows-app-def5a",
  storageBucket: "tv-shows-app-def5a.appspot.com",
  messagingSenderId: "264875846637",
  appId: "1:264875846637:web:473fc0253f0ba016e515e4",
};

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
export default firebase
