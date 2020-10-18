import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  Linking,
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
import Helper from '../../../common/Helper';
const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 9) / 22);
const imageWidth = dimensions.width;
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default class Account extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  static navigationOptions = {header: null};

  constructor(props) {
    super(props);
    this.state = {
      HomeDataDatasub: [1, 2, 3, 4, 5],
      slidertimer: null,
      activepage: 0,
      dotactivecolor: colors.bluelight,
      dotinactivecolor: colors.gery,

      RecentData: [1, 2, 3, 4, 5, 6],
      modalVisible: false,
      page: 1,

      CountryCodeL: [],
      country_id: '101',
      sortimgname: '',
      locationfillform: {
        latitude: '',
        longitude: '',
      },
    };
    this._didFocusSubscription = props.navigation.addListener(
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

  gotoLogOutAl = () => {
    Alert.alert(
      '2OTP',
      'Are you sure, you want to Logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.gotoLogoutCall(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };
  gotoLogoutCall() {
    Helper.logoutData();
  }

  gotoEditProfile() {
    Actions.EditProfile();
  }
  gotoLogOut() {
    this.gotoLogOutAl();
  }
  render() {
    // alert(JSON.stringify(Helper.userData))
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            elevation: 10,
            padding: 10,
            backgroundColor: colors.bluelight,
          }}>
          <View style={{  marginTop:20, alignSelf: 'center',width:110,height:110,backgroundColor:colors.white,elevation:5,borderRadius:10}}>
            <Image
              resizeMode={'contain'}
              source={ImagePath.user}
              style={{
                width: 100,
                height: 110,
                marginLeft:5,
                marginTop:5,
                marginBottom:5,marginRight:5,
                alignSelf: 'center',
              }}></Image>
          </View>
          {Helper.userData.first_name || Helper.userData.last_name ? (
            <Text
              numberOfLines={1}
              style={{
                color: colors.white,
                fontSize: 18,
                fontWeight: 'bold',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              {Helper.userData.first_name} {Helper.userData.last_name}
            </Text>
          ) : null}
          {Helper.userData.mobile ? (
            <Text
              numberOfLines={1}
              style={{
                color: colors.white,
                fontSize: 13,
                fontWeight: 'normal',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                marginTop: 10,
              }}>
              +91-{Helper.userData.mobile}
            </Text>
          ) : null}
          <TouchableOpacity onPress={() => this.gotoEditProfile()}>
            <Text
              style={{
                color: colors.white,
                fontSize: 12,
                fontWeight: 'normal',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 30,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: colors.white,
                paddingHorizontal: 30,
                paddingVertical: 8,
              }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{width: '100%'}}>
          <View width="100%" flexDirection="row">
            <MaterialCommunityIcons
              name="clipboard-check"
              color={colors.dark}
              size={24}
              style={{paddingVertical: 15,
                 paddingHorizontal: 10}}
            />
            <Text
              style={{
                color: colors.dark,
                fontSize: 16,
                fontWeight: 'normal',
                paddingVertical: 15,
              }}>
              My Posts
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{marginLeft:15,marginRight:15,height:1,backgroundColor:colors.dark}}/>
        <TouchableOpacity style={{}}>
        <View width="100%" flexDirection="row">
            <MaterialCommunityIcons
              name="cog"
              color={colors.dark}
              size={24}
              style={{paddingVertical: 15,
                 paddingHorizontal: 10}}
            />
          <Text
            style={{
              color: colors.dark,
              fontSize: 16,
              fontWeight: 'normal',
              paddingVertical: 15,
            }}>
            Settings
          </Text>
          </View>
        </TouchableOpacity>
        <View style={{marginLeft:15,marginRight:15,height:1,backgroundColor:colors.dark}}/>
        <TouchableOpacity style={{}}>
        <View width="100%" flexDirection="row">
            <MaterialCommunityIcons
              name="help-circle"
              color={colors.dark}
              size={24}
              style={{paddingVertical: 15,
                 paddingHorizontal: 10}}
            />
          <Text
            style={{
              color: colors.dark,
              fontSize: 16,
              fontWeight: 'normal',
              paddingVertical: 15,
            }}>
            Help & Services
          </Text>
          </View>
        </TouchableOpacity>

        <View style={{marginLeft:15,marginRight:15,height:1,backgroundColor:colors.dark}}/>
        <TouchableOpacity style={{}}>
        <View width="100%" flexDirection="row">
            <MaterialCommunityIcons
              name="information"
              color={colors.dark}
              size={24}
              style={{paddingVertical: 15,
                 paddingHorizontal: 10}}
            />
          <Text
            style={{
              color: colors.dark,
              fontSize: 16,
              fontWeight: 'normal',
              paddingVertical: 15,
            }}>
            Abous us
          </Text>
          </View>
        </TouchableOpacity>

        <View style={{marginLeft:15,marginRight:15,height:1,backgroundColor:colors.dark}}/>
        <TouchableOpacity style={{}}>
        <View width="100%" flexDirection="row">
            <MaterialCommunityIcons
              name="star"
              color={colors.dark}
              size={24}
              style={{paddingVertical: 15,
                 paddingHorizontal: 10}}
            />
          <Text
            style={{
              color: colors.dark,
              fontSize: 16,
              fontWeight: 'normal',
              paddingVertical: 15,
            }}>
            Rate us
          </Text>
          </View>
        </TouchableOpacity>

        <View style={{marginLeft:15,marginRight:15,height:1,backgroundColor:colors.dark}}/>
        <TouchableOpacity style={{}}>
        <View width="100%" flexDirection="row">
            <MaterialCommunityIcons
              name="share-variant"
              color={colors.dark}
              size={24}
              style={{paddingVertical: 15,
                 paddingHorizontal: 10}}
            />
          <Text
            style={{
              color: colors.dark,
              fontSize: 16,
              fontWeight: 'normal',
              paddingVertical: 15,
            }}>
            Share App
          </Text>
          </View>
        </TouchableOpacity>
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
