import React from "react";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";

export default function Layout({ title, underTitle, bgColor, children }) {
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: bgColor ? bgColor : "#FFCD2D" },
      ]}
    >
      <View style={styles.header}>
        {underTitle && <Text style={styles.underTitle}>{underTitle}</Text>}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.main}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FFCD2D",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  header: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  title: {
    fontSize: 36,
    fontFamily: "Roboto",
    fontWeight: "bold",
    paddingHorizontal: 8,
  },
  underTitle: {
    fontSize: 16,
    fontFamily: "Roboto",
    paddingHorizontal: 8,
  },
  main: {
    flex: 5,
    backgroundColor: "#fff",
    alignSelf: "stretch",
    borderTopLeftRadius: 30,
    // paddingHorizontal: 20,
    elevation: 10,
  },
});
