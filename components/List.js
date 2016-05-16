/**
 * List view
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ListView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import DataSource from 'ListViewDataSource';

class List extends Component {
  ds: DataSource;

  constructor(props: Object) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  render() {
    var dataSource = this.ds.cloneWithRows(this.props.items);
    return (
      <View>
        <ListView style={this.props.listView} enableEmptySections={true}
        dataSource={dataSource}
        renderRow={this.renderItem.bind(this)}/>
        <TouchableHighlight onPress={() => this.props.addItem()} style={styles.button}>
          <Text style={styles.buttonLabel}>Add product to review</Text>
        </TouchableHighlight>
      </View>
    )
  }

  renderItem(item: {id: number, name: string, thumbnail: string, score: number}) {
    return (
      <View>
        <TouchableHighlight onPress={() => this.props.onSelect(item)}>
          <View style={styles.itemContainer} key={item.id}>
            <Image style={styles.thumbnail} source={{uri: item.thumbnail}}/>
            <View style={styles.rightContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.score}>Score: {item.score}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  itemContainer: {
    paddingTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
  },
  thumbnail: {
    width: 50,
    height: 50,
  },
  name: {
    fontSize: 20,
    color: '#f47500',
    textAlign: 'center',
  },
  score: {
    marginRight: 5,
    fontSize: 10,
    textAlign: 'right'
  },
  buttonLabel: {
    fontSize: 18,
    color: '#ffffff',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    marginTop: 10,
    borderColor: '#000000',
    borderWidth: 1,
    backgroundColor: 'rgb(0, 129, 223)',
    alignItems: 'center',
  }
});

module.exports = List
