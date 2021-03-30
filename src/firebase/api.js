import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
import { v4 as uuidv4 } from "uuid";

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

/**
 * Add new list to the user's list collection
 */
export const addList = async (list) => {
  const { listTitle, listColor, listDescription } = list;

  const uuid = uuidv4();
  const currentUser = firebase.auth().currentUser;

  const now = firebase.firestore.Timestamp.now();

  return await db
    .collection("users")
    .doc(currentUser.uid)
    .collection("lists")
    .doc(uuid)
    .set({
      id: uuid,
      title: listTitle,
      color: listColor,
      description: listDescription,
      sublists: [],
      createdAt: now.seconds,
      updatedAt: now.seconds,
    });
};

/**
 * Delete the list in the user's list collection
 */
export const deleteList = async (listID) => {
  const currentUser = firebase.auth().currentUser;

  return await db
    .collection("users")
    .doc(currentUser.uid)
    .collection("lists")
    .doc(listID)
    .delete()
    .then(() => {
      console.log(`Successfully deleted: ${listID}`);
    })
    .catch((error) => {
      console.error(`Error removing document: ${listID}`, error);
    });
};

export const addSubList = async (listID, newSubList) => {
  const currentUser = firebase.auth().currentUser;
  const { id, title, color, tasks } = newSubList;

  return await db
    .collection("users")
    .doc(currentUser.uid)
    .collection("lists")
    .doc(listID)
    .update({
      sublists: firebase.firestore.FieldValue.arrayUnion({
        id,
        title,
        color,
        tasks,
      }),
    })
    .then(() => {
      console.log(`Document with ID of: ${listID} successfully updated!`);
    })
    .catch((error) => {
      console.error(`Error removing document: ${listID}`, error);
    });
};
