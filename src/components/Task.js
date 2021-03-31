import React, { useState, useEffect, useRef } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Task({ content, isInputEmpty, newTask }) {
  const { title, completed } = content;

  const [taskTitle, setTaskTitle] = useState("");
  const [taskFinished, setTaskFinished] = useState("");
  const [isFocused, setFocused] = useState(true);

  const textInputReference = useRef(null);

  useEffect(() => {
    setTaskTitle(title);
    setTaskFinished(completed);
  }, [title, completed]);

  useEffect(() => {
    /**
     * TODO: Condition might be incorrect,
     * especially the newTask prop might be unnecessary.
     */
    if (isFocused === false && taskTitle === "" && newTask === true) {
      isInputEmpty(true);
    }
  }, [isFocused, textInputReference]);

  return (
    <View style={[styles.todoContainer, { opacity: taskFinished ? 0.5 : 1 }]}>
      <TouchableOpacity onPress={() => setTaskFinished(!taskFinished)}>
        <Feather
          name={taskFinished ? "check-square" : "square"}
          size={24}
          style={{ width: 44, color: taskFinished ? "#7F8A9D" : "#000" }}
        />
      </TouchableOpacity>
      <TextInput
        value={taskTitle}
        autoFocus={true}
        autoCorrect={false}
        spellCheck={false}
        onChangeText={(text) => setTaskTitle(text)}
        ref={textInputReference}
        onFocus={() => newTask === true && setFocused(true)}
        onBlur={() => newTask === true && setFocused(false)}
        style={[
          styles.todo,
          {
            textDecorationLine: taskFinished ? "line-through" : "none",
            color: taskFinished ? "#7F8A9D" : "#000",
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
