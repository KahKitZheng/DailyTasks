import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

const db = firebase.firestore();

/**
 * Initialize a new firebase instance if one already hasn't been created
 */
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  // if already initialized, use that one
  firebase.app();
}

/**
 * Fetches the logged in user object
 */
export const getUser = async () => {
  return await firebase.auth().currentUser;
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
