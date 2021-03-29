import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Task({ content }) {
  const { title, completed } = content;
  const [finished, setFinished] = useState(completed);

  return (
    <View style={[styles.todoContainer, { opacity: finished ? 0.5 : 1 }]}>
      <TouchableOpacity onPress={() => setFinished(!finished)}>
        <Feather
          name={finished ? "check-square" : "square"}
          size={24}
          style={{ width: 44, color: finished ? "#7F8A9D" : "#000" }}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.todo,
          {
            textDecorationLine: finished ? "line-through" : "none",
            color: finished ? "#7F8A9D" : "#000",
          },
        ]}
      >
        {title}
      </Text>
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
