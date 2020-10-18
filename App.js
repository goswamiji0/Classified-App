/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import AppNavigator from './src/config/AppNavigator'
import { Platform, StatusBar, View, DeviceEventEmitter, SafeAreaView } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }

  }

  render() {
    return (
      <View style={{ flex: 2 }}>
       
        <AppNavigator />
      </View>
    );
  }

}