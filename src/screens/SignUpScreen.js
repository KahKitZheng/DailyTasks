import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import colors from "../utils/colors";
import { AuthContext } from "../context/authContext";

const SignUpScreen = ({ navigation }) => {
  const { signUp } = useContext(AuthContext);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Sign Up</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Display name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setDisplayName(text)}
          value={displayName}
        />
      </View>

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
        onPress={() => signUp({ displayName, email, password })}
      >
        <Text style={styles.buttonText}>sign up</Text>
      </TouchableOpacity>

      <View style={styles.signup}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
          <Text style={styles.link}>Sign in here!</Text>
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
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  signup: {
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
    backgroundColor: colors.blue,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "600",
    fontFamily: "Roboto",
  },
  link: {
    color: colors.blue,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
});

export default SignUpScreen;
