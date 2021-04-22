import React, { useState } from "react";
import {
  Platform,
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
  const [textFieldWidth, setTextFieldWidth] = useState(0);

  const handleTitleUpdate = () => {
    const listID = idToUpdate;
    updateListTitle(listID, screenTitle);
  };

  const getCardSize = (event) => {
    const { width } = event.nativeEvent.layout;
    setTextFieldWidth(width);
  };

  const renderBackgroundColor = () => {
    return { backgroundColor: bgColor ? bgColor : "#FFCD2D" };
  };

  const renderHeaderStyling = () => {
    return { flex: header === true ? 18 : 5 };
  };

  return (
    <KeyboardAvoidingView style={styles.flex}>
      <SafeAreaView style={[styles.container, renderBackgroundColor()]}>
        <View
          style={styles.header}
          pointerEvents={pointerEvents}
          onLayout={(event) => getCardSize(event)}
        >
          {underTitle && <Text style={styles.underTitle}>{underTitle}</Text>}
          <TextInput
            editable={pointerEvents === "box-none" ? false : true}
            onChangeText={(text) => setScreenTitle(text)}
            onEndEditing={() => handleTitleUpdate()}
            numberOfLines={2}
            maxLength={20}
            style={[styles.title, { width: textFieldWidth }]}
          >
            {pointerEvents === "none" ? title : screenTitle}
          </TextInput>
        </View>
        <View style={[styles.main, renderHeaderStyling()]}>{children}</View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 42 : 0,
  },
  header: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginVertical: 8,
  },
  title: {
    fontSize: 32,
    fontFamily: "Roboto",
    fontWeight: "bold",
    paddingHorizontal: 20,
    minHeight: 78,
  },
  underTitle: {
    fontSize: 16,
    fontFamily: "Roboto",
    paddingHorizontal: 20,
    marginBottom: -16,
  },
  main: {
    flex: 5,
    backgroundColor: "#fff",
    alignSelf: "stretch",
    borderTopLeftRadius: 30,
    elevation: 10,
  },
});
