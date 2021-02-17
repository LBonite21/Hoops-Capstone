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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import * as Font from "expo-font";
import Login from "./Login";

const MainPage = ({ navigation, route }) => {
  return AsyncStorage.getItem('auth') === true ? (
    <>
      <SignUpPage />
    </>
  ) : (
    <View style={styles.container}>
      <Login />
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
};

const SignUpPage = ({ navigation, route }) => {
  return (
    <View>
      <Text>Sign-Up Page</Text>
    </View>
  );
};

const Stack = createStackNavigator();

class Hoops extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login Page" component={MainPage} />
          <Stack.Screen
            name="SignUpPage"
            component={SignUpPage}
            options={({ route }) => ({ title: route.params.name })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

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
