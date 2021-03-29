import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function PomodoroScreen() {
  return (
    <View style={styles.container}>
      <Text> Pomodoro </Text>
      <Text> :D </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
});
