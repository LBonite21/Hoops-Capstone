import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Image
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ScrollView } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

import { AuthContext } from "./context";

const LoginScreen = ({ navigation }) => {
  // const [data, setData] = React.useState({
  //   username,
  //   password,
  // });
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isValidUser, setIsValidUser] = React.useState(true);
  const [isValidPassword, setIsValidPassword] = React.useState(true);

  const { signIn } = React.useContext(AuthContext);

  const handleLogin = async () => {
    let response = await fetch("https://localhost:3002/", data);
    console.log(data.username);

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

  const handleValidUser = (value) => {
    if (value.legnth > 3) {
      setIsValidUser(true);
      console.log(isValidUser)
    } else {
      setIsValidUser(false);
      console.log(isValidUser)
    }
  };

  const handleValidPassword = (value) => {
    if (value.legnth > 4) {
      setIsValidPassword(true);
      console.log(isValidPassword)
    } else {
      setIsValidPassword(false);
      console.log(isValidPassword)
    }
  };

  const loginHandle = (username, password) => {
    signIn(username, password);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={{fontSize: 35, letterSpacing: 3}}>Hoops</Text> */}
      <Image style={styles.title} source={require('../../images/Title.png')}/>
      <Text style={styles.body_text}>Username</Text>
      <TextInput
        style={styles.borderInput_text}
        onChangeText={(text) => setUsername(text)}
        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
      />
      {isValidUser ? null : 
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.error_msg}>Username must be greater than 4</Text>
        </Animatable.View>
      }

      <Text style={styles.body_text}>Password</Text>
      <TextInput
        style={styles.borderInput_text}
        onChangeText={(text) => setPassword(text)}
        onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
      />
      {isValidPassword ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.error_msg}>Password must be greater than 4</Text>
        </Animatable.View>
      )}

      <TouchableOpacity
        onPress={() => {
          loginHandle(username, password);
        }}
        style={styles.home_btn}
      >
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

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  title: {
    resizeMode: "contain",
    width: 290
  },

  body_text: {
    marginRight: 35,
    marginTop: 20,
  },

  home_btn: {
    marginTop: 15,
    backgroundColor: "#355a20",
    width: 100,
    padding: 9,
    borderRadius: 2,
  },

  btn_text: {
    // fontSize: 20,
    textAlign: "center",
    color: "#fff",
  },

  borderInput_text: {
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 3,
    width: 100,
    borderBottomColor: "#000",
    marginBottom: 8,
  },

  error_msg: {
    color: "red",
  },
});
