import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import { Scene } from 'react-native-router-flux';

import reducers from './src/reducers';
import LoginForm from './src/components/LoginForm';

export default class App extends Component {
  componentWillMount() {
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
  }
}

const config = {
    apiKey: 'AIzaSyBZVIr1KzoDaXCmNVIBztEeWdlDqqexKxM',
    authDomain: 'react-native-manager-b1ee5.firebaseapp.com',
    databaseURL: 'https://react-native-manager-b1ee5.firebaseio.com',
    projectId: 'react-native-manager-b1ee5',
    storageBucket: 'react-native-manager-b1ee5.appspot.com',
    messagingSenderId: '655193733206'  
};