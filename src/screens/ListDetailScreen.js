import React, { useState } from "react";
import { StyleSheet, FlatList, Pressable, Modal } from "react-native";
import Layout from "./Layout";
import TaskList from "../components/TaskList";
import AddSubListModal from "../components/AddSubListModal";

export default function ListDetailScreen({ navigation, route }) {
  const { id, listTitle, listColor, subLists } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Layout title={listTitle} bgColor={listColor}>
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
      <Pressable
        style={styles.container}
        onLongPress={() => setModalVisible(true)}
      >
        <FlatList
          data={subLists}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => <TaskList subLists={item} />}
        />
      </Pressable>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
