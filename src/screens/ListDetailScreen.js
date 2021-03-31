import React, { useState, useLayoutEffect } from "react";
import { FlatList, Modal, Pressable } from "react-native";
import Layout from "./Layout";
import TaskList from "../components/TaskList";
import AddSubListModal from "../components/AddSubListModal";
import { Feather } from "@expo/vector-icons";

export default function ListDetailScreen({ navigation, route }) {
  const { id, listTitle, listColor, subLists } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

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
        renderItem={({ item }) => <TaskList subLists={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 30,
          borderTopLeftRadius: 20,
        }}
      />
    </Layout>
  );
}
