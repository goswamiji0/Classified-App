import React, { Component } from 'react';
import { Image, TouchableOpacity, Linking, StyleSheet, RefreshControl, Keyboard, Modal, ScrollView, DeviceEventEmitter, BackHandler, Alert, Dimensions, FlatList, Text, SafeAreaView, View } from 'react-native';
import ImagePath from '../../../common/ImagePath';
import { Actions } from 'react-native-router-flux'
import colors from "../../../common/colors";
const dimensions = Dimensions.get("window");
const imageHeight = Math.round((dimensions.width * 9) / 22);
const imageWidth = dimensions.width;


import Constant from '../../../common/Constant'
import CustomLoader from '../../../common/CustomLoader';
import Helper from '../../../common/Helper'
import Config from '../../../common/Config'
import Toast from 'react-native-simple-toast';


export default class Categories extends Component {

  _didFocusSubscription;
  _willBlurSubscription;
  static navigationOptions = { header: null }



  constructor(props) {
    super(props)
    this.state = {
      GetCategory: [],
      modalVisible: false,
      showLoaderRefresh: false,
    }
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    );

  }

  showLoader() {
    this.setState({ loaderVisible: true });
  }
  hideLoader() {
    this.setState({ loaderVisible: false });
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    );

    this.gotoCategory(true);

  }

  _pullToRefresh = () => {
    this.setState({ showLoaderRefresh: true })
    this.gotoCategory(false);
  }



  gotoCategory(loader) {
    loader == true ?
      this.showLoader() : this.hideLoader()
    Helper.makeRequest({ url: "getCategory.php", method: "POST" }).then((responsedata) => {
      this.state.showLoaderRefresh = false

      if (responsedata.status == true) {
        this.hideLoader();
        this.setState({ GetCategory: responsedata.result })

      }
      else {
        Toast.show(responsedata.message, Toast.LONG);

        this.hideLoader();
      }
    })
  }
  handleBackPress = () => {
    Alert.alert(
      '2OTP',
      'Are you sure, you want to exit?', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
      },], {
      cancelable: false
    }
    )
    return true;
  }

  componentWillUnmount() {

    if (this._didFocusSubscription) {
      this._didFocusSubscription.remove();
    }

    if (this._willBlurSubscription) {
      this._willBlurSubscription.remove();
    }

  }




  gotoCategoriesDetails(item) {
    console.log(JSON.stringify(item)+"caterory listtttttttttttttttt");
    {!item==''&&
    Actions.CategoriesDetails({Categories_id: item})    
  }
}
  getCategoryList = ({ item, index }) => (
    <View
      // onPress={() => this.gotoSearchDetailsPage(item)}
      style={{ flexDirection: 'column', width: '48%', marginTop: 2, marginBottom: 10, marginRight: 10,elevation:10  }}>
      <TouchableOpacity onPress={() => this.gotoCategoriesDetails(item)}
        style={[styles.forYouView, { borderRadius: 10, }]}>

        <Image
          resizeMode={'contain'}
          source={item.image ? { uri: item.image } : ""}
          style={{ width: 50, height: 50, alignSelf: 'center', margin: 5 }} />
        <Text numberOfLines={1} style={styles.mobilename}>{item.name}</Text>


      </TouchableOpacity>

    </View>
  )


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomLoader
          loaderVisible={this.state.loaderVisible} />
        <SafeAreaView style={[styles.toolbarmain, { elevation: 10 }]}>
        
            <Text style={{ color: colors.bluelight, fontSize: 18, marginLeft:16, fontWeight: 'bold' }}>Categories</Text>
          
        </SafeAreaView>
        <View style={{ flex: 1, marginRight: 10, marginLeft: 10, marginVertical: 10 }}>
          <FlatList
            extraData={this.state}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            numColumns={2}
            data={this.state.GetCategory}
            renderItem={this.getCategoryList}
            keyExtractor={(item, index) => index}
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
    alignItems: 'center', justifyContent: 'space-between',
    height: 55
  },

  lefticon: {
    resizeMode: "contain",
    height: 25,
    width: 60,
  },
  bell: {
    resizeMode: "contain",
    height: 25,
    width: 30,
  },
  searchion: {
    height: 30,
    resizeMode: "contain",
    flex: 1,
  },
  rightiocn: {
    resizeMode: "contain",
    height: 25,
    width: 30, marginRight: 10
  },
  select: {
    resizeMode: "contain",
    height: 12, marginRight: 10,
    width: 12,
  },
  container: {
    flex: 1, backgroundColor: colors.light,
  },


  boxView: {
    elevation: 1,
    backgroundColor: colors.bgcolor,
  },
  sliderdotrow: {
    backgroundColor: colors.transparentcolor, paddingVertical: 1,
    flexDirection: 'row',
    alignItems: 'center', marginTop: -19, justifyContent: 'center'
  },
  bannerImages: {
    height: 200, width: '100%'
  },

  forYouView: {
    backgroundColor: colors.white,elevation:4,
    marginLeft:5,marginRight:5,
    height: 100, alignItems: 'center', justifyContent: 'center'
  },
  mobilename: {
    textAlign: 'center',
    color: colors.black,
    marginTop: 1,
    fontSize: 12
  },
  price: {
    textAlign: 'center',
    color: colors.dark, marginRight: 5,
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
    textDecorationColor: colors.darklight
  },
  dicount: {
    textAlign: 'center',
    color: colors.darklight,
    fontSize: 11,
    textDecorationLine: 'line-through',
    textDecorationColor: colors.darklight, marginLeft: 5
  },
  mobilerate: {
    textAlign: 'center',
    color: colors.bluedark,
  },
  emptyMessageStyle: {
    fontSize: 16, color: '#000000',
  },

})

