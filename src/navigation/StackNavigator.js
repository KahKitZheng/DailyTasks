import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import screens
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ListScreen from "../screens/ListScreen";
import ListDetailScreen from "../screens/ListDetailScreen";

const Stack = createStackNavigator();

export const AuthNavigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Sign In" component={SignInScreen} />
    <Stack.Screen name="Sign Up" component={SignUpScreen} />
  </Stack.Navigator>
);

export const TodoNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen name="Lists" options={{ title: "" }} component={ListScreen} />
    <Stack.Screen
      name="List Details"
      options={{ title: "" }}
      component={ListDetailScreen}
    />
  </Stack.Navigator>
);
