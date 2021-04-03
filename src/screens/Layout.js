import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { updateListTitle } from "../firebase/api";

export default function Layout(props) {
  const {
    title,
    underTitle,
    bgColor,
    header,
    pointerEvents,
    idToUpdate,
    children,
  } = props;

  const [screenTitle, setScreenTitle] = useState(title);

  const handleTitleUpdate = () => {
    const listID = idToUpdate;
    updateListTitle(listID, screenTitle);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: bgColor ? bgColor : "#FFCD2D" },
        ]}
      >
        <View style={styles.header} pointerEvents={pointerEvents}>
          {underTitle && <Text style={styles.underTitle}>{underTitle}</Text>}
          <TextInput
            editable={pointerEvents === "box-none" ? false : true}
            onChangeText={(text) => setScreenTitle(text)}
            onEndEditing={() => handleTitleUpdate()}
            style={styles.title}
          >
            {pointerEvents === "none" ? title : screenTitle}
          </TextInput>
        </View>
        <View style={[styles.main, { flex: header === true ? 18 : 5 }]}>
          {children}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 56 : 0,
  },
  header: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingHorizontal: 12,
    paddingBottom: 4,
  },
  title: {
    fontSize: 36,
    fontFamily: "Roboto",
    fontWeight: "bold",
    paddingHorizontal: 8,
    color: "#000",
    minHeight: 60,
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
    elevation: 10,
  },
});
