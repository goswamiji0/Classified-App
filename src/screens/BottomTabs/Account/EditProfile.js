import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  Linking,
  TextInput,
  StyleSheet,
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
import ImagePath from '../../../common/ImagePath';
import {Actions} from 'react-native-router-flux';
import colors from '../../../common/colors';
const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 9) / 22);
const imageWidth = dimensions.width;

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constant from '../../../common/Constant';
import CustomLoader from '../../../common/CustomLoader';
import Helper from '../../../common/Helper';
import Config from '../../../common/Config';
import Toast from 'react-native-simple-toast';
import CameraController from '../../../common/CameraController';
import RNFetchBlob from 'rn-fetch-blob';

export default class EditProfile extends Component {
  static navigationOptions = {header: null};

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      mobile: '',
      image: '',
      loaderVisible: false,
      editprofileform: {
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        image: '',
      },
    };
  }

  showLoader() {
    this.setState({loaderVisible: true});
  }
  hideLoader() {
    this.setState({loaderVisible: false});
  }

  componentDidMount() {
    this.setDataProfile();
  }
  setDataProfile() {
    let editprofileform = {...this.state.editprofileform};
    editprofileform['first_name'] = Helper.userData.first_name;
    editprofileform['last_name'] = Helper.userData.last_name;
    editprofileform['email'] = Helper.userData.email;
    editprofileform['mobile'] = Helper.userData.mobile;
    editprofileform['image'] = Helper.userData.image;

    // console.log('allValueSet', Helper.userData)
    this.setState({editprofileform});
  }
  setValues(key, value) {
    let editprofileform = {...this.state.editprofileform};
    editprofileform[key] = value;
    this.setState({editprofileform});
  }

  gotoUpdateProfile() {
    Keyboard.dismiss();
    if (this.CheckVaildationEditProfile() == false) {
      return;
    } else {
      // this.showLoader();
      let tempdata = new FormData();

      tempdata.append('user_id', Helper.userData.id);
      tempdata.append('fname', this.state.editprofileform.first_name);
      tempdata.append('lname', this.state.editprofileform.last_name);
      tempdata.append('email', this.state.editprofileform.email);
      tempdata.append('mobile', this.state.editprofileform.mobile);
      // tempdata.append('image', this.state.image);

      // alert(JSON.stringify(tempdata))

      if (this.state.image) {
        tempdata.append('image', {
          uri: this.state.image,
          name: 'image',
          filename: 'image.png',
          type: 'image/png',
        });
      }

      Helper.makeRequestImage({
        url: 'updateProfile.php',
        data: tempdata,
        method: 'POST',
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

  CheckVaildationEditProfile() {
    let Emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      this.state.editprofileform.first_name == null ||
      this.state.editprofileform.first_name == 0
    ) {
      Toast.show(Constant.EnterusernameError, Toast.LONG);
      return false;
    } else if (this.state.editprofileform.first_name.length < 3) {
      Toast.show(Constant.EnterusernamelengthErrorthree, Toast.LONG);
      return false;
    }

    if (
      this.state.editprofileform.last_name == null ||
      this.state.editprofileform.last_name == 0
    ) {
      Toast.show(Constant.EnteruserlastnameError, Toast.LONG);
      return false;
    } else if (this.state.editprofileform.last_name.length < 3) {
      Toast.show(Constant.EnteruserlastnamelengthErrorthree, Toast.LONG);
      return false;
    } else if (
      this.state.editprofileform.email == null ||
      this.state.editprofileform.email == 0
    ) {
      Toast.show(Constant.EnterEmailError, Toast.LONG);
      return false;
    } else if (Emailreg.test(this.state.editprofileform.email) == false) {
      Toast.show(Constant.EnterVaildEmailError, Toast.LONG);
      return false;
    }
    return true;
  }

  chooseImage = (data) => {
    CameraController.open((response) => {
      console.log(
        JSON.stringify(response) + 'responseresponseresponseresponse',
      );
      if (response.uri) {
        this.setState({image: response.uri}, () => {});
      }
    });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomLoader loaderVisible={this.state.loaderVisible} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 55,
            backgroundColor: colors.white,
            elevation: 10,
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
                fontWeight: 'bold',
                textAlign: 'left',
                marginLeft: 10,
              }}>
              Edit Profile
            </Text>
          </View>
        </View>
        <View style={{}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
            }}></View>
          <TouchableOpacity
            style={{
              marginTop: 40,
              marginBottom: 50,
              width: 120,
              height: 120,
              alignSelf: 'center',
            }}
            onPress={() => this.chooseImage()}>
            <View
              style={{
                backgroundColor: 'white',
                width: 120,
                height: 120,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.green,
              }}>
              <Image
                resizeMode={'cover'}
                style={{
                  width: 90,
                  height: 90,
                  alignSelf: 'center',
                  borderRadius: 90 / 2,
                  borderWidth: 1,
                  borderColor: colors.green,
                }}
                source={
                  this.state.image ? {uri: this.state.image} : ImagePath.Asset50
                }></Image>
            </View>

            <Image
              resizeMode={'contain'}
              source={ImagePath.edit}
              style={{
                width: 25,
                height: 25,
                marginBottom:10,
                marginRight:10,
                position: 'absolute',
                right: 1,
                bottom: 1,
              }}></Image>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{marginRight:20,marginLeft:20,marginTop:10,marginBottom:10}}>
            <View >
              <TextInput
                style={{
                  color: colors.dark,
                  fontSize: 14,
                  borderBottomWidth: 1,
                  borderColor: colors.dark,
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                }}
                placeholder={'First Name'}
                onChangeText={(first_name) => {
                  this.setValues('first_name', first_name);
                }}
                value={this.state.editprofileform.first_name}
                placeholderTextColor={colors.gery}></TextInput>
            </View>
            <View style={{}}>
              <TextInput
                style={{
                  color: colors.dark,
                  fontSize: 14,
                  borderBottomWidth: 1,
                  borderColor: colors.dark,
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                }}
                placeholder={'Last Name'}
                onChangeText={(last_name) => {
                  this.setValues('last_name', last_name);
                }}
                value={this.state.editprofileform.last_name}
                placeholderTextColor={colors.gery}></TextInput>
            </View>
            <View style={{}}>
              <TextInput
                style={{
                  color: colors.dark,
                  fontSize: 14,
                  borderBottomWidth: 1,
                  borderColor: colors.dark,
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                }}
                placeholder={'Email'}
                placeholderTextColor={colors.gery}
                onChangeText={(email) => {
                  this.setValues('email', email);
                }}
                value={this.state.editprofileform.email}
                keyboardType={'email-address'}></TextInput>
            </View>
            <View style={{}}>
              <TextInput
                style={{
                  color: colors.dark,
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderColor: colors.dark,
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                }}
                placeholder={'Mobile Number'}
                placeholderTextColor={colors.gery}
                editable={false}
                onChangeText={(mobile) => {
                  this.setValues('mobile', mobile);
                }}
                value={this.state.editprofileform.mobile}
                keyboardType={'number-pad'}></TextInput>
            </View>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                backgroundColor: colors.green,
                borderRadius: 30,
                marginVertical: 50,
              }}
              onPress={() => this.gotoUpdateProfile()}>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.white,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Update
              </Text>
            </TouchableOpacity>
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
});
