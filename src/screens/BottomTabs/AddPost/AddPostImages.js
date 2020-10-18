import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  TextInput,
  Keyboard,
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
import ImagePath from '../../../common/ImagePath';
import {Actions} from 'react-native-router-flux';
import colors from '../../../common/colors';
const dimensions = Dimensions.get('screen');
const imageHeight = Math.round((dimensions.width * 9) / 22);
const imageWidth = dimensions.width - 30;

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Constant from '../../../common/Constant';
import CustomLoader from '../../../common/CustomLoader';
import Helper from '../../../common/Helper';
import Config from '../../../common/Config';
import Toast from 'react-native-simple-toast';
import CameraController from '../../../common/CameraController';

export default class AddPost extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  static navigationOptions = {header: null};

  constructor(props) {
    super(props);
    this.state = {
      loaderVisible: false,
      MyBrandData: [{id: '-1', gallery_image: ''}],
      title: '',
      detail: '',
      price: '',
      duration: '',
      address: '',
      lat: '',
      lng: '',
      categryId: '',
      cityId: '',
      post_type: '',
      post_status: '',
      user_id: '',
      checkbox: true,
    };
    this._didFocusSubscription = props.navrigation.addListener(
      'didFocus',
      (payload) =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      (payload) =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        ),
    );
  }

  showLoader() {
    this.setState({loaderVisible: true});
  }
  hideLoader() {
    this.setState({loaderVisible: false});
  }

  handleBackPress = () => {
    Alert.alert(
      '2OTP',
      'Are you sure, you want to exit?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  componentWillUnmount() {
    if (this._didFocusSubscription) {
      this._didFocusSubscription.remove();
    }

    if (this._willBlurSubscription) {
      this._willBlurSubscription.remove();
    }
  }

  MyBrandDataItem = ({index, item}) => (
    <View style={styles.review}>
      <View style={styles.main}>
        <Text style={styles.tire}>Add Gallery Pic {index + 1}</Text>
      </View>

      <View style={styles.upload}>
        <TouchableOpacity
          onPress={() => {
            this.chooseImageoptionalList();
          }}>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            {item.id != '-1' && (
              <TouchableOpacity
                onPress={() => this.deleteImages(item, index)}
                style={{position: 'absolute', zIndex: 10, padding: 10}}>
                <Image
                  source={ImagePath.close}
                  style={{width: 25, height: 25}}></Image>
              </TouchableOpacity>
            )}

            {item.id == '-1' ? (
              <View
                style={{
                  height: 150,
                  width: 310,
                  backgroundColor: colors.darklight,
                  borderRadius: 10,
                  borderWidth: 1,
                  height: 150,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{height: 40, width: 40, alignSelf: 'center'}}
                  resizeMode={'contain'}
                  source={ImagePath.add}
                />
              </View>
            ) : (
              <Image
                source={
                  item.new_image == true
                    ? {uri: item.gallery_image, cache: 'force-cache'}
                    : {
                        uri: Config.imageUrl + item.gallery_image,
                        cache: 'force-cache',
                      }
                }
                resizeMode={'cover'}
                style={styles.uploadbox}></Image>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
  chooseImageoptional = () => {
    CameraController.open((response) => {
      if (response.uri) {
        this.state.isImageOptional = 1;

        this.setState({send_brand_image: true, brand_image: response.uri});
      }
    });
  };

  chooseImageoptionalList = () => {
    CameraController.open((response) => {
      if (response.uri) {
        this.state.MyBrandData.splice(this.state.MyBrandData.length - 1, 1, {
          id: this.state.MyBrandData.length,
          gallery_image: response.uri,
          new_image: true,
        });
        console.log('this.state.MyBrandData', this.state.MyBrandData);
        this.setState({});
      }
    });
  };
  deleteImages(item, index) {
    if (item.id != '-1' && item.new_image != true) {
      this.state.arrdeleteImages.push(item.id);
    }
    this.state.MyBrandData.splice(index, 1);
    if (this.state.MyBrandData.length == 0) {
      this.state.MyBrandData = [{id: '-1', gallery_image: ''}];
    }
    this.setState({});
  }
  addMoreImage = () => {
    if (this.state.MyBrandData[this.state.MyBrandData.length - 1].id == '-1') {
      Toast.show('Please add gallery pic', Toast.LONG);
    } else if (this.state.MyBrandData.length == 5) {
      Toast.show("You can't Upload Image more than 5", Toast.LONG);
    } else {
      this.state.MyBrandData.push({id: '-1', gallery_image: ''});
      this.setState({});
    }
  };

  gotoAddPost() {
    Keyboard.dismiss();
    if (this.CheckVaildation() == false) {
      return;
    } else {
      // this.showLoader();
      let tempdata = new FormData();

      tempdata.append('user_id', Helper.userData.id);
      tempdata.append('title', this.state.title);
      tempdata.append('price', this.state.price);
      tempdata.append('detail', this.state.detail);
      tempdata.append('address', 'jaipur Rajasthan');
      tempdata.append('lat', '1221');
      tempdata.append('lng', '212');
      tempdata.append('categryId', '1');
      tempdata.append('cityId', '1');
      tempdata.append('post_type', '1');
      tempdata.append('duration', '10day');
      tempdata.append('post_status', 'published');

      let galleryImageCount = 0;
      this.state.MyBrandData.map((item) => {
        if (item.new_image && item.new_image == true) {
          galleryImageCount = galleryImageCount + 1;
          tempdata.append('gallery_image_' + galleryImageCount, {
            uri: item.gallery_image,
            name: 'test.jpg',
            type: 'image/jpeg',
          });
        }
      });

      tempdata.append('gallery_image_count', galleryImageCount);

      // alert(JSON.stringify(tempdata))
      // return

      Helper.makeRequest({
        url: 'addPost.php',
        data: tempdata,
        method: 'POSTUPLOAD',
      }).then((responsedata) => {
        // if (responsedata.status == "true") {
        //   // let userData = responsedata.result
        //   // Helper.setData('userData', userData)
        //   // Helper.userData = userData
        //   // Helper.user_id = userData.id
        //   // this.hideLoader();
        //   // Toast.show(responsedata.message, Toast.LONG);
        //   // Actions.pop();
        // }
        // else {
        //   this.hideLoader();
        //   Toast.show(responsedata.message, Toast.LONG);
        // }
      });
    }
  }

  CheckVaildation() {
    if (this.state.title.length == 0) {
      Toast.show('Please enter title', Toast.LONG);
      return false;
    } else if (this.state.title.length < 3) {
      Toast.show('Title should be minimum 3 characters.', Toast.LONG);
      return false;
    } else if (this.state.price.length == 0) {
      Toast.show('Please enter price', Toast.LONG);
      return false;
    } else if (this.state.detail.length == 0) {
      Toast.show('Please enter Description', Toast.LONG);
      return false;
    }

    return true;
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomLoader loaderVisible={this.state.loaderVisible} />
        <SafeAreaView style={[styles.toolbarmain, {elevation: 10}]}>
          <TouchableOpacity
            style={{
              flex: 1,
              marginLeft: 16,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              flexDirection: 'row',
              paddingVertical: 15,
            }}>
            <Text
              style={{
                color: colors.bluelight,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Add Post
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => this.gotoAddPost()}>
            <MaterialCommunityIcons
              name="check"
              color={colors.bluelight}
              size={28}
              style={{marginRight: 16}}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <ScrollView>
          <View>
            <View style={{flex: 1, marginHorizontal: 10, marginTop: 15}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 24,
                      width: 24,
                      borderRadius: 12,
                      borderWidth: 2,
                      borderColor: '#000',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000',
                      }}
                    />
                  </View>
                
                  <View
                    style={{
                      height: 24,
                      width: 24,
                      borderRadius: 12,
                      borderWidth: 2,
                      borderColor: '#000',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: 50,
                    }}></View>
                
              </View>
            </View>

            <View style={{flex: 1, marginHorizontal: 10}}>
              <FlatList
                data={this.state.MyBrandData}
                extraData={this.state}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={this.MyBrandDataItem}
              />
            </View>

            <View style={styles.btnadd}>
              {this.state.MyBrandData.length != 5 && (
                <TouchableOpacity onPress={() => this.addMoreImage()}>
                  <MaterialCommunityIcons
                    name="plus"
                    color={colors.bluelight}
                    size={18}>
                    <Text>Add More</Text>
                  </MaterialCommunityIcons>
                </TouchableOpacity>
              )}
            </View>
            {/* <View style={{ backgroundColor: colors.darklight, borderRadius: 10, borderWidth: 1, height: 150, marginVertical: 15, marginHorizontal: 15, alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ height: 40, width: 40, alignSelf: 'center' }}
                resizeMode={'contain'}
                source={ImagePath.add} />
            </View> */}

            <TextInput
              style={{
                color: colors.black,
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: colors.black,
                paddingVertical: 10,
                marginHorizontal: 20,
              }}
              placeholder={'Enter Title'}
              onChangeText={(title) => this.setState({title: title})}
              placeholderTextColor={colors.gery}
            />

            <TextInput
              style={{
                color: colors.black,
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: colors.black,
                paddingVertical: 10,
                marginHorizontal: 20,
                marginVertical: 10,
              }}
              placeholder={'Enter Price'}
              onChangeText={(price) => this.setState({price: price})}
              placeholderTextColor={colors.gery}
              keyboardType={'number-pad'}
            />

            <View style={{height: 70}}>
              <TextInput
                style={{
                  color: colors.black,
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderColor: colors.black,
                  paddingVertical: 10,
                  marginHorizontal: 20,
                }}
                placeholder={'Enter Description'}
                onChangeText={(detail) => this.setState({detail: detail})}
                placeholderTextColor={colors.gery}
                multiline={true}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function RadioButton(props) {
  return (
    <View
      style={[
        {
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.style,
      ]}>
      {props.selected ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: '#000',
          }}
        />
      ) : null}
    </View>
  );
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
    width: 150,
    backgroundColor: colors.white,
    height: 170,
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
  btnadd: {
    marginHorizontal: 20,
    flexDirection: 'row',
    paddingVertical: 12,
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  textbtnadd: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#6899d4',
    textDecorationLine: 'underline',
  },

  review: {},
  tire: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002b56',
  },
  main: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 5,
    marginTop: 20,
  },

  upload: {
    flex: 1,
    marginTop: 18,
    marginHorizontal: 15,
  },
  uploadtxt: {
    color: '#5E7385',
    fontSize: 16,
  },
  uploadbox: {
    borderRadius: 10,
    resizeMode: 'cover',
    height: 150,
    width: 310,
    borderColor: colors.black,
    borderWidth: 1,
  },

  cloud: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cloudstorage: {
    width: 35,
    height: 25,
    resizeMode: 'cover',
  },
});
