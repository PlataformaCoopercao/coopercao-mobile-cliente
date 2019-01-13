import '../Config';
import DebugConfig from '../Config/DebugConfig';
import React, {
  Component
} from 'react';
import {
  Provider
} from 'react-redux';
import RootContainer from './RootContainer';
import createStore from '../Redux';
import * as firebase from 'firebase';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSENGER_SENDER_ID
} from 'react-native-dotenv';

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticationReady: false,
      isAuthenticated: false,
    };

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: FIREBASE_API_KEY,
        authDomain: FIREBASE_AUTH_DOMAIN,
        databaseURL: FIREBASE_DATABASE_URL,
        projectId: FIREBASE_PROJECT_ID,
        storageBucket: FIREBASE_STORAGE_BUCKET,
        messagingSenderId: FIREBASE_MESSENGER_SENDER_ID
      });
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    this.setState({
      isAuthenticationReady: true
    });
    this.setState({
      isAuthenticated: !!user
    });
  }

  render() {
    return ( <
      Provider store = {
        store
      } >
      <
      RootContainer / >
      <
      /Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron ?
  console.tron.overlay(App) :
  App
