import React, { useState, useEffect, useRef } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { BaseButton } from "react-native-gesture-handler";
import { Feather, Ionicons } from "@expo/vector-icons";
import { v4 as uuidv4 } from "uuid";

export default function Task(props) {
  const textInputReference = useRef();
  const { isInputEmpty, newTask, updateList, deleteFromList } = props;
  const { id, taskTitle, taskFinished } = props.content;

  const [title, setTitle] = useState(taskTitle);
  const [completed, setCompleted] = useState(taskFinished);
  const [isFocused, setFocused] = useState(true);

  useEffect(() => {
    if (isFocused === false && taskTitle === "" && newTask === true) {
      isInputEmpty(true);
    }
  }, [isFocused, isInputEmpty, newTask, taskTitle]);

  const renderRightActions = () => (
    <BaseButton rippleColor="#fff" onPress={() => deleteFromList(id)}>
      <View style={styles.iconDelete}>
        <Ionicons name="close-sharp" size={24} color={"#000"} />
      </View>
    </BaseButton>
  );

  const updateTask = (type) => {
    if (type === "TITLE") {
      if (newTask === true && title !== "") {
        const uuid = uuidv4();
        const task = {
          id: uuid,
          taskTitle: title,
          taskFinished: completed,
        };
        updateList(task);
      } else if (title !== taskTitle) {
        const task = {
          id: id,
          taskTitle: title,
          taskFinished,
        };
        updateList(task);
      }
    } else if (type === "COMPLETION") {
      const task = {
        id,
        taskTitle,
        taskFinished: !completed,
      };

      updateList(task);
      setCompleted(!completed);
    }
  };

  const reduceOpacity = () => (completed ? { opacity: 0.5 } : { opacity: 1 });

  // Take either "checkbox" or "text" as argument and returns styling for the completed variant.
  const styleCompleteTask = (type) => {
    if (completed && type === "checkbox") {
      return { color: "#7F8A9D" };
    }

    if (completed && type === "text") {
      return { textDecorationLine: "line-through", color: "#7F8A9D" };
    }
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={[styles.todoContainer, reduceOpacity()]}>
        <TouchableOpacity onPress={() => updateTask("COMPLETION")}>
          <Feather
            name={completed ? "check-square" : "square"}
            size={24}
            style={[styles.todoCheckbox, styleCompleteTask("checkBox")]}
          />
        </TouchableOpacity>
        <TextInput
          autoFocus={newTask && true}
          autoCorrect={false}
          spellCheck={false}
          ref={textInputReference}
          onChangeText={(text) => setTitle(text)}
          onEndEditing={() => updateTask("TITLE")}
          onFocus={() => newTask && setFocused(true)}
          onBlur={() => newTask && setFocused(false)}
          style={[styles.todo, styleCompleteTask("text")]}
        >
          {taskTitle}
        </TextInput>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 8,
  },
  todoCheckbox: {
    width: 44,
    color: "#000",
  },
  todo: {
    fontSize: 16,
    fontFamily: "Roboto",
    textDecorationLine: "none",
    color: "#000",
    width: "80%",
  },
  iconDelete: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    flex: 1,
  },
});
