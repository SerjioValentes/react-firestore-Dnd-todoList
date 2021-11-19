import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { getFirestore } from "@firebase/firestore";


var firebaseConfig = {
    apiKey: "AIzaSyDqAOQXKO_U1tWJ1L5xc0vt8u9xhbBY2Nk",
    authDomain: "dndtodolist.firebaseapp.com",
    projectId: "dndtodolist",
    storageBucket: "dndtodolist.appspot.com",
    messagingSenderId: "260034265711",
    appId: "1:260034265711:web:805a6cff33563716de039a"
}

const fire = firebase.initializeApp(firebaseConfig)

export default fire;
export const db = getFirestore(fire);

// npm install -g firebase-tools
