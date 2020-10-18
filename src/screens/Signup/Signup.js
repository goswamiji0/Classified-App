import React, { Component } from 'react'
import { View, Text, Keyboard, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import colors from "../../common/colors";
import ImagePath from "../../common/ImagePath"
import styles from "./SignupStyle";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux'

import Constant from '../../common/Constant'
import CustomLoader from '../../common/CustomLoader';
import Helper from '../../common/Helper'
import Config from '../../common/Config'
import Toast from 'react-native-simple-toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
export default class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSelectedValue: '',
            loaderVisible: false,
            mobile: '',
            otp: ''
        }
    }



    gotoBack() {
        // this.props.navigation.goBack(null);
        Actions.pop();


    }
    gotosignup = () => {
        Keyboard.dismiss()
        if (this.CheckVaildationSignUp() == false) {
            return
        } else {
            this.showLoader();
            // let details = {
            //     // 'country_code': "+91",
            //     'mobile': this.props.otpdata,
            //     'otp': this.state.otp,
            // }
            let tempdata = new FormData();
            tempdata.append('mobile', this.props.otpdata);
            tempdata.append('otp', this.state.otp);


            Helper.makeRequest({ url: "otp_verify.php", data: tempdata, method: "POST" }).then((responsedata) => {
                if (responsedata.status == true) {
                    let userData = responsedata.result
                    Helper.setData('userData', userData)
                    // Helper.setData('token', responsedata.security_token)
                    // Helper.token = responsedata.security_token
                    Helper.userData = userData
                    Helper.user_id = userData.id
                    this.hideLoader();
                    Toast.show(responsedata.message, Toast.LONG);
                    Actions.Tabbar();

                }
                else {
                    this.hideLoader();
                    Toast.show(responsedata.message, Toast.LONG);


                }
            })
        }

    }

    CheckVaildationSignUp() {
        if (this.state.otp.length == 0) {
            Toast.show(Constant.kEnterOTPNumberError, Toast.LONG);

            return false
        }


        return true
    }

    gotoResendOtp = () => {
        this.showLoader();
       
        let tempdata = new FormData();
        tempdata.append('mobile', this.props.otpdata);

        Helper.makeRequest({ url: "register.php", data: tempdata, method: "POST" }).then((responsedata) => {
            if (responsedata.status == true) {
                this.hideLoader();
                Toast.show(responsedata.message)

            }
            else {
                this.hideLoader();
                Toast.show(responsedata.message)

            }
        })
    }

    showLoader() {
        this.setState({ loaderVisible: true });
    }
    hideLoader() {
        this.setState({ loaderVisible: false });
    }
    render() {
        // alert(this.props.otpdata)
        return (
            <View style={styles.container}>


                <CustomLoader
                    loaderVisible={this.state.loaderVisible} />
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled' >
                    <View>
                        <TouchableOpacity style={{ flex: 1, padding: 18 }}
                            onPress={() => this.gotoBack()}>

                           
                            <MaterialCommunityIcons style={ { marginTop: 20 }} name="arrow-left" color={colors.bluelight} size={28} />
                        </TouchableOpacity>
                        <Text style={[styles.Logintxt, { fontWeight: 'bold', marginTop: "30%" }]}>One-Time-Passcode</Text>

                        <Text style={[styles.subline, { marginTop: 20 }]}>Verify your mobile number with OTP</Text>
                        <View style={styles.email_view}>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="next"
                                keyboardType={'number-pad'}
                                maxLength={4}
                                secureTextEntry={true}
                                onChangeText={(otp) => this.setState({ otp: otp })}
                                placeholderTextColor={colors.gery}
                                placeholder='Enter OTP'
                                style={styles.email_edit} />

                        </View>



                        <TouchableOpacity style={[styles.login_view, { marginTop: 40, borderRadius: 30, marginHorizontal: 30 }]}
                            onPress={() => this.gotosignup()}>
                            <Text style={styles.login_txt}>Verify Mobile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginTop: 20, marginBottom: 20 }} onPress={() => this.gotoResendOtp()}>
                            <Text style={{
                                fontSize: 16, color: colors.orange,
                                marginTop:20,
                                textAlign: "center", fontWeight: 'normal'
                            }}>Resend OTP</Text>
                        </TouchableOpacity>




                    </View>
                </KeyboardAwareScrollView>
            </View>

        )
    }
}