import React from "react";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";

export default function Layout({ children }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>Sunday, 28 March</Text>
        <Text style={styles.greetings}> Hello, User!</Text>
      </View>
      <View style={styles.main}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFCD2D",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  header: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  date: {
    fontSize: 16,
    fontFamily: "Roboto",
    paddingHorizontal: 10,
  },
  greetings: {
    fontSize: 36,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  main: {
    flex: 5,
    backgroundColor: "#fff",
    alignSelf: "stretch",
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    // padding: 20,
    elevation: 10,
  },
});