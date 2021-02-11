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
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

// const UsernameTextInput = () => {
//   const [value, onChangeText] = React.useState("Useless Placeholder");

//   return (
//     <>
//       <Text>Username</Text>
//       <TextTextInput onChange={(text) => onChangeText(text)} value={value} />;
//     </>
//   );
// };

// export default UsernameTextInput;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      username: "",
      password: "",
      redirect: false,
      wrong_credentials: false,
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount = () => {
    fetch("http://localhost:3002/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) =>
        this.setState({ accounts: result }, () => {
          // Adds all the reviews to a session variable
          let list = [];
          this.state.accounts.forEach((account) => {
            if (account.reviews.length > 0) {
              account.reviews.forEach((review) => {
                review.username = account.username;
                list.push(review);
              });
            }
          });
          AsyncStorage.setItem("reviews", JSON.stringify(list));
        })
      )
      .catch((e) => console.log(e));
  };

  updateUsername = (evt) => {
    this.setState({ username: evt.target.value });
  };
  updatePassword = (evt) => {
    this.setState({ password: evt.target.value });
  };

  handleSignIn = () => {
    let data = {
      username: `${this.state.username}`,
      password: `${this.state.password}`,
    };

    fetch("http://localhost:3002/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          this.setState({ redirect: true }, () => {
            AsyncStorage.setItem("user", JSON.stringify(result.account));
            this.setState({ redirect: true });
          });
        } else {
          this.setState({ wrong_credentials: true });
        }
      });
  };

  render() {
    let wrong_credentials = <Text></Text>;
    if (this.state.wrong_credentials) {
      wrong_credentials = <Text>Username or Password is incorrect.</Text>;
    }

    let afterLoggedIn;
    let beforeLoggedIn = (
      <>
        <Text>Hoops</Text>
        <Text>Username </Text>

        <TextInput placeholder="Username..." onChange={this.updateUsername} />

        {wrong_credentials}

        <Text>Password </Text>

        <TextInput placeholder="Password..." onChange={this.updatePassword} />

        <TouchableOpacity onClick={this.handleSignIn}>
          <Text>Log in</Text>
        </TouchableOpacity>

        <Text>Not a member? </Text>
        <TouchableOpacity>
          <Text>Sign Up!</Text>
        </TouchableOpacity>
        <Text>agustind</Text>
        <Text>UoNt-Kvx2</Text>
      </>
    );

    // if (this.state.redirect || AsyncStorage.getItem("user")) {
    //   beforeLoggedIn = <Text>heelo</Text>;
    //   afterLoggedIn = (
    //     <>
    //       <Text>WELCOME TO FANDINGO!</Text>

    //       <TouchableOpacity>
    //         <Text>Vist Page</Text>
    //       </TouchableOpacity>
    //     </>
    //   );
    // }

    return (
      <>
        {beforeLoggedIn}
        {/* {afterLoggedIn} */}
      </>
    );
  }
}

{
  /* <Text style={styles.Text_text}>Username</Text>
<TextTextInput style={styles.placeholder_text} placeholder="Username" />

<Text style={styles.Text_text}>Password</Text>
<TextTextInput style={styles.placeholder_text} placeholder="Password" /> */
}

const styles = StyleSheet.create({
  Text_text: {
    marginTop: 20,
    marginRight: 180,
    fontSize: 20,
  },

  placeholder_text: {
    fontSize: 15,
    borderColor: "#fff",
    borderWidth: 2,
    padding: 3,
    borderRadius: 3,
    width: 270,
    borderBottomColor: "#000",
  },
});

export default Login;
