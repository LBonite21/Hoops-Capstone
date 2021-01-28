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
import { ScrollView } from "react-native-gesture-handler";
import * as Font from "expo-font";

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Text>Login Page</Text>;
  }
}
