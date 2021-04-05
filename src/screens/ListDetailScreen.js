import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { getSubLists, deleteSublist } from "../firebase/api";
import Layout from "./Layout";
import TaskList from "../components/TaskList";
import AddSubListModal from "../components/AddSubListModal";

export default function ListDetailScreen({ navigation, route }) {
  const { id, listTitle, listColor } = route.params;
  const [dataFetched, setDataFetched] = useState(false);
  const [renderScreen, setRenderScreen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [subLists, setSubLists] = useState([]);

  useEffect(() => {
    getSubLists(id).then((res) => {
      setSubLists(res);
      setDataFetched(true);
    });

    dataFetched ? setRenderScreen(true) : null;
  }, [navigation, id, dataFetched]);

  useLayoutEffect(() => {
    navigation.setOptions({
      cardStyle: { backgroundColor: listColor },
      headerStyle: { elevation: 0, backgroundColor: listColor },
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Feather
            name="arrow-left"
            size={24}
            color="#000"
            style={styles.headerLeft}
          />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable onPress={() => setModalVisible(true)}>
          <Feather
            name="plus"
            size={24}
            color="#000"
            style={styles.headerRight}
          />
        </Pressable>
      ),
    });
  }, [navigation, listColor]);

  const deleteTaskList = (listID, taskListID) => {
    const copyList = [...subLists];
    const newList = copyList.filter((list) => list.id !== taskListID);

    setSubLists(newList);
    deleteSublist(listID, taskListID);
  };

  return (
    <Layout
      title={listTitle}
      bgColor={listColor}
      header={true}
      pointerEvents="auto"
      idToUpdate={id}
    >
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AddSubListModal
          listID={id}
          navigation={navigation}
          defaultColor={listColor}
          closeModal={() => {
            setModalVisible(false);
            getSubLists(id).then((res) => setSubLists(res));
          }}
        />
      </Modal>
      {renderScreen && subLists.length === 0 ? (
        <View style={styles.emptyPlaceholder}>
          <Text style={styles.placeholderText}>
            Use the + icon to add new lists
          </Text>
        </View>
      ) : (
        <FlatList
          data={subLists}
          keyExtractor={(item) => item.id}
          styling={styles.taskLists}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TaskList
              listID={id}
              subList={item}
              deleteTaskList={deleteTaskList}
            />
          )}
        />
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  emptyPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
    color: "#C0C0C0",
  },
  taskLists: {
    marginTop: 30,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
  },
  headerLeft: {
    paddingLeft: 16,
  },
  headerRight: {
    paddingRight: 12,
  },
});
