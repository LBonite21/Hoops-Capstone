import React, { Component, useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";

// czEHeYw

const Headlines = ({ title, source, desc, image, news_url }) => {
  let dimensions = Dimensions.get("window");
  let imageHeight = Math.round((dimensions.width * 9.25) / 16);
  let imageWidth = dimensions.width;

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.headline_title}>{title}</Text>
      <Text style={styles.headline_auth}>By {source}</Text>
      <Text style={styles.headline_desc}>{desc}</Text>
      <Image
        source={{ uri: image }}
        style={{ width: imageWidth, height: imageHeight, marginTop: 30 }}
      />

      <TouchableOpacity
        style={styles.home_btn}
        onPress={() => {
          Linking.openURL(news_url);
        }}
      >
        <Text style={styles.btn_text}>View More</Text>
      </TouchableOpacity>
    </View>
  );
};

export default class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "OctinCollege-Bold": require("../../fonts/OctinCollege-Bold.ttf"),
      "OctinCollege-Reg": require("../../fonts/OctinCollege-Regular.otf"),
    }).then(() => {
      this.setState({ fontLoaded: true });
    });
    this.grabNews();
  }

  grabNews() {
    let FETCH_URL =
      "https://real-time-basketball-content.p.rapidapi.com/basketball?limit=15&langs=en%2Ces%2Cfr%2Cde%2Cit%2Cru%2Chi%2Cpl%2Cuk%2Cpa&skip=1";

    fetch(FETCH_URL, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "19a4d7c4d6mshc7ae17544d9a8cfp1e2744jsn9a071e1abb28",
        "x-rapidapi-host": "real-time-basketball-content.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        this.setState({ totalResults: json.length });
        for (let i = 0; i < 10; i++) {
          this.setState({ [`title_${i}`]: json[i].title });
          this.setState({ [`author_${i}`]: json[i].source });
          this.setState({ [`desc_${i}`]: json[i].description });
          this.setState({ [`image_${i}`]: json[i].image });
          this.setState({ [`news_url_${i}`]: json[i].url });
        }
      });
  }

  render() {
    let headlines = [];
    for (let i = 0; i < 10; i++) {
      headlines.push(
        <Headlines
          key={i}
          title={this.state[`title_${i}`]}
          source={this.state[`author_${i}`]}
          desc={this.state[`desc_${i}`]}
          image={this.state[`image_${i}`]}
          news_url={this.state[`news_url_${i}`]}
        />
      );
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title_screen}>Basketball News</Text>
          {headlines}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    fontFamily: "OctinCollege-Bold",
  },

  title_screen: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "800",
    fontFamily: "OctinCollege-Bold",
    letterSpacing: 1.2,
  },

  headline_title: {
    fontSize: 18,
    fontWeight: "800",
    padding: 10,
    marginTop: 20,
    marginBottom: 5,
    textAlign: "left",
    width: 390,
    fontFamily: "OctinCollege-Bold",
  },

  headline_auth: {
    width: 367,
    fontFamily: "OctinCollege-Bold",
  },

  headline_desc: {
    width: 370,
    marginTop: 5,
    textAlign: "left",
  },

  home_btn: {
    marginTop: 15,
    backgroundColor: "#7f0000",
    width: 100,
    padding: 9,
    borderRadius:2,
  },

  btn_text: {
    textAlign: "center",
    color: "#fff",
    fontSize: 12,
    fontFamily: "OctinCollege-Bold",
    letterSpacing: 2,
  },
});
