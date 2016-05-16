/**
 * Main view
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  CameraRoll,
  Navigator,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import List from './List'
import AddItem from './AddItem'
import ItemView from './ItemView'
import ItemStore from '../stores/ItemStore'

class MainScreen extends Component {
  state: {
    items: Array<{}>
  };
  props: {

  };
  itemStore: ItemStore;
  _navigator: Navigator;

  constructor(props: Object) {
    super(props);
     this.itemStore = new ItemStore();
     this.state = {
       items: []
     }
     this._loadItems();
  }

  render() {
    return (
      <Navigator initialRoute={{name: 'List'}}
        renderScene={(route, navigator) => this.renderScene(route, navigator)}/>
    );
  }

  renderScene(route: string, navigator: Navigator) {
    this._navigator = navigator;
    this.props.attachNavigator(navigator);
    if (route.name == 'List') {
      return <List onSelect={(item) => this.onItemSelect(item)}
        items={this.state.items} style={styles.listView}
        addItem={() => this.addItem()}/>;
    }
    if (route.name == 'Item') {
      return <ItemView {...route.passProps}
        rate={(item, score) => this.rateItem(item, score)}/>
    }
    if (route.name == 'Add') {
      return <AddItem style={styles.container}
        onSuccess={(photo, name, creator) => this.onSuccess(photo, name, creator)}
        onFail={this.onFail}/>
    }
    return <View/>;
  }

  onSuccess(photo: {data: string}, name: string, creator: string) {
    this._navigator.pop();
    this.itemStore.addItem(name, photo.data, creator, () => {
      this._loadItems();
    });
  }

  onFail() {
    this._navigator.pop();
  }

  addItem() {
    this._navigator.push({name: 'Add'})
  }

  rateItem(item, rate: {name: string, score: number}) {
    this._navigator.pop();
    this.itemStore.rateItem(item, rate, () => {
      this._loadItems();
    });
  }

  onItemSelect(item) {
    this._navigator.push({name: 'Item', passProps: {item: item}})
  }

  _loadItems() {
    this.itemStore.getItems((items) => this.setState({items: items}));
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

module.exports = MainScreen
