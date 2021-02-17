import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

const SignUpScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Sign-Up Screen</Text>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  body_text: {
    marginRight: 35,
  },

  home_btn: {
    marginTop: 35,
    backgroundColor: "#355a20",
    padding: 9,
    borderRadius: 2,
  },

  btn_text: {
    // fontSize: 20,
    color: "#fff",
  },

  borderInput_text: {
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 3,
    width: 100,
    borderBottomColor: "#000",
    marginBottom: 20,
  },
});

