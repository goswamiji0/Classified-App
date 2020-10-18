import React, { Component } from 'react'
import { View, Text, Image, Alert, BackHandler, Keyboard, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import colors from "../../common/colors";
import ImagePath from "../../common/ImagePath"
import styles from "./LoginStyle";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux'

import Constant from '../../common/Constant'
import CustomLoader from '../../common/CustomLoader';
import Helper from '../../common/Helper'
import Config from '../../common/Config'
import Toast from 'react-native-simple-toast';

export default class Login extends Component {

    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
        super(props)
        this.state = {

            loaderVisible: false,
            mobile: '',
            otpdata: ''
        }

        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
        );
    }


    async componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
        );




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



    showLoader() {
        this.setState({ loaderVisible: true });
    }
    hideLoader() {
        this.setState({ loaderVisible: false });
    }
    gotoLogin = () => {
        Keyboard.dismiss()
        if (this.CheckVaildationSignUp() == false) {
            return
        } else {
            this.showLoader();
            // let details = {

            //     // country_code: "+91",
            //     mobile: this.state.mobile,


            // }
            let tempdata = new FormData();
            tempdata.append('mobile', this.state.mobile);


            Helper.makeRequest({ url: "register.php", data: tempdata, method: "POST" }).then((responsedata) => {
                if (responsedata.status == true) {
                    Actions.Signup({ otpdata: responsedata.mobile });
                    this.hideLoader();
                    Toast.show(responsedata.message)


                }
                else {
                    this.hideLoader();
                    Toast.show(responsedata.message)

                }
            })
        }
        // Actions.Signup();

    }

    CheckVaildationSignUp() {
        // if (this.state.country_code.length == 0) {
        //     RNToasty.Error({ title: Constant.EntercountryError })
        //     return false
        // }
        if (this.state.mobile.length == 0) {
            Toast.show(Constant.EnterMobileError, Toast.LONG);

            return false
        }
        else if (this.state.mobile.length < 7) {
            Toast.show(Constant.EnterMobileLengthError, Toast.LONG);

            return false
        }

        return true
    }
    gotoBack() {
        Actions.pop();
    }

    render() {
        return (
            <View style={[styles.container]}
            >

                <CustomLoader
                    loaderVisible={this.state.loaderVisible} />
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled' >
                    <View>
                        {/* <TouchableOpacity style={{ flex: 1, padding: 18 }}
                            onPress={() => this.gotoBack()}>

                            <Image
                                style={{ height: 23, width: 40, resizeMode: 'contain' }}
                                source={ImagePath.backarrowblue} />
                        </TouchableOpacity> */}

                        <Text style={[styles.Logintxt, { fontWeight: 'bold' }]}>Verify your mobile number</Text>

                        <Text style={[styles.email, { marginTop: 20 }]}>We will send you one time 
                       passcode on  {'\n'} your mobile.</Text>

                        <View style={styles.email_view}>
                            <TextInput
                                autoCapitalize="none"
                                onSubmitEditing={() => this.userinput.focus()}
                                ref={(input) => this.userinput = input}
                                autoCorrect={false}
                                returnKeyType="next"
                                keyboardType={'number-pad'}
                                maxLength={16}
                                onChangeText={(mobile) => this.setState({ mobile: mobile })}
                                value={this.state.mobile}
                                placeholderTextColor={colors.gery}
                                placeholder='Mobile Number'
                                style={styles.email_edit} />
                            <Image
                                style={styles.email_img}
                                source={ImagePath.mobile} />
                        </View>




                        <TouchableOpacity style={[styles.login_view, { marginTop: 100, borderRadius: 30, marginHorizontal: 30 }]}
                            onPress={() => this.gotoLogin()}>
                            <Text style={styles.login_txt}>GET OTP</Text>
                        </TouchableOpacity>



                    </View>
                </KeyboardAwareScrollView>
            </View >

        )
    }
}