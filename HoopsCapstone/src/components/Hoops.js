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

const MainPage = ({ navigation, route }) => {
    return(
        <View>
            <Text>Login Page</Text>
        </View>
    );
};

const SignUpPage = ({ navigation, route }) => {
    return(
        <View>
            <Text>Sign-Up Page</Text>
        </View>
    );
};

const Stack = createStackNavigator();

export default class Hoops extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="LoginPage" component={MainPage} />
                    <Stack.Screen name="SignUpPage" component={SignUpPage} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    };
};