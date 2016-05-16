/**
 * Add item view
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Camera from 'react-native-camera';
class AddItem extends Component {
  props: {
    onSuccess(photo:string, name: string, creator: string): void,
    onFail(): void
  };
  camera: {
    capture():Promise
  };
  state: {
    name: string,
    creator: string
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      name: '',
      creator: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {this.camera = cam}}
          style={styles.preview}
          captureTarget={Camera.constants.CaptureTarget.memory}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
        <TextInput value={this.state.name}
        onChangeText={(text) => this.setState({name: text})}
        placeholder="Item name"/>
        <TextInput value={this.state.creator}
        onChangeText={(text) => this.setState({creator: text})}
        placeholder="Creator name"/>
        <Text style={styles.capture}
          onPress={() => this.takePicture()}>[CAPTURE]</Text>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        this.props.onSuccess(data, this.state.name, this.state.creator);
      })
      .catch(err => {
        this.props.onFail();
      });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      color: '#000',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 10,
      margin: 10
  }
});

module.exports = AddItem
