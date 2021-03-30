import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Modal, Text } from "react-native";
import Layout from "./Layout";
import ListCard from "../components/ListCard";
import { getUserList, addList } from "../firebase/api";
import { FlatList } from "react-native-gesture-handler";
import AddListModal from "../components/AddListModal";
// import AddListModal from "../components/OldAddListModal";

export default function ListScreen({ navigation }) {
  const [userLists, setUserLists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getUserList().then((res) => {
      setUserLists(res);
    });
  }, []);

  return (
    <Layout title="Your lists">
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
      <View style={styles.growSize}>
        <Pressable
          style={styles.growSize}
          onLongPress={() => setModalVisible(true)}
        >
          <FlatList
            data={userLists}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              flexGrow: 1,
            }}
            renderItem={({ item }) => (
              <ListCard list={item} navigation={navigation} />
            )}
            keyboardShouldPersistTaps="always"
          />
        </Pressable>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  growSize: {
    flexGrow: 1,
  },
});
