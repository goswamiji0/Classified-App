import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  RefreshControl,
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

import Constant from '../../../common/Constant';
import CustomLoader from '../../../common/CustomLoader';
import Helper from '../../../common/Helper';
import Config from '../../../common/Config';
import Toast from 'react-native-simple-toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
export default class CategoriesDetails extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  static navigationOptions = {header: null};

  constructor(props) {
    super(props);
    this.state = {
      CategoriesData: [],
      modalVisible: false,
      showLoaderRefresh: false,
    };
    this._didFocusSubscription = props.navigation.addListener(
      'didFocus',
      (payload) =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  showLoader() {
    this.setState({loaderVisible: true});
  }
  hideLoader() {
    this.setState({loaderVisible: false});
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

    this.gotoCategoriesData(true);
  }

  _pullToRefresh = () => {
    this.setState({showLoaderRefresh: true});
    this.gotoCategoriesData(false);
  };

  gotoCategoriesData(loader) {
    loader == true ? this.showLoader() : this.hideLoader();
    let tempdata = new FormData();

    tempdata.append('cat_id', this.props.Categories_id.category_id);

    Helper.makeRequest({
      url: 'getSubCategory.php',
      data: tempdata,
      method: 'POST',
    }).then((responsedata) => {
      this.state.showLoaderRefresh = false;

      if (responsedata.status == true) {
        this.hideLoader();
        this.setState({CategoriesData: responsedata.result});
      } else {
        Toast.show(responsedata.message, Toast.LONG);

        this.hideLoader();
      }
    });
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

  gotoSubCategoriesDetails(item) {
    Actions.SubCategoriesDetails({Categoriesdata: item});

    // Actions.ProductDetails({ productdetails: item });
  }
  _randerPopularNews = ({item, index}) => (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 20,
        alignItems: 'center',
        borderRadius: 10,
        elevation: 5,
        marginTop: 10,
        height:80,
        backgroundColor: 'white',
      }}
      onPress={() => this.gotoSubCategoriesDetails(item)}>
      <Image
        resizeMode={'cover'}
        source={item.image ? {uri: item.image} : ''}
        style={{
          width: 50,
          height: 50,
          marginLeft:10,
          alignSelf: 'center',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      />
      <Text
        numberOfLines={1}
        style={{
          color: colors.dark,
          fontSize: 14,
          marginLeft: 10,
          fontWeight: 'bold',
          flex: 1,
        }}>
        {item.name}
      </Text>

      <MaterialCommunityIcons
        name="chevron-right"
        color={colors.bluelight}
        size={20}
        style={{marginRight: 10}}
      />
    </TouchableOpacity>
  );

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
              {this.props.Categories_id.name}
            </Text>
          </View>
          <View style={{width: 60}}></View>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            extraData={this.state}
            showsVerticalScrollIndicator={false}
            data={this.state.CategoriesData}
            renderItem={this._randerPopularNews}
            keyExtractor={(item, index) => index}
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.showLoaderRefresh}
                onRefresh={this._pullToRefresh}
              />
            }
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  resizeMode={'center'}
                  source={ImagePath.noitem}
                  style={{
                    width: 100,
                    height: 100,
                    alignSelf: 'center',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                />
                <Text style={{fontSize: 14, color: '#1273de'}}>
                  {!this.state.loaderVisible &&
                    'No data found! try other categories.'}
                </Text>
              </View>
            )}
          />
        </View>
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
