import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
      tabBarOptions={{ style: { paddingBottom: 8 } }}
    >
      <Tab.Screen name="Pomodoro" component={PomdoroNavigation} />
      <Tab.Screen name="Home" component={HomeNavigation} />
      <Tab.Screen name="Lists" component={TodoNavigation} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
