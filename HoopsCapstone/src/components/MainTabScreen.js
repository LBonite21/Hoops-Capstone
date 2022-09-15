import React, { useState, useEffect } from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";

import NewsScreen from "./NewsScreen";
import MapScreen from "./MapScreen";
// import DetailsScreen from './DetailsScreen';
// import ExploreScreen from './ExploreScreen';
// import ProfileScreen from './ProfileScreen';

const NewsStack = createStackNavigator();
const MapStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const NewsStackScreen = ({ navigation }) => (
  
  <NewsStack.Navigator
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
    <NewsStack.Screen
      name="NBA News"
      component={NewsScreen}
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
  </NewsStack.Navigator>
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
            color= "#fff"
            size={25}
            backgroundColor="#7f0000"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
        headerRight: () => (
          <Icon.Button 
            name="filter"
            backgroundColor="#7f0000"
          />
        ),
      }}
    />
  </MapStack.Navigator>
);

const MainTabScreen = () => (

  <Tab.Navigator initialRouteName="Map" activeColor="#7f0000" barStyle={{ backgroundColor: "#fff" }}>
    <Tab.Screen
      name="Map"
      component={MapStackScreen}
      options={{
        tabBarLabel: "Map",
        tabBarColor: "#7f0000",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-map" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="News"
      component={NewsStackScreen}
      options={{
        tabBarLabel: "NBA News",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <Icon name="newspaper-outline" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;


