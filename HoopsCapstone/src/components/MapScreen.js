import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import MapView, { Marker } from "react-native-maps";
// import Geolocation from "react-native-geolocation-service";

const OGMapScreen = () => {
  const [error, setError] = React.useState("");
  const [position, setPosition] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  React.useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setError("");
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (e) => setError(e.message)
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // return [error, position];

  let myLocation = {
    latitude: position.latitude,
    longitude: position.longitude,
  };
  // console.log(myLocation)

  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={MapView.PROVIDER_GOOGLE}>
        <Marker coordinate={myLocation} />
      </MapView>
    </View>
  );
};

class MapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
        latitude: 0,
        longitude: 0,
        coordinates: [],
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          // coordinates: this.state.coordinates.concat({
          //   latitude: position.coords.latitude,
          //   longitude: position.coords.longitude,
          // }),
        });
      },
      (error) => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  }

  render() {
    let myLocation = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };

    // console.log(myLocation)

    return (
      <View style={styles.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={myLocation}></Marker>
        </MapView>
      </View>
    );
  }
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
