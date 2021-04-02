import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import Task from "./Task";
import { updateTaskList } from "../firebase/api";

export default function TaskList({ listID, subList }) {
  const { id, subListTitle, subListColor, subListTasks } = subList;

  const [todoVisible, setTodoVisible] = useState(false);

  const taskCount = subListTasks.length;
  const taskCompleted = subListTasks.filter((task) => task.completed).length;

  function isInputEmpty(value) {
    value === true ? setTodoVisible(false) : setTodoVisible(true);
  }

  const updateList = useCallback((newTask) => {
    subListTasks.push(newTask);

    updateTaskList(listID, id, subListTasks);
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          autoCorrect={false}
          spellCheck={false}
          style={[
            styles.title,
            { color: subListColor ? subListColor : "#000" },
          ]}
        >
          {subListTitle}
        </TextInput>
        <Text style={styles.numberOfTasks}>
          {taskCompleted}/{taskCount}
        </Text>
      </View>

      <View>
        <FlatList
          data={subListTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Task content={item} />}
        />
        <TouchableWithoutFeedback onPress={() => setTodoVisible(true)}>
          {todoVisible === false ? (
            <View style={{ minHeight: 50 }} />
          ) : (
            <Task
              content={{ taskTitle: "", taskFinished: false }}
              isInputEmpty={isInputEmpty}
              newTask={true}
              updateList={updateList}
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
