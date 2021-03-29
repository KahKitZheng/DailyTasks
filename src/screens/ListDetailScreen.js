import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import Layout from "./Layout";
import TaskList from "../components/TaskList";

export default function ListDetailScreen({ route }) {
  const { listTitle, listColor, subLists } = route.params;

  return (
    <Layout title={listTitle} bgColor={listColor}>
      <FlatList
        data={subLists}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <TaskList subLists={item} />}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
