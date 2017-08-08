import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC5sys7PIT48r-E4NTDufpDsTiS1TROVLo',
      authDomain: 'react-native-authenticat-92300.firebaseapp.com',
      databaseURL: 'https://react-native-authenticat-92300.firebaseio.com',
      projectId: 'react-native-authenticat-92300',
      storageBucket: 'react-native-authenticat-92300.appspot.com',
      messagingSenderId: '624813396454'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
          this.setState({ loggedIn: true });
      } else {
          this.setState({ loggedIn: false });
      }
    });
  }

  loggingOut() {
    firebase.auth().signOut();
  }

  renderContent() {
    switch(this.state.loggedIn) {
      case true:
        return <View  style={{flex: 2}}><Button onPress={() => this.loggingOut()}>Log Out</Button></View>
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />
    }
  }

  render() {
    return (
      <View  style={{flex: 1}}>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;