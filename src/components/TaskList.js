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
  const [taskList, setTaskList] = useState(subListTasks);
  const [todoVisible, setTodoVisible] = useState(false);

  const taskCount = taskList.length;
  const taskCompleted = taskList.filter((task) => task.taskFinished).length;

  const updateList = useCallback(
    (newTask) => {
      let findTaskByID = (task) => task.id === newTask.id;
      let listIndex = taskList.findIndex(findTaskByID);

      // Add new task
      if (listIndex === -1) {
        setTaskList([...taskList, newTask]);

        updateTaskList(listID, id, [...taskList, newTask]);
      }

      // Update existing task
      if (listIndex >= 0) {
        const copyList = [...taskList];

        copyList[listIndex].taskTitle = newTask.taskTitle;
        copyList[listIndex].taskFinished = newTask.taskFinished;

        setTaskList(copyList);
        updateTaskList(listID, id, copyList);
      }
    },
    [taskList]
  );

  function isInputEmpty(value) {
    value === true ? setTodoVisible(false) : setTodoVisible(true);
  }

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
          data={taskList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Task content={item} updateList={updateList} />
          )}
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
