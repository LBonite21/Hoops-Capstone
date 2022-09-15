import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        options={{ headerShown: false }}
        name=" "
        component={LoginScreen}
      />
      <RootStack.Screen
        component={SignUpScreen}
        name="Sign Up Screen"
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
