import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

/**
 * Initialize a new firebase instance if one already hasn't been created
 */
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  // if already initialized, use that one
  firebase.app();
}

const db = firebase.firestore();

/**
 * Fetches the signed in user in Firebase Authentication
 */
export const getUserFromFirebase = async () => {
  return await firebase.auth().currentUser;
};

/**
 * Fetches the signed in user in the users collection of Firestore
 * @returns {displayName: string, email: string, uid: string}
 */
export const getUserFromFireStore = async () => {
  const currentUser = firebase.auth().currentUser;

  return await db
    .collection("users")
    .doc(currentUser.uid)
    .get()
    .then((doc) => {
      console.log(doc);

      return doc.data();
    });
};

/**
 * Fetches all created lists of the signed in user
 * @returns
 */
export const getUserList = async () => {
  let fetchLists = [];
  const currentUser = firebase.auth().currentUser;

  return await db
    .collection("users")
    .doc(currentUser.uid)
    .collection("lists")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        fetchLists.push({ id: doc.id, ...doc.data() });
      });

      return fetchLists;
    });
};
