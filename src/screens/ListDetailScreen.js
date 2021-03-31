import React, { useState, useLayoutEffect } from "react";
import { FlatList, Modal, Pressable } from "react-native";
import Layout from "./Layout";
import TaskList from "../components/TaskList";
import AddSubListModal from "../components/AddSubListModal";
import { Feather } from "@expo/vector-icons";
import { useRef } from "react";

export default function ListDetailScreen({ navigation, route }) {
  const { id, listTitle, listColor, subLists } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const flatListRef = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        backgroundColor: listColor,
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

  /**
   * TODO: Can possibly fixed using the getItemLayout props in Flatlist
   *
   * Doesn't exactly scroll to the given index, however it resolves
   * the bug where it prevents from the keyboard showing up when
   * a new task is created. This bug only occurs when the new tasks is
   * positioned lower than the showing keyboard.
   */
  function scrollToSubList(title) {
    let findTextInputByID = (el) => el.title === title;
    let index = subLists.findIndex(findTextInputByID);

    flatListRef.current.scrollToIndex({
      animated: true,
      index: index,
      viewOffset: 0,
      viewPosition: 1,
    });
  }

  return (
    <Layout title={listTitle} bgColor={listColor} header={true}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AddSubListModal
          listID={id}
          navigation={navigation}
          closeModal={() => setModalVisible(false)}
        />
      </Modal>
      <FlatList
        data={subLists}
        keyExtractor={(item) => item.title}
        showsVerticalScrollIndicator={false}
        ref={flatListRef}
        renderItem={({ item }) => (
          <TaskList subLists={item} scrollToSubList={scrollToSubList} />
        )}
        contentContainerStyle={{
          marginTop: 30,
          paddingBottom: 30,
          borderTopLeftRadius: 20,
        }}
      />
    </Layout>
  );
}
