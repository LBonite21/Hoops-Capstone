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
    return (
      <View>
        <Text>Login Page</Text>\
        <TouchableOpacity
          style={styles.home_btn}
          onPress={() => {
            navigation.navigate("SignUpPage", {
              name: "Sign-Up Page",
            });
          }}
        >
          <Text>Sign-Up Page</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  home_btn: {
    marginTop: 35,
    backgroundColor: "#355a20",
    padding: 9,
    borderRadius: 2,
  },
});
