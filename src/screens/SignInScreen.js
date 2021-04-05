import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../context/authContext";

const SignInScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Sign In</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          autoCompleteType="email"
          value={email}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          value={password}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => signIn({ email, password })}
      >
        <Text style={styles.buttonText}>sign in</Text>
      </TouchableOpacity>

      <View style={styles.signin}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
          <Text style={styles.link}>Sign up here!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  row: {
    alignSelf: "stretch",
    marginHorizontal: 32,
  },
  label: {
    marginTop: 24,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#24A6D9",
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  signin: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignSelf: "stretch",
    marginHorizontal: 32,
    marginTop: 24,
    height: 44,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    backgroundColor: "#24A6D9",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Roboto",
  },
  link: {
    color: "#24A6D9",
    fontWeight: "700",
    fontFamily: "Roboto",
  },
});

export default SignInScreen;
