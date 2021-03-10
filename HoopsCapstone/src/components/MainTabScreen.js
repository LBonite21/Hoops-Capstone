import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";

import NewsScreen from "./NewsScreen";
import MapScreen from "./MapScreen";
// import DetailsScreen from './DetailsScreen';
// import ExploreScreen from './ExploreScreen';
// import ProfileScreen from './ProfileScreen';

const HomeStack = createStackNavigator();
const MapStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#7f0000",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="NBA News"
      component={NewsScreen}
      options={{
        title: "NBA News",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#7f0000"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const MapStackScreen = ({ navigation }) => (
  <MapStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#7f0000",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <MapStack.Screen
      name="Hoops"
      component={MapScreen}
      options={{
        title: " ",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#7f0000"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </MapStack.Navigator>
);

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Map" activeColor="#fff">
    <Tab.Screen
      name="Map"
      component={MapStackScreen}
      options={{
        tabBarLabel: "Map",
        tabBarColor: "#1f65ff",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-map" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="News"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "NBA News",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <Icon name="newspaper-outline" color={color} size={26} />
        ),
      }}
    />
    {/* <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      /> */}
  </Tab.Navigator>
);

export default MainTabScreen;


