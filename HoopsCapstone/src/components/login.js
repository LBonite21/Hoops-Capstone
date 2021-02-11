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
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    fetch("http://localhost:3000/", {
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

    fetch("http://localhost:3000/", {
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
      wrong_credentials = <Text className='alert'>Username or Password is incorrect.</Text>;
    }

    let afterLoggedIn;
    let beforeLoggedIn = (
      // <div className="login-form">
      <>
        <Text className="title-before">Hoops</Text>
        {/* <img src="./img/dingo.png" className="login-dingo-before"/> */}
        <Text htmlFor="username">Username </Text>
        
        <TextInput type="text" name="username" placeholder="Username..." className="login-TextInput" onChange={this.updateUsername} />
        
        { wrong_credentials }
        
        <Text htmlFor="password">Password </Text>
        
        <TextInput type="password" name="password" placeholder="Password..." className="login-TextInput" onChange={this.updatePassword} />
        
        
        
        <TouchableOpacity onClick={this.handleSignIn} className="any-btn">
          Log In
        </TouchableOpacity>
        
        
        
        <Text className="signup-Text">Not a member? </Text>
        <TouchableOpacity href="/signUp" className="any-btn">Sign Up!</TouchableOpacity>
        <Text>agustind</Text>
        <Text>UoNt-Kvx2</Text>
        </>
      // </div>
    );

    if (this.state.redirect || AsyncStorage.getItem("user")) {
      beforeLoggedIn = <Text></Text>;
      afterLoggedIn = (
          <>
            <Text className="title-after">WELCOME TO FANDINGO!</Text>

            <TouchableOpacity href="/movies" className="any-btn">Visit Movie Page!</TouchableOpacity>
            
            
            {/* <img src="./img/dingo.png" className="login-dingo-after"/> */}
        </>
      );
    }

    return (
      <>
      {/* <div className="login-container"> */}
          {beforeLoggedIn}
          {afterLoggedIn}
            {/* <div className='personality-container'>
              <h2>
                This website is for all shapes and sizes! Male and females as well as anything 
                in between are welcome to view our website!
              </h2>
              <h2>
                Handmade by the Grunts at Neumont
              </h2>
            </div> */}
          {/* </div> */}


        {/* <Text style={styles.Text_text}>Username</Text>
        <TextTextInput style={styles.placeholder_text} placeholder="Username" />

        <Text style={styles.Text_text}>Password</Text>
        <TextTextInput style={styles.placeholder_text} placeholder="Password" /> */}
      </>
    );
  }
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
