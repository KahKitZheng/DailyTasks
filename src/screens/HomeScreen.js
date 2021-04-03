import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Text, View, StyleSheet } from "react-native";
import { getUserFromFireStore } from "../firebase/api";
import { getToday } from "../utils/date";

export default function HomeScreen() {
  const [displayName, setDisplayName] = useState("");
  const today = getToday();

  useEffect(() => {
    getUserFromFireStore().then((user) => {
      setDisplayName(user.displayName);
    });
  }, []);

  return (
    <Layout
      title={`Hello, ${displayName}`}
      underTitle={today}
      pointerEvents="none"
    >
      <View style={styles.container}>
        <Text>:D</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
