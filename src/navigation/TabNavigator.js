import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import {
  HomeNavigation,
  TodoNavigation,
  PomdoroNavigation,
} from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#000",
        inactiveTintColor: "#C0C0C0",
        style: { height: 48, paddingTop: 6, paddingBottom: 4 },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Pomodoro: "clock",
            Home: "home",
            Lists: "list",
          };

          return <Feather name={icons[route.name]} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Pomodoro" component={PomdoroNavigation} />
      <Tab.Screen name="Home" component={HomeNavigation} />
      <Tab.Screen
        name="Lists"
        component={TodoNavigation}
        options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
