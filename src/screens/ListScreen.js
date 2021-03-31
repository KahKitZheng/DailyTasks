import React, { useState, useEffect, useLayoutEffect } from "react";
import { Pressable, Modal } from "react-native";
import Layout from "./Layout";
import ListCard from "../components/ListCard";
import { getUserList, deleteList, addSubList } from "../firebase/api";
import { FlatList } from "react-native-gesture-handler";
import AddListModal from "../components/AddListModal";
import { v4 as uuidv4 } from "uuid";
import { Feather } from "@expo/vector-icons";

export default function ListScreen({ navigation, route }) {
  const [userLists, setUserLists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getUserList().then((res) => {
      setUserLists(res);
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        backgroundColor: "#FFCD2D",
      },
      headerRight: () => (
        <Pressable onPress={() => setModalVisible(true)}>
          <Feather
            name="plus"
            size={24}
            color="#000"
            style={{ paddingRight: 12 }}
          />
        </Pressable>
      ),
    });
  }, [navigation]);

  // Watch for new subLists to be added in a specifc user's list
  useEffect(() => {
    if (route.params?.addSubList) {
      const uuid = uuidv4();
      const { listID, subListTitle, subListColor } = route.params.addSubList;

      /**
       * Prepare an sublists object that can be passed on in the local userLists and Firestore
       */
      const subListToAdd = {
        id: uuid,
        title: subListTitle,
        color: subListColor,
        tasks: [],
      };

      // Update Firestore
      addSubList(listID, subListToAdd);

      /**
       * Find the index of the list that needs to be changed,
       * then copies the local userList into a variable
       * and finally pushes the previous defined object in the local state
       */
      let findListByID = (list) => list.id === listID;
      let listIndex = userLists.findIndex(findListByID);

      let oldUserLists = userLists;

      oldUserLists[listIndex].sublists.push(subListToAdd);

      /**
       * Lastly navigate back to list details screen passing the updated data
       */
      navigation.navigate("List Details", {
        id: oldUserLists[listIndex].id,
        listTitle: oldUserLists[listIndex].title,
        listColor: oldUserLists[listIndex].color,
        subLists: oldUserLists[listIndex].sublists,
      });
    }
  }, [route.params?.addSubList]);

  function handleDeleteList(listID) {
    let filtered = userLists.filter((list) => list.id !== listID);

    deleteList(listID);

    setUserLists(filtered);
  }

  return (
    <Layout title="Your lists" header={true}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AddListModal
          closeModal={() => {
            getUserList().then((res) => {
              setUserLists(res);
            });
            setModalVisible(false);
          }}
        />
      </Modal>
      <FlatList
        data={userLists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingVertical: 20,
          flexGrow: 1,
        }}
        renderItem={({ item }) => (
          <ListCard
            list={item}
            navigation={navigation}
            handleDeleteList={handleDeleteList}
          />
        )}
        keyboardShouldPersistTaps="always"
      />
    </Layout>
  );
}
