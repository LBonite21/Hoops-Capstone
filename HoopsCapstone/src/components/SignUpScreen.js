import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isValidUser, setIsValidUser] = React.useState(true);
  const [isValidPassword, setIsValidPassword] = React.useState(true);

  const [isFontReady, setFontReady] = useState(false);

  useEffect(() => {
    async function loadFont() {
      return await Font.loadAsync({
        "OctinCollege-Reg": require("../../fonts/OctinCollege-Regular.otf"),
        "OctinCollege-Bold": require("../../fonts/OctinCollege-Bold.ttf"),
      });
    }
    // after the loading set the font status to true
    loadFont().then(() => {
      setFontReady(true);
    });
  }, []);

  const handleValidUser = (value) => {
    if (value.legnth > 3) {
      setIsValidUser(true);
      console.log(isValidUser);
    } else {
      setIsValidUser(false);
      console.log(isValidUser);
    }
  };

  const handleValidPassword = (value) => {
    if (value.legnth > 4) {
      setIsValidPassword(true);
      console.log(isValidPassword);
    } else {
      setIsValidPassword(false);
      console.log(isValidPassword);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback>
        <View>
          <Image
            style={styles.logo}
            source={require("../../images/logo.png")}
          />
          <Image
            style={styles.title}
            source={require("../../images/signup.png")}
          />

          {isFontReady && <Text style={styles.body_text}>Email</Text>}

          <TextInput
            style={styles.borderInput_text}
            onChangeText={(text) => setUsername(text)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.error_msg}>Email must be greater than 4</Text>
            </Animatable.View>
          )}

          {isFontReady && <Text style={styles.body_text}>Username</Text>}

          <TextInput
            style={styles.borderInput_text}
            onChangeText={(text) => setUsername(text)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.error_msg}>
                Username must be greater than 4
              </Text>
            </Animatable.View>
          )}

          {isFontReady && <Text style={styles.body_text}>Password</Text>}
          <TextInput
            style={styles.borderInput_text}
            onChangeText={(text) => setPassword(text)}
            onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
          />
          {isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.error_msg}>
                Password must be greater than 4
              </Text>
            </Animatable.View>
          )}

          <View style={styles.signUp_btn}>
            <TouchableOpacity
              style={styles.home_btn}
              onPress={() => {
                navigation.navigate("Sign Up Screen", {
                  name: "Sign-Up",
                });
              }}
            >
              {isFontReady && <Text style={styles.btn_text}>Sign Up</Text>}
            </TouchableOpacity>
            <Image
              style={styles.shadow_signUp}
              source={require("../../images/shadow.png")}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  logo: {
    resizeMode: "contain",
    width: 100,
    marginBottom: -160,
    marginTop: -150,
    alignSelf: "center",
    // marginLeft: 70,
  },

  title: {
    resizeMode: "contain",
    width: 290,
    marginBottom: 10,
    marginTop: -20,
    alignSelf: "center",
  },

  body_text: {
    marginRight: 170,
    marginTop: 20,
    marginBottom: 20,
    textTransform: "uppercase",
    fontFamily: "OctinCollege-Bold",
    fontSize: 19,
    letterSpacing: 2,
  },

  borderInput_text: {
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 3,
    width: 280,
    borderBottomColor: "#000",
    marginBottom: 15,
  },

  home_btn: {
    marginTop: 15,
    backgroundColor: "#7f0000",
    width: 100,
    height: 100,
    padding: 9,
    borderRadius: 100 / 2,
  },

  signUp_btn: {
    alignSelf: "center",
    marginTop: 15
  },

  shadow_signUp: {
    position: "absolute",
    right: 5,
    top: 120,
    resizeMode: "contain",
    width: 85,
  },

  btn_text: {
    marginTop: 32,
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontFamily: "OctinCollege-Bold",
    letterSpacing: 2,
  },

  error_msg: {
    color: "red",
    position: "absolute",
    marginTop: -5,
  },
});
