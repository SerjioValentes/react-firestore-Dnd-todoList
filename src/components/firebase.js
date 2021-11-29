import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { getFirestore } from "@firebase/firestore";


var firebaseConfig = {
 *
}

const fire = firebase.initializeApp(firebaseConfig)

export default fire;
export const db = getFirestore(fire);

// npm install -g firebase-tools
