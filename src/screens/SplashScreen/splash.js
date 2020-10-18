import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import styles from './splashStyle';
import ImagePath from '../../common/ImagePath';
import { Actions } from 'react-native-router-flux'
import colors from '../../common/colors';
import { StatusBar } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
 <MaterialCommunityIcons name="home" color='#FFFFFF' size={24} />
import Helper from '../../common/Helper'


export default class splash extends Component {
  static navigationOptions = { header: null }
  constructor(props) {
    super(props)
    this.state = {
    }


    setTimeout(async () => {
      Helper.getData('userData').then((userData) => {
        if (userData) {
          Helper.userData = userData;
          Helper.user_id = userData.id
          Actions.Tabbar();
        }
        else {
          Actions.Login();
        }
      })


    }, 1000);




  }

  // gotoContinue() {
  //   Actions.Login();
  // }

  render() {
    return (
     
      <View style={styles.container}>
        
        {/* <Image style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
          source={ImagePath.splash}
        >

        </Image> */}
   
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
       
          <Text style={{
            alignSelf: 'center',
            alignItems: "center", justifyContent: 'center',
            fontSize: 50, color: colors.white,
            textAlign: "center", fontWeight: 'bold'
          }}>2OTP</Text>

        </View>
        {/* 
        <TouchableOpacity style={[styles.login_view, { width: '90%', height: 50, position: 'absolute', zIndex: 1, borderRadius: 30, bottom: 1, marginBottom: 25 }]}
          onPress={() => this.gotoContinue()}>
          <Text style={styles.login_txt}>Continue</Text>
        </TouchableOpacity> */}
      </View>

    );
  }

}


