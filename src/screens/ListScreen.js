import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Layout from "./Layout";
import ListCard from "../components/ListCard";
import { getUser, getUserList } from "../firebase/api";
import { FlatList } from "react-native-gesture-handler";

export default function ListScreen({ navigation }) {
  const [userLists, setUserLists] = useState([]);

  useEffect(() => {
    // // Application needs to know which user is authenticated before making request
    // getUser();

    getUserList().then((res) => {
      setUserLists(res);
    });
  }, []);

  return (
    <Layout title="Your lists">
      <View style={styles.container}>
        <FlatList
          data={userLists}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
          renderItem={({ item }) => (
            <ListCard list={item} navigation={navigation} />
          )}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    // marginRight: 10,
  },
});
