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
import { updateTaskListTitle, updateTaskList } from "../firebase/api";

export default function TaskList({ listID, subList }) {
  const { id, subListTitle, subListColor, subListTasks } = subList;
  const [taskListTitle, setTaskListTitle] = useState(subListTitle);
  const [taskList, setTaskList] = useState(subListTasks);
  const [todoVisible, setTodoVisible] = useState(false);

  const taskCount = taskList.length;
  const taskCompleted = taskList.filter((task) => task.taskFinished).length;

  const isInputEmpty = (value) => {
    value === true ? setTodoVisible(false) : setTodoVisible(true);
  };

  const updateTitle = () => updateTaskListTitle(listID, id, taskListTitle);

  const updateList = useCallback(
    (newTask) => {
      const findTaskByID = (task) => task.id === newTask.id;
      const listIndex = taskList.findIndex(findTaskByID);

      // Add new task if task does not exist in the list
      if (listIndex === -1) {
        setTaskList([...taskList, newTask]);
        updateTaskList(listID, id, [...taskList, newTask]);
      } else {
        // Else update existing task
        const copyList = [...taskList];

        copyList[listIndex].taskTitle = newTask.taskTitle;
        copyList[listIndex].taskFinished = newTask.taskFinished;

        setTaskList(copyList);
        updateTaskList(listID, id, copyList);
      }
    },
    [taskList]
  );

  const deleteFromList = (taskID) => {
    const copyList = [...taskList];
    const updatedList = copyList.filter((task) => task.id !== taskID);

    setTaskList(updatedList);
    updateTaskList(listID, id, updatedList);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          autoCorrect={false}
          spellCheck={false}
          onChangeText={(text) => setTaskListTitle(text)}
          onEndEditing={() => updateTitle()}
          style={[
            styles.title,
            { color: subListColor ? subListColor : "#000" },
          ]}
        >
          {taskListTitle}
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
            <Task
              content={item}
              updateList={updateList}
              deleteFromList={deleteFromList}
            />
          )}
        />
        <TouchableWithoutFeedback onPress={() => setTodoVisible(true)}>
          {todoVisible === false ? (
            <View style={{ minHeight: 50 }} />
          ) : (
            <Task
              newTask={true}
              content={{ taskTitle: "", taskFinished: false }}
              isInputEmpty={isInputEmpty}
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
