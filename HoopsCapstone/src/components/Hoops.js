import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import * as Font from "expo-font";

import RootStackScreen from './RootStackScreen';

const OriginalSignUpScreen = ({ navigation, route }) => {
  return (
    <View>
      <Text>Sign-Up Screen</Text>
    </View>
  );
};

const MapScreen = ({ navigation, route }) => {
  return (
    <View>
      <Text>Map Screen</Text>
    </View>
  );
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Hoops = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
      {/* <Stack.Navigator>
        <Stack.Screen name="Map Page" component={MapScreen}/>
      </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default Hoops;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  home_btn: {
    marginTop: 35,
    backgroundColor: "#355a20",
    padding: 9,
    borderRadius: 2,
  },
});
