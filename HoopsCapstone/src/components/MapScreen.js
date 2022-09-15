import React, { Component, useState, useEffect } from "react";
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
import MapView, { Marker, Callout } from "react-native-maps";
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

const AddCourt = () => {
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

  return (
    // <View style={styles.addCourt_btn}>
    <TouchableOpacity
      style={styles.map_btn}
      onPress={() => {
        <Marker draggable />;
      }}
    >
      {isFontReady && <Text style={styles.btn_text}>Add Court</Text>}
    </TouchableOpacity>
    // </View>
  );
};

class MapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      latitude: 40.7739326967638,
      longitude: -111.90328146937225,
      coordinates: [],
      courts: [],
    };
  }

  componentDidMount() {
    this.getLocation();
    this.getCourts();
  }

  componentWillUnmount() {
    this.getCourts();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
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

  getCourts() {
    let API_KEY = `AIzaSyCst7jCRy3gYwYbxhoIlxgLT79CwHGpYZA`;
    let FETCH_URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.latitude},${this.state.longitude}&keyword=basketballcourt&radius=50000&rankby=prominence&key=${API_KEY}`;

    fetch(FETCH_URL, { method: "GET" })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ courts: json.results });
        // console.log(json);
      });
  }

  render() {
    let myLocation = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };

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
          <AddCourt />
          <Marker
            coordinate={myLocation}
            image={require("../../images/myPin.png")}
          />
         

          {this.state.courts.map((court, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: court.geometry.location.lat,
                longitude: court.geometry.location.lng,
              }}
              image={require("../../images/pin.png")}
            >
              <Callout>
                <View>
                <Text>{court.name}</Text>
                </View>
              </Callout>
              
            </Marker>
          ))}
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

  map_btn: {
    marginTop: 80,
    marginLeft: 265,
    backgroundColor: "#7f0000",
    width: 130,
    // height: 80,
    padding: 8,
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 2,
  },

  btn_text: {
    // marginTop: 18,
    textAlign: "center",
    color: "#fff",
    fontSize: 12,
    fontFamily: "OctinCollege-Bold",
    letterSpacing: 2,
  },
});
