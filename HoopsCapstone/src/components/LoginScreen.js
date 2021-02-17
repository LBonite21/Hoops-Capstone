import React, { Component } from "react";
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


const Login = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    let data = {
      username,
      password,
    };

    console.log(data);
    let response = await fetch("https://localhost:3002/", data);

    if (response) {
      //correct cred, log them in
      //store some token in the session
      AsyncStorage.setItem("auth", true);
      //redirect to home page
      console.log(response);
    } else {
      //incorrect, refresh
      setPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.body_text}>Username</Text>
      <TextInput style={styles.borderInput_text} onChangeText={(text) => setUsername(text)} />
      <Text style={styles.body_text}>Password</Text>
      <TextInput style={styles.borderInput_text} onChangeText={(text) => setPassword(text)} />
      <TouchableOpacity onPress={handleLogin} style={styles.home_btn}>
        <Text style={styles.btn_text}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.home_btn}
        onPress={() => {
          navigation.navigate("Sign Up Screen", {
            name: "Sign-Up",
          });
        }}
      >
        <Text style={styles.btn_text}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  body_text: {
    marginRight: 35
  },

  home_btn: {
    marginTop: 35,
    backgroundColor: "#355a20",
    padding: 9,
    borderRadius: 2,
  },

  btn_text: {
    // fontSize: 20,
    color: "#fff"
  },

  borderInput_text: {
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 3,
    width: 100,
    borderBottomColor: "#000",
    marginBottom: 20
  },
});

export default Login;
