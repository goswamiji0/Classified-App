import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  RefreshControl,
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
import { color } from 'react-native-reanimated';
export default class Home extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  static navigationOptions = {header: null};

  constructor(props) {
    super(props);
    this.state = {
      GetFeaturePost: [],
      slidertimer: null,
      activepage: 0,
      dotactivecolor: colors.bluelight,
      dotinactivecolor: colors.gery,
      GetCategory: [],
      modalVisible: false,
      page: 1,
      CountryCodeL: [],
      country_id: '101',
      sortimgname: '',
      loaderVisible: false,
      showLoaderRefresh: false,
      action: 0,
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
    if (this.state.slidertimer) {
      clearInterval(this.state.slidertimer);
    }
    let interval = setInterval(this.scrollToIndexMethods, 4000);
    this.state.slidertimer = interval;
    this.gotoCategory();
    this.gotoGetFeatureProduct(true);
  }

  gotoCategory() {
    this.showLoader();
    Helper.makeRequest({url: 'getCategory.php', method: 'POST'}).then(
      (responsedata) => {
        if (responsedata.status == true) {
          this.hideLoader();
          this.setState({GetCategory: responsedata.result});
        } else {
          Toast.show(responsedata.message, Toast.LONG);

          this.hideLoader();
        }
      },
    );
  }

  _pullToRefresh = () => {
    this.setState({showLoaderRefresh: true});
    this.gotoGetFeatureProduct(false);
  };

  gotoGetFeatureProduct(loader) {
    loader == true ? this.showLoader() : this.hideLoader();
    let tempdata = new FormData();
    tempdata.append('user_id', Helper.userData.id);

    Helper.makeRequest({
      url: 'getRecentProducts.php',
      data: tempdata,
      method: 'POST',
    }).then((responsedata) => {
      this.state.showLoaderRefresh = false;
      if (responsedata.status == true) {
        this.hideLoader();
        this.setState({GetFeaturePost: responsedata.result});
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
    if (this.state.slidertimer) {
      clearInterval(this.state.slidertimer);
    }
    if (this._didFocusSubscription) {
      this._didFocusSubscription.remove();
    }

    if (this._willBlurSubscription) {
      this._willBlurSubscription.remove();
    }
  }

  handlePageChange = (e) => {
    let offset = e.nativeEvent.contentOffset;
    if (offset) {
      if (this.state.slidertimer) {
        clearInterval(this.state.slidertimer);
      }
      let page = Math.round(offset.x / Dimensions.get('window').width);
      this.state.activepage = page;
      this.state.lastindex = page;
      this.setState({});

      let interval = setInterval(this.scrollToIndexMethods, 4000);
      this.setState({slidertimer: interval});
    }
  };
  scrollToIndexMethods = () => {
    if (this.flatListRef) {
      if (this.state.GetFeaturePost && this.state.GetFeaturePost.length > 0) {
        if (this.state.lastindex < this.state.GetFeaturePost.length) {
          this.flatListRef.scrollToIndex({
            animated: true,
            index: this.state.lastindex,
          });
        } else {
          this.flatListRef.scrollToIndex({animated: true, index: 0});
          this.setState({lastindex: 0});
        }
        this.setState({activepage: this.state.lastindex});
        this.state.lastindex = this.state.lastindex + 1;
      }
    }
  };

  renderBanners = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          style={{
            height: 200,
            width: imageWidth,
          }}>
          <Image
            resizeMode={'stretch'}
            source={ImagePath.pros}
            style={styles.bannerImages}
          />
        </TouchableOpacity>
      </View>
    );
  };

  gotoCategoriesDetails(item) {
    console.log(JSON.stringify(item) + 'caterory listtttttttttttttttt');
    {
      !item.category_id == '' &&
        Actions.CategoriesDetails({Categories_id: item});
    }
  }
  gotoPtroductDetails(item) {
    Actions.ProductDetails({productdetails: item});
  }
  FeaturesItem = ({item, index}) => (
    <View>
      <TouchableOpacity
        style={[styles.forYouView, {borderRadius: 6, elevation: 5, margin: 10}]}
        onPress={() => this.gotoCategoriesDetails(item)}>
        <Image
          resizeMode={'contain'}
          source={item.image ? {uri: item.image} : ''}
          style={{
            width: 60,
            height: 60,
            alignSelf: 'center',
            backgroundColor: 'white',
          }}
        />
        <Text numberOfLines={1} style={styles.mobilename}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );

  _randerPopularNews = ({item, index}) => (
    <TouchableOpacity
      // onPress={() => this.gotoSearchDetailsPage(item)}
      style={{
        flexDirection: 'column',
        width: '50%',
        marginTop: 2,
        padding: 5,
      }}
      onPress={() => this.gotoPtroductDetails(item)}>
      <ImageBackground
        imageStyle={{
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
          elevation: 10,
          backgroundColor:'white'
        }}
        style={{height: 140, elevation: 10}}
        source={
          item.post_images[0]
            ? {uri: 'http://2otp.com/api-v1/' + item.post_images[0]}
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
          elevation: 5,
          borderBottomRightRadius: 6,
        }}>
        <Text
          numberOfLines={1}
          style={{color: colors.black, fontSize: 13, fontWeight: 'bold'}}>
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
          <MaterialCommunityIcons
            name="map-marker"
            color={colors.dark}
            size={14}
          />
          <Text
            numberOfLines={1}
            style={{color: colors.bluelight, fontSize: 10, marginLeft: 2}}>
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
        this.gotoGetFeatureProduct(true);
      } else {
        Toast.show(responsedata.message, Toast.LONG);
        this.hideLoader();
      }
    });
  }
  gotoProfile() {
    Actions.Account();
  }

  render() {
    console.log(JSON.stringify(this.state.GetCategory + '11111111111111111'));
    return (
      <SafeAreaView style={styles.container}>
        <CustomLoader loaderVisible={this.state.loaderVisible} />

        <View style={[styles.searchStyle]}>

      
          <TextInput
            style={{
              color: colors.gery,
              backgroundColor: colors.light,
              fontSize: 14,
              borderWidth: 1,
              borderColor: colors.green,
              paddingVertical: 6,
              paddingHorizontal: 10,
              marginHorizontal: 15,
              marginTop: 10,
              marginBottom: 5,
              borderRadius: 5,
            }}
            placeholder={'What you want to search...'}
            placeholderTextColor={colors.gre}>
    
            </TextInput>
          <SafeAreaView style={[styles.toolbarmain]}>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                paddingVertical: 15,
                marginLeft: 15,
              }}>
              <MaterialCommunityIcons
                name="map-marker"
                color={colors.bluelight}
                size={15}
              />
              <Text
                style={{fontWeight:'bold',color: colors.bluelight, fontSize: 12, marginLeft: 5}}>
                Jaipur, Rajasthan
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginRight: 10}}>
              <MaterialCommunityIcons
                name="bell"
                color={colors.bluelight}
                size={20}
              />
            </TouchableOpacity>
          </SafeAreaView>
        </View>
        {Helper.userData.first_name ||
        Helper.userData.last_name ||
        Helper.userData.email ? null : (
          <TouchableOpacity
            onPress={() => this.gotoProfile()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              flexDirection:'row',
              backgroundColor: colors.gery,
            }}>
               <MaterialCommunityIcons
                name="help-circle"
                color={colors.white}
                size={15}
              />
            <Text style={{color: colors.white, fontSize:12,paddingHorizontal:10}}>
           
                Please complete your profile
            </Text>
          </TouchableOpacity>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.showLoaderRefresh}
              onRefresh={this._pullToRefresh}
            />
          }>
          <View>
            {/* <View style={styles.boxView}>
              <FlatList
                ref={(ref) => { this.flatListRef = ref; }}
                data={this.state.GetFeaturePost}
                pagingEnabled={true}
                onMomentumScrollEnd={this.handlePageChange}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                extraData={this.state}
                renderItem={this.renderBanners}
              />
              <View style={styles.sliderdotrow}>
                {this.state.GetFeaturePost.map((_, i) => {
                  // console.log(i,"1111111111111111111111111111111111111111");
                  return (

                    <View
                      // key={i}
                      style={{ height: 8, width: 8, backgroundColor: this.state.activepage == i ? this.state.dotactivecolor : this.state.dotinactivecolor, margin: 4, borderRadius: 5 }}
                    />
                  );
                })}
              </View>
            </View> */}

            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: 60,
                marginRight:16,
                marginLeft:16,
                marginTop:20,
                borderRadius:4,
                backgroundColor: colors.green,
              }}
              onPress={() => this.gotosignup()}>
              <Text style={{fontSize:15,color:'white' ,fontWeight:'bold'}}>Add Post</Text>
            </View>

            {this.state.GetCategory.length > 0 ? (
              <View style={{marginTop: 12, paddingTop: 5, paddingBottom: 14}}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontWeight: 'bold',
                    marginLeft: 16,
                    color: colors.dark,
                    fontSize: 14,
                  }}>
                  Explore Categories
                </Text>
                <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: 4,
                width:150,
                marginRight:16,
                marginLeft:16,
                marginTop:10,
                borderRadius:4,
                backgroundColor: colors.green,
              }}/>
              </View>
            ) : null}
            {this.state.GetCategory.length > 0 ? (
              <View style={{paddingLeft: 10, paddingRight: 10}}>
                <FlatList
                  data={this.state.GetCategory}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  extraData={this.state}
                  renderItem={this.FeaturesItem}
                />
              </View>
            ) : null}
            {this.state.GetFeaturePost.length > 0 ? (
              <View style={{marginTop: 15, paddingTop: 5, paddingBottom: 14}}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontWeight: 'bold',
                    marginLeft: 16,
                    color: colors.dark,
                    fontSize: 14,
                  }}>
                  Featured Ads
                </Text>
                <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: 4,
                width:150,
                marginRight:16,
                marginLeft:16,
                marginTop:10,
                borderRadius:4,
                backgroundColor: colors.green,
              }}/>
                
              </View>
            ) : null}
            {this.state.GetFeaturePost.length > 0 ? (
              <View style={{marginRight: 15, marginLeft: 15}}>
                <FlatList
                  extraData={this.state}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  data={this.state.GetFeaturePost}
                  renderItem={this._randerPopularNews}
                />
              </View>
            ) : null}
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
  },
  searchStyle: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    elevation: 10,
  },

  lefticon: {
    resizeMode: 'contain',
    height: 23,
    width: 55,
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
    width: 100,
    backgroundColor: colors.white,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobilename: {
    marginHorizontal: 8,
    textAlign: 'center',
    color: colors.black,
    marginTop: 5,
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
