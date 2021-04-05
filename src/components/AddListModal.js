import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { addList } from "../firebase/api";

export default function AddListModal({ closeModal }) {
  const backgroundColors = [
    "#5CD859",
    "#24A6D9",
    "#595BD9",
    "#8022D0",
    "#D159D8",
    "#D85963",
    "#D88559",
  ];

  const [listTitle, setListTitle] = useState("");
  const [listColor, setListColor] = useState(backgroundColors[0]);

  function renderColors() {
    return backgroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => setListColor(color)}
        />
      );
    });
  }

  function createList() {
    const list = { listTitle, listColor };
    addList(list);
    closeModal();
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
        <Ionicons name="close-sharp" size={24} color={"#000"} />
      </TouchableOpacity>

      <View style={styles.main}>
        <Text style={styles.title}> Create a list </Text>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={listTitle}
          onChangeText={(text) => setListTitle(text)}
          style={styles.input}
        />
        <View style={styles.colorList}>{renderColors()}</View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: listColor }]}
          onPress={() => createList()}
        >
          <Text style={styles.buttonText}>Create!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  main: {
    alignSelf: "stretch",
    marginHorizontal: 32,
  },
  title: {
    alignSelf: "center",
    color: "#000",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 16,
  },
  label: {
    marginTop: 8,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#24A6D9",
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    marginBottom: 18,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  colorList: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    height: 50,
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
