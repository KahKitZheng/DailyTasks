import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Layout from "./Layout";
import { getUser } from "../firebase/api";
import { getToday } from "../utils/date";

export default function HomeScreen() {
  const [user, setUser] = useState([]);
  const today = getToday();

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <Layout title="Your lists" underTitle={today}>
      <View style={styles.container}>
        <Text>{user.email}</Text>
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
