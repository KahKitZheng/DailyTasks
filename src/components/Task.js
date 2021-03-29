import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Task() {
  const [completed, setCompleted] = useState(false);

  return (
    <View style={[styles.todoContainer, { opacity: completed ? 0.5 : 1 }]}>
      <TouchableOpacity onPress={() => setCompleted(!completed)}>
        <Feather
          name={completed ? "check-square" : "square"}
          size={32}
          style={{ width: 44, color: completed ? "#7F8A9D" : "#000" }}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.todo,
          {
            textDecorationLine: completed ? "line-through" : "none",
            color: completed ? "#7F8A9D" : "#000",
          },
        ]}
      >
        Create a Spotify playlist!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 16,
  },
  todo: {
    fontSize: 18,
    fontFamily: "Roboto",
  },
});
