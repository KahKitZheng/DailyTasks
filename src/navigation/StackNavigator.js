import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import screens
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PomodoroScreen from "../screens/PomodoroScreen";
import ListScreen from "../screens/ListScreen";
import ListDetailScreen from "../screens/ListDetailScreen";

const Stack = createStackNavigator();

export const AuthNavigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Sign In" component={SignInScreen} />
    <Stack.Screen name="Sign Up" component={SignUpScreen} />
  </Stack.Navigator>
);

export const PomdoroNavigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Pomodoro" component={PomodoroScreen} />
  </Stack.Navigator>
);

export const HomeNavigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

export const TodoNavigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Lists" component={ListScreen} />
    <Stack.Screen name="List Details" component={ListDetailScreen} />
  </Stack.Navigator>
);
