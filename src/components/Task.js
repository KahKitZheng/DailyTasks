import React, { useState, useEffect, useRef } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { v4 as uuidv4 } from "uuid";

export default function Task({ content, isInputEmpty, newTask, updateList }) {
  const textInputReference = useRef();
  const { id, taskTitle, taskFinished } = content;

  const [title, setTitle] = useState(taskTitle);
  const [completed, setCompleted] = useState(taskFinished);
  const [isFocused, setFocused] = useState(true);

  useEffect(() => {
    if (isFocused === false && taskTitle === "" && newTask === true) {
      isInputEmpty(true);
    }
  }, [isFocused, isInputEmpty, newTask, taskTitle]);

  function updateTask(type) {
    const uuid = uuidv4();
    const task = {
      id: id ? id : uuid,
      taskTitle: title,
      taskFinished: completed,
    };

    if (title !== taskTitle) {
      updateList(task);
    } else {
      const task = { id, taskTitle, taskFinished: !completed };

      updateList(task);
      setCompleted(!completed);
    }
  }

  return (
    <View style={[styles.todoContainer, { opacity: completed ? 0.5 : 1 }]}>
      <TouchableOpacity onPress={() => updateTask()}>
        <Feather
          name={completed ? "check-square" : "square"}
          size={24}
          style={{ width: 44, color: completed ? "#7F8A9D" : "#000" }}
        />
      </TouchableOpacity>
      <TextInput
        autoFocus={newTask && true}
        autoCorrect={false}
        spellCheck={false}
        ref={textInputReference}
        onChangeText={(text) => setTitle(text)}
        onEndEditing={() => updateTask()}
        onFocus={() => newTask === true && setFocused(true)}
        onBlur={() => newTask === true && setFocused(false)}
        style={[
          styles.todo,
          {
            textDecorationLine: completed ? "line-through" : "none",
            color: completed ? "#7F8A9D" : "#000",
          },
        ]}
      >
        {taskTitle}
      </TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 8,
  },
  todo: {
    fontSize: 16,
    fontFamily: "Roboto",
  },
});
