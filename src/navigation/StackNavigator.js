import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Easing } from "react-native";

// Import screens
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ListScreen from "../screens/ListScreen";
import ListDetailScreen from "../screens/ListDetailScreen";

const Stack = createStackNavigator();
const config = {
  animation: "timing",
  config: {
    duration: 0,
    easing: Easing.ease,
  },
};

export const AuthNavigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Sign In" component={SignInScreen} />
    <Stack.Screen name="Sign Up" component={SignUpScreen} />
  </Stack.Navigator>
);

export const TodoNavigation = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Lists" options={{ title: "" }} component={ListScreen} />
    <Stack.Screen
      name="List Details"
      options={{
        title: "",
        transitionSpec: {
          open: config,
          close: config,
        },
      }}
      component={ListDetailScreen}
    />
  </Stack.Navigator>
);
