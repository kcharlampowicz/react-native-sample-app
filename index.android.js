import React, { Component } from 'react';
import {
  AppRegistry,
  BackAndroid,
} from 'react-native';

import MainScreen from './components/MainScreen'


var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

class App extends Component {
  render() {
    return (
      <MainScreen attachNavigator={(navigator) => _navigator = navigator}/>
    );
  }
}

AppRegistry.registerComponent('rateItApp', () => App);
