import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

import ImageSlider from 'react-native-image-slider';
export default class Slider extends React.Component {
    render() {
      const images = [
        'https://placeimg.com/640/640/nature',
        'https://placeimg.com/640/640/people',
        'https://placeimg.com/640/640/animals',
        'https://placeimg.com/640/640/beer',
      ];
  
      return (
        <SafeAreaView style={styles.container}>
         
          <ImageSlider
            loopBothSides
            autoPlayWithInterval={3000}
            images={images}
            customSlide={({ index, item, style, width }) => (
              // It's important to put style here because it's got offset inside
              <View key={index} style={[style, styles.customSlide]}>
                <Image source={{ uri: item }} style={styles.customImage} />
              </View>
            )}
          
          />
         
        </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    slider: { backgroundColor: '#000', height: 350 },
    content1: {
      width: '100%',
      height: 50,
      marginBottom: 10,
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content2: {
      width: '100%',
      height: 100,
      marginTop: 10,
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentText: { color: '#fff' },
    buttons: {
      zIndex: 1,
      height: 15,
      marginTop: -25,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    button: {
      margin: 3,
      width: 15,
      height: 15,
      opacity: 0.9,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonSelected: {
      opacity: 1,
      color: 'red',
    },
    customSlide: {
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    customImage: {
      width: '100%',
      height: 300,
    },
  });