import React, { useEffect } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import * as Font from "expo-font";

import { AuthContext } from "./context";

import RootStackScreen from "./RootStackScreen";
import MapScreen from "./MapScreen";
import HomeScreen from "./HomeScreen";
import { DrawerContent } from "./DrawerContent";
import MainTabScreen from "./MainTabScreen";

const OriginalSignUpScreen = ({ navigation, route }) => {
  return (
    <View>
      <Text>Sign-Up Screen</Text>
    </View>
  );
};

const OgMapScreen = ({ navigation, route }) => {
  return (
    <View>
      <Text>Map Screen</Text>
    </View>
  );
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Hoops = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    username: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          username: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          username: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          username: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (username, password) => {
        // setUserToken("fasdf");
        // setIsLoading(false);
        let userToken;
        userToken = null;
        if (username == "User" && password == "Pass") {
          try {
            userToken = "dadfd";
            await AsyncStorage.setItem("userToken", userToken);
          } catch (e) {
            console.log(e);
          }
        }
        // console.log('user token: ', userToken)
        dispatch({ type: "LOGIN", id: username, token: userToken });
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {
        setUserToken("fasdf");
        setIsLoading(false);
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken)
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const TestScreen = () => {
    const { signOut } = React.useContext(AuthContext);

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
        >
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken != null ? (
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          </Drawer.Navigator>
          // <Stack.Navigator>
          //   <Stack.Screen name="HomeScreen" component={HomeScreen} />
          // </Stack.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

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

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
