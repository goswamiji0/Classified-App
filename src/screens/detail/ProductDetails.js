import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  ImageBackground,
  Keyboard,
  Modal,
  ScrollView,
  DeviceEventEmitter,
  BackHandler,
  Alert,
  Dimensions,
  FlatList,
  Text,
  SafeAreaView,
  View,
} from 'react-native';
import ImagePath from '../../common/ImagePath';
import {Actions} from 'react-native-router-flux';
import colors from '../../common/colors';
import Slider from '../../screens/detail/slider';
const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 9) / 22);
const imageWidth = dimensions.width;

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
export default class ProductDetails extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  static navigationOptions = {header: null};

  constructor(props) {
    super(props);
    this.state = {
      productdetalis: this.props.productdetails
        ? this.props.productdetails
        : '',
    };
  }

  render() {
    console.log(
      JSON.stringify(this.state.productdetalis) +
        'productdetalisproductdetalisproductdetalis',
    );
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            elevation: 5,
            flexDirection: 'row',
            alignItems: 'center',
            height: 55,
            backgroundColor: colors.white,
          }}>
          <TouchableOpacity onPress={() => Actions.pop()}>
            <MaterialCommunityIcons
              style={{marginLeft: 16}}
              name="arrow-left"
              color={colors.bluelight}
              size={28}
            />
          </TouchableOpacity>

          <View style={{flex: 1}}>
            <Text
              style={{
                color: colors.bluelight,
                fontSize: 18,
                marginLeft: 10,
                fontWeight: 'bold',
                textAlign: 'left',
              }}>
              Product Details
            </Text>
          </View>
          <View style={{width: 60}}></View>
        </View>
        <ScrollView>
          <View style={{flex: 1}}>
            <Slider />

            {/* <Image resizeMode={'contain'} source={ImagePath.brdr_heart} style={{ width: 20, height: 20, alignItems: 'flex-end', justifyContent: 'flex-end', right: 1, position: 'absolute', margin: 10 }}></Image> */}

            <View
              style={{
                alignItems: 'flex-start',
                flexDirection: 'column',
                marginTop: 5,
                backgroundColor:'white',
                borderRadius:6,
                elevation:4,
                marginLeft:10,
                marginRight:10,
                marginVertical:10,
                marginTop:20,
                marginBottom:10
              }}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 22,
                  fontWeight: 'bold',
                  marginHorizontal: 12,
                  marginTop: 10,
                }}>
                {this.state.productdetalis.post_title}
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 18,
                  marginHorizontal: 12,
                  marginBottom:10,
                  marginTop: 5,
                }}>
                ₹ {this.state.productdetalis.price}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                backgroundColor: colors.white,
                borderRadius: 5,
                padding: 10,
                marginHorizontal: 10,
                marginVertical: 10,
                elevation: 2,
              }}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 14,
                  marginHorizontal: 5,
                  marginTop: 5,
                  fontWeight: 'bold',
                }}>
                Description :
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 14,
                  marginHorizontal: 5,
                  marginTop: 5,
                }}>
                {this.state.productdetalis.post_detail}
              </Text>
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 45,
                flexDirection: 'row',
                borderRadius: 6,
                backgroundColor: colors.green,
                marginHorizontal: 10,
                marginVertical: 10,
              }}>
              <MaterialCommunityIcons
                name="phone"
                color={colors.white}
                size={18}
              />
              <View>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 16,
                    color: colors.white,
                    textAlign: 'center',
                    fontWeight: 'normal',
                  }}>
                  Call
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              backgroundColor: colors.white,
              borderRadius: 5,
              padding: 10,
              marginHorizontal: 10,
              marginVertical: 10,
              elevation: 2,
            }}>
            <Text
              style={{
                marginLeft: 5,
                fontSize: 14,
                color: colors.dark,
                textAlign: 'left',
                fontWeight: 'bold',
              }}>
              Location :
            </Text>
            <View
              style={{
                height: 250,
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 10,
                marginRight: 10,
              }}>
              <MapView
                style={{flex: 1}}
                initialRegion={{
                  latitude: 26.78825,
                  longitude: 76.4324,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: colors.white,
              borderRadius: 5,
              padding: 10,
              marginHorizontal: 10,
              marginVertical: 10,
              elevation: 2,
            }}>
            <Text
              style={{
                marginLeft: 5,
                fontSize: 14,
                color: colors.dark,
                textAlign: 'left',
                fontWeight: 'bold',
              }}>
              Posted by
            </Text>
            <View style={{flexDirection: 'row', alignContent: 'center'}}>
              <Image
                style={{marginTop: 20, height: 40, width: 40}}
                source={
                  this.state.productdetalis.image
                    ? {uri: this.state.productdetalis.image}
                    : ''
                }></Image>

              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'column',
                  alignContent: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: 16,
                    color: colors.dark,
                    textAlign: 'left',
                    fontWeight: 'bold',
                  }}>
                  {this.state.productdetalis.first_name}
                </Text>

                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: 12,
                    color: colors.dark,
                    textAlign: 'left',
                    fontWeight: 'normal',
                  }}>
                  {this.state.productdetalis.last_name}
                </Text>

                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: 8,
                    color: colors.gery,
                    textAlign: 'right',
                    fontWeight: 'normal',
                    marginRight: 50,
                  }}>
                  Created at: {this.state.productdetalis.created_at}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  toolbarmain: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 55,
  },

  lefticon: {
    resizeMode: 'contain',
    height: 25,
    width: 60,
  },
  bell: {
    resizeMode: 'contain',
    height: 25,
    width: 30,
  },
  searchion: {
    height: 30,
    resizeMode: 'contain',
    flex: 1,
  },
  rightiocn: {
    resizeMode: 'contain',
    height: 25,
    width: 30,
    marginRight: 10,
  },
  select: {
    resizeMode: 'contain',
    height: 12,
    marginRight: 10,
    width: 12,
  },
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },

  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  boxView: {
    elevation: 1,
    backgroundColor: colors.bgcolor,
  },
  sliderdotrow: {
    backgroundColor: colors.transparentcolor,
    paddingVertical: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -19,
    justifyContent: 'center',
  },
  bannerImages: {
    height: 200,
    width: '100%',
  },

  forYouView: {
    backgroundColor: colors.white,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobilename: {
    textAlign: 'center',
    color: colors.black,
    marginTop: 1,
    fontSize: 12,
  },
  price: {
    textAlign: 'center',
    color: colors.dark,
    marginRight: 5,
    fontSize: 11,
  },
  price1: {
    textAlign: 'center',
    color: colors.darklight,
    fontSize: 11,
  },

  dicount1: {
    textAlign: 'center',
    color: colors.darklight,
    fontSize: 11,
    textDecorationColor: colors.darklight,
  },
  dicount: {
    textAlign: 'center',
    color: colors.darklight,
    fontSize: 11,
    textDecorationLine: 'line-through',
    textDecorationColor: colors.darklight,
    marginLeft: 5,
  },
  mobilerate: {
    textAlign: 'center',
    color: colors.bluedark,
  },
});
