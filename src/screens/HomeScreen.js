import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import colors from "../utils/colors";
import TodoList from "../components/TodoList";
import AddListModal from "../components/AddListModal";
import { AuthContext } from "../context/authContext";

import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const HomeScreen = () => {
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const [lists, setLists] = useState([]);
  const [user, setUser] = useState(null);

  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;

    const getUserList = (uid) => {
      let fetchLists = [];

      db.collection("users")
        .doc(uid)
        .collection("lists")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            fetchLists.push({ id: doc.id, ...doc.data() });
          });

          setLists(fetchLists);
        });
    };

    getUserList(currentUser.uid);

    setUser(currentUser);
  }, []);

  const toggleAddTodoModal = () => {
    setAddTodoVisible(!addTodoVisible);
  };

  const addList = (list) => {
    setLists([...lists, { ...list, id: lists.length + 1, todos: [] }]);
  };

  const updateList = (list) => {
    setLists(
      lists.map((item) => {
        return item.id === list.id ? list : item;
      })
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={addTodoVisible}
        onRequestClose={() => toggleAddTodoModal}
      >
        <AddListModal
          closeModal={() => toggleAddTodoModal()}
          addList={addList}
        />
      </Modal>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo{" "}
          <Text style={{ fontWeight: "300", color: colors.blue }}>Lists</Text>
        </Text>
        <View style={styles.divider} />
      </View>

      <View>
        <Text>{user && user.email}</Text>
      </View>
      <TouchableOpacity onPress={signOut}>
        <Text style={styles.link}>sign out</Text>
      </TouchableOpacity>

      <View style={{ marginVertical: 48 }}>
        <TouchableOpacity
          style={styles.addList}
          onPress={() => toggleAddTodoModal()}
        >
          <AntDesign name="plus" size={16} color={colors.blue} />
        </TouchableOpacity>
        <Text style={styles.add}>Add List</Text>
      </View>

      <View style={{ height: 275, paddingLeft: 32 }}>
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TodoList list={item} updateList={updateList} />
          )}
          keyboardShouldPersistTaps="always"
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "900",
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
  link: {
    color: colors.blue,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
});

export default HomeScreen;
