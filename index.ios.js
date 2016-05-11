import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import MainScreen from './components/MainScreen'

class App extends Component {
  render() {
    return (
      <MainScreen attachNavigator={(navigator) => {}}/>
    );
  }
}

AppRegistry.registerComponent('rateItApp', () => App);
