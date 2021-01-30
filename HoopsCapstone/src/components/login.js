import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import * as Font from "expo-font";

// const UsernameInput = () => {
//   const [value, onChangeText] = React.useState("Useless Placeholder");

//   return (
//     <>
//       <Text>Username</Text>
//       <TextInput onChange={(text) => onChangeText(text)} value={value} />;
//     </>
//   );
// };

// export default UsernameInput;

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Text style={styles.label_text}>Username</Text>
        <TextInput style={styles.placeholder_text} placeholder="Username" />

        <Text style={styles.label_text}>Password</Text>
        <TextInput style={styles.placeholder_text} placeholder="Password" />
      </>
    );
  }
}

const styles = StyleSheet.create({

  label_text: {
    marginTop: 20,
    marginRight: 180,
    fontSize: 20
  },

  placeholder_text: {
    fontSize: 15,
    borderColor: "#fff",
    borderWidth: 2,
    padding: 3,
    borderRadius: 3,
    width: 270,
    borderBottomColor: "#000"
  },
});
