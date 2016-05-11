/**
 * Single item view
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Slider,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

class ItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      score: 5
    }
  }

  render() {
    let item = this.props.item;
    return (
      <View style={styles.container}>
        <Image source={{uri: item.thumbnail}}
          style={styles.thumbnail}/>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.info}>Score: {item.score}</Text>
          <Text style={styles.info}>Added by: {item.creator}</Text>
          <Text style={styles.header}>Add your review</Text>
          <TextInput value={this.state.name} style={styles.nameInput}
            placeholder="Type your name"
            onChangeText={(text) => this.setState({name: text})}/>
          <Text>Your score: {this.state.score}</Text>
          <Slider minimumValue={1} maximumValue={10} step={1}
            value={this.state.score} style={styles.slider}
            onValueChange={(value) => this.setState({score: value})}/>
          <TouchableHighlight style={styles.button}
            onPress={() => this.props.rate(item, this.state)}>
              <Text>Rate it!</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  thumbnail: {
    marginBottom: 20,
    width: 200,
    height: 200
  },
  header: {
    fontSize: 28,
    color: '#00a880'
  },
  name: {
    fontSize: 35,
    color: '#f47500',
    textAlign: 'center',
  },
  nameInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
  },
  info: {
    color: 'rgb(161, 161, 161)',
    margin: 5,
    alignSelf: 'flex-end',
    fontSize: 12,
    textAlign: 'right',
  },
  slider: {
    width: 250
  },
  button: {
    width: 150,
    height: 40,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(196, 46, 46)'
  }
});

module.exports = ItemView
