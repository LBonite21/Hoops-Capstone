import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name=" " component={LoginScreen} />
      <RootStack.Screen name="Sign Up Screen" component={SignUpScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
