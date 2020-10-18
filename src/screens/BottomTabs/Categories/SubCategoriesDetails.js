import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  RefreshControl,
  ImageBackground,
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

export default class SubCategoriesDetails extends Component {
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
    tempdata.append('cat_id', this.props.Categoriesdata.category_id);
    tempdata.append('user_id', Helper.userData.id);

    Helper.makeRequest({
      url: 'getAllPost.php',
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

  gotoPtroductDetails(item) {
    Actions.ProductDetails({productdetails: item});
  }
  _randerPopularNews = ({item, index}) => (
    // <TouchableOpacity style={{ flex: 1, flexDirection: 'row', borderRadius:5,elevation:5, backgroundColor:'white',borderColor: colors.white, marginHorizontal: 16, marginBottom:5,marginTop:5,alignItems: 'center', paddingVertical: 5 }}
    //   onPress={() => this.gotoPtroductDetails(item)}>
    //   <Image
    //     resizeMode={'contain'}
    //     source={item.image ? { uri: item.image } : ""}
    //     style={{ width: 50, height: 50, alignSelf: 'center',marginLeft:10 }} />
    //   <Text numberOfLines={1} style={{ color: colors.black, fontSize: 16, marginLeft: 10 }}>{item.name}</Text>
    // </TouchableOpacity>
    <TouchableOpacity
      // onPress={() => this.gotoSearchDetailsPage(item)}
      style={{
        flexDirection: 'column',
        width: '48%',
        marginTop: 2,
        marginBottom: 10,
        marginRight: 10,
        elevation: 5,
        marginLeft:5
        
      }}
      onPress={() => this.gotoPtroductDetails(item)}>
      <ImageBackground
        imageStyle={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
        style={{borderTopLeftRadius: 10, borderTopRightRadius: 10,height: 140,backgroundColor:colors.white}}
        source={
          item.post_images[0] ? {uri: 'http://2otp.com/api-v1/' + item.post_images[0]}
            : ImagePath.placeholder
        }>
        <TouchableOpacity
          style={{
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            right: 1,
            position: 'absolute',
            padding: 8,
            
          }}
          onPress={() => this.gotoFavourites(item)}>
          <Image
            resizeMode={'contain'}
            source={
              item.wishlist == 1 ? ImagePath.noti_heart : ImagePath.brdr_heart
            }
            style={{width: 20, height: 20}}></Image>
        </TouchableOpacity>
      </ImageBackground>

      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderBottomLeftRadius: 6,
          paddingRight: 10,
          elevation:5,
          borderBottomRightRadius: 6,
        }}>
        <Text numberOfLines={1} style={{color: colors.black, fontSize: 13}}>
          {item.post_title}
        </Text>
        <Text numberOfLines={1} style={{color: colors.black, fontSize: 11}}>
          ₹ {item.price}
        </Text>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <Image
            resizeMode={'contain'}
            source={ImagePath.map}
            style={{width: 20, height: 20}}></Image>
          <Text
            numberOfLines={1}
            style={{color: colors.bluelight, fontSize: 10, marginLeft: 8}}>
            {item.post_address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  gotoFavourites(item) {
    // this.showLoader()
    let tempdata = new FormData();
    tempdata.append('user_id', Helper.userData.id);
    tempdata.append('action', item.wishlist == 0 ? 1 : 0);
    tempdata.append('post_id', item.id);

    // alert(JSON.stringify(tempdata))

    Helper.makeRequest({
      url: 'addToFav.php',
      data: tempdata,
      method: 'POST',
    }).then((responsedata) => {
      if (responsedata.status == true) {
        this.hideLoader();
        Toast.show(responsedata.message, Toast.LONG);
        this.gotoCategoriesData(true);
      } else {
        Toast.show(responsedata.message, Toast.LONG);
        this.hideLoader();
      }
    });
  }
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
              {this.props.Categoriesdata.name}
            </Text>
          </View>
        </View>
        <View style={{flex: 1, paddingTop: 5, marginRight: 15, marginLeft: 15}}>
          <FlatList
            extraData={this.state}
            showsVerticalScrollIndicator={false}
            data={this.state.CategoriesData}
            renderItem={this._randerPopularNews}
            keyExtractor={(item, index) => index}
            numColumns={2}
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
  emptyMessageStyle: {
    fontSize: 18,
    color: '#000000',
  },
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
