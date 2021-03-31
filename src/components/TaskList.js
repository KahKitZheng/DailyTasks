import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import Task from "./Task";

export default function TaskList({ subLists, scrollToSubList }) {
  const { title, color, tasks } = subLists;

  const [todoVisible, setTodoVisible] = useState(false);

  const taskCount = tasks.length;
  const taskCompleted = tasks.filter((task) => task.completed).length;

  function isInputEmpty(value) {
    value === true ? setTodoVisible(false) : setTodoVisible(true);
  }

  function sendActionBackUp() {
    scrollToSubList(title);
    setTodoVisible(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          autoCorrect={false}
          spellCheck={false}
          style={[styles.title, { color: color ? color : "#000" }]}
        >
          {title}
        </TextInput>
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
        <TouchableWithoutFeedback onPress={() => sendActionBackUp()}>
          {todoVisible === false ? (
            <View style={{ minHeight: 50 }} />
          ) : (
            <Task
              content={{ title: "", completed: false }}
              isInputEmpty={isInputEmpty}
              newTask={true}
            />
          )}
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
