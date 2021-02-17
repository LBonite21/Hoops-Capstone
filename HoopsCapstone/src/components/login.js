import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

// const UsernameTextInput = () => {
//   const [value, onChangeText] = React.useState("Useless Placeholder");

//   return (
//     <>
//       <Text>Username</Text>
//       <TextTextInput onChange={(text) => onChangeText(text)} value={value} />;
//     </>
//   );
// };

// export default UsernameTextInput;

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    let data = {
      username,
      password
    };

    console.log(data);
    let response = await fetch('https://localhost:3002/', data);

    if (response){
      //correct cred, log them in
      //store some token in the session
      AsyncStorage.setItem('auth', true);
      //redirect to home page
      console.log(response);
    }
    else{
      //incorrect, refresh
      setPassword('');
    }
  };

  return (
        <>
          <Text>Username</Text>
          <TextInput onChangeText={text => setUsername(text)} />
          <Text>Password</Text>
          <TextInput onChangeText={text => setPassword(text)}/>
          <TouchableOpacity onPress={handleLogin}>
            <Text>Log in</Text>
          </TouchableOpacity>
        </> 
      );
};

const styles = StyleSheet.create({
  Text_text: {
    marginTop: 20,
    marginRight: 180,
    fontSize: 20,
  },

  placeholder_text: {
    fontSize: 15,
    borderColor: "#fff",
    borderWidth: 2,
    padding: 3,
    borderRadius: 3,
    width: 270,
    borderBottomColor: "#000",
  },
});

export default Login;
