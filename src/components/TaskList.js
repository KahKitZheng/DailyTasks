import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import Task from "./Task";

export default function TaskList({ subLists }) {
  const { title, color, tasks } = subLists;

  const taskCount = tasks.length;
  const taskCompleted = tasks.filter((task) => task.completed).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: color ? color : "#000" }]}>
          {title}
        </Text>
        <Text style={styles.numberOfTasks}>
          {taskCompleted}/{taskCount}
        </Text>
      </View>

      <View>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <Task content={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#C0C0C0",
    borderBottomWidth: 2,
    marginBottom: 6,
    paddingBottom: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  numberOfTasks: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Roboto",
    color: "#C0C0C0",
  },
});
