import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './src/components/common';
import LoginForm from './src/components/LoginForm';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
    apiKey: 'AIzaSyC5sys7PIT48r-E4NTDufpDsTiS1TROVLo',
    authDomain: 'react-native-authenticat-92300.firebaseapp.com',
    databaseURL: 'https://react-native-authenticat-92300.firebaseio.com',
    projectId: 'react-native-authenticat-92300',
    storageBucket: 'react-native-authenticat-92300.appspot.com',
    messagingSenderId: '624813396454'
  });
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        <LoginForm />
      </View>
    );
  }
}

export default App;