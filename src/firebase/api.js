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
 * Fetches the signed in user in the users collection of Firestore
 */
export const getUserFromFireStore = async () => {
  const currentUser = firebase.auth().currentUser;

  return await db
    .collection("users")
    .doc(currentUser.uid)
    .get()
    .then((doc) => {
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
  const now = firebase.firestore.Timestamp.now();
  const currentUser = firebase.auth().currentUser;

  return await db
    .collection("users")
    .doc(currentUser.uid)
    .collection("lists")
    .doc(uuid)
    .set({
      title: listTitle,
      color: listColor,
      description: listDescription,
      createdAt: now.seconds,
      updatedAt: now.seconds,
    });
};

/**
 * Update a list title
 */
export const updateListTitle = async (listID, title) => {
  const currentUser = firebase.auth().currentUser;
  const now = firebase.firestore.Timestamp.now();

  return await db
    .collection("users")
    .doc(currentUser.uid)
    .collection("lists")
    .doc(listID)
    .update({ title, updateAt: now });
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
    .delete();
};

/**
 * Retrieve all tasks in a list
 */
export const getSubLists = async (listID) => {
  let fetchSubLists = [];
  const currentUser = firebase.auth().currentUser;

  return await db
    .collection("users")
    .doc(currentUser.uid)
    .collection("lists")
    .doc(listID)
    .collection("subLists")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        fetchSubLists.push({ id: doc.id, ...doc.data() });
      });
      return fetchSubLists;
    });
};

/**
 * Create a new subList document
 */
export const addSubList = async (listID, newSubList) => {
  const { subListTitle, subListColor } = newSubList;

  const uuid = uuidv4();
  const now = firebase.firestore.Timestamp.now();
  const currentUser = firebase.auth().currentUser;

  return await db
    .collection("users")
    .doc(currentUser.uid)
    .collection("lists")
    .doc(listID)
    .collection("subLists")
    .doc(uuid)
    .set({
      subListTitle,
      subListColor,
      subListTasks: [],
      createdAt: now.seconds,
      updatedAt: now.seconds,
    });
};

export const deleteSublist = async (listID, taskListID) => {
  const currentUser = firebase.auth().currentUser;

  return await db
    .collection("users")
    .doc(currentUser.uid)
    .collection("lists")
    .doc(listID)
    .collection("subLists")
    .doc(taskListID)
    .delete();
};

/**
 * Update the title of a subList
 */
export const updateTaskListTitle = async (listID, taskListID, title) => {
  const currentUser = firebase.auth().currentUser;
  const now = firebase.firestore.Timestamp.now();

  return await db
    .collection("users")
    .doc(currentUser.uid)
    .collection("lists")
    .doc(listID)
    .collection("subLists")
    .doc(taskListID)
    .update({ subListTitle: title, updatedAt: now.seconds });
};

/**
 * It updates the subListTasks property of a subList document.
 * Used for adding new tasks, updating existing tasks or removing it.
 */
export const updateTaskList = async (listID, taskListID, updatedTaskList) => {
  const currentUser = firebase.auth().currentUser;
  const now = firebase.firestore.Timestamp.now();

  return await db
    .collection("users")
    .doc(currentUser.uid)
    .collection("lists")
    .doc(listID)
    .collection("subLists")
    .doc(taskListID)
    .update({
      subListTasks: updatedTaskList,
      updatedAt: now.seconds,
    });
};
