import React, { Component } from 'react';
import {
  AppRegistry,
  BackAndroid,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';

import List from './components/List'
import AddItem from './components/AddItem'
import ItemView from './components/ItemView'
import ItemStore from './stores/ItemStore'

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

class rateItApp extends Component {
  constructor(props) {
    super(props);
     this.itemStore = new ItemStore();
     this.state = {
       items: this.itemStore.getItems()
     }
  }

  render() {
    return (
      <Navigator initialRoute={{name: 'List'}}
        renderScene={(route, navigator) => this.renderScene(route, navigator)}/>
    );
  }

  renderScene(route, navigator) {
    _navigator = navigator;
    if (route.name == 'List') {
      return <List onSelect={(item) => this.onItemSelect(item)}
        items={this.state.items} style={styles.listView}
        addItem={this.addItem}/>;
    }
    if (route.name == 'Item') {
      return <ItemView {...route.passProps} rate={this.rateItem}/>
    }
    if (route.name == 'Add') {
      return <AddItem style={styles.container}
        onSuccess={(photo, name, creator) => this.onSuccess(photo, name, creator)}
        onFail={this.onFail}/>
    }
    return <View/>;
  }

  onSuccess(photo, name, creator) {
    _navigator.pop();
    this.itemStore.addItem(name, photo, creator);
    this.setState({items: this.itemStore.getItems()});
  }

  onFail() {
    _navigator.pop();
  }

  addItem() {
    _navigator.push({name: 'Add'})
  }

  rateItem(item, score) {
    _navigator.pop();
  }

  onItemSelect(item) {
    _navigator.push({name: 'Item', passProps: {item: item}})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  listView: {
    paddingTop: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('rateItApp', () => rateItApp);
