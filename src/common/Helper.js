

import * as React from 'react';
import Config from "./Config";
import Constant from "./Constant";
import { NavigationActions, StackActions } from 'react-navigation';
import { AsyncStorage, Alert, NetInfo, Linking, Platform, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Toast from 'react-native-simple-toast';

export default class Helper extends React.Component {
    url = "";
    static mainApp;
    static toast;
    static user = {};
    static navigationRef;
    static activeChatId = '';
    static isNetConnected = true;
    static appupdateDetail;
    static opennotificationsId = [];
    static applanguage = "en";
    static userData = {}
    static user_id = ''
    static token = ''
    static userdetailsData = ''
    // static loaderVisible = false

    // static showLoader() {
    //     this.setState({ loaderVisible: true });
    // }
    // static hideLoader() {
    //     this.setState({ loaderVisible: false });
    // }

    static nav = {
        push: (routeName, params) => {
            Helper.navigationRef.dispatch(
                NavigationActions.navigate({
                    routeName, params
                })
            );
        },
        setRoot: (page, params = {}) => {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: page, params })
                ]
            })
            Helper.navigationRef.dispatch(resetAction)
        }
    };

    static registerNavigator(ref) {
        Helper.navigationRef = ref;
    }


    // static registerToast(toast) {
    //     Helper.toast = toast;
    // }

    // static showToast(msg, position = 'BOTTOM') {
    //     Keyboard.dismiss();
    //     if (msg) {
    //         Toast.show(msg, {
    //             duration: Toast.durations.SHORT,
    //             position: Toast.positions[position],
    //             shadow: true,
    //             animation: true,
    //             hideOnPress: true,
    //             delay: 0,
    //         });
    //     }
    // }





    static capitalizeFirstLetter(name) {
        let splitStr = name.split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    static capitalizeFirstLetterComma(name) {
        let splitStr = name.split(',');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(',');
    }








    static async setData(key, val) {
        try {
            let tempval = JSON.stringify(val);
            await AsyncStorage.setItem(key, tempval);
        } catch (error) {
            console.error(error, "AsyncStorage")
            // Error setting data 
        }
    }

    static async getData(key) {
        try {
            let value = await AsyncStorage.getItem(key);
            if (value) {
                let newvalue = JSON.parse(value);
                return newvalue;
            } else {
                return value;
            }
        } catch (error) {
            console.error(error, "AsyncStorage")
            // Error retrieving data
        }
    }

    static async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch (exception) {
            return false;
        }
    }
    static validate(form, validations) {
        let isValidForm = true;
        let errors = {};
        let message = '';
        if (!validations) {
            validations = form.validators;
        }
        let customvalidator = {
            mobile_no: "Mobile number",
            whatsapp_no: "Whatsapp number",
            username: "Name",
            mov: "Minimum order value"
        };
        var emojiRegexp = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g;
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;; //email
        var numberRegex = /^\d+$/; // number
        for (let val in validations) {
            if (!isValidForm) break;
            if (form[val]) {
                for (let i in validations[val]) {
                    var valData = validations[val][i];
                    console.log(form[val], "form[val]")
                    let tempval = form[val];
                    if (i == "required" && !(form[val].toString()).trim()) {
                        isValidForm = false;
                        let value = (val.charAt(0).toUpperCase() + val.slice(1)).split("_").join(" ");
                        message = value + " is required";

                    }
                    else if ((i == "minLength" || i == "minLengthDigit") && form[val].length <= valData) {
                        isValidForm = false;
                        let value = (val.charAt(0).toUpperCase() + val.slice(1)).split("_").join(" ");
                        var cStr = i == "minLengthDigit" ? " digit" : " characters";
                        message = value + " should be greater than " + valData + cStr;

                    }
                    else if ((i == "maxLength" || i == "maxLengthDigit") && form[val].length >= valData) {
                        isValidForm = false;
                        let value = (val.charAt(0).toUpperCase() + val.slice(1)).split("_").join(" ");
                        var cStr = i == "maxLengthDigit" ? " digit" : " characters";
                        message = value + " should be smaller than " + valData + cStr;
                    }
                    else if (i == "matchWith" && form[val] != form[valData]) {
                        isValidForm = false;
                        let value = (val.charAt(0).toUpperCase() + val.slice(1)).split("_").join(" ");
                        let value2 = (valData.charAt(0).toUpperCase() + valData.slice(1)).split("_").join(" ");
                        message = value + " and " + value2 + " should be same";
                    }
                    else if (i == "email" && reg.test(form[val]) == false) {
                        isValidForm = false;
                        message = "Please enter valid email address.";
                    }
                    else if (i == "numeric" && numberRegex.test(form[val]) == false) {
                        isValidForm = false;
                        let value = (val.charAt(0).toUpperCase() + val.slice(1)).split("_").join(" ");
                        message = value + " should be number only";
                    }
                    else if (i == "emoji" && emojiRegexp.test(form[val]) == true) {
                        isValidForm = false;
                        let value = (val.charAt(0).toUpperCase() + val.slice(1)).split("_").join(" ");
                        message = value + " emoji is not valid";
                    }
                    if (message) {
                        Toast.show(message);
                        break;
                    }
                }
            }
            else {
                // Helper.showToast("Please enter "+val);
                //form.info[val]="This field is required";
                let tempmsg;

                if (customvalidator[val]) {
                    tempmsg = customvalidator[val];
                } else {
                    tempmsg = (val.charAt(0).toUpperCase() + val.slice(1)).split("_").join(" ");
                }
                Toast.show(tempmsg + " is required");


                isValidForm = false;
                break;
            }
        }
        return isValidForm;
    }
    static async makeRequest({ url, data, method = "POST", loader = true }) {
        if (Helper.isNetConnected) {
            let finalUrl = Config.url + url;
            console.log(finalUrl, "finalUrl");
            let form;
            let methodnew;
            let varheaders;

            let token = await this.getData("token");
            console.log(token, "tokentoken")
            if (method == "POSTUPLOAD") {
                methodnew = "POST";
                varheaders = {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data;',
                    token: token
                }
                form = data;
            }
            else if (method == "POST") {
                methodnew = "POST";
                if (token) {
                    varheaders = {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data;',
                        Authorization: 'Bearer ' + token // if you use token

                    }
                } else {
                    varheaders = {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data;',
                    }
                }
                form = data
            }
            else {
                methodnew = "GET";
                if (token) {
                    varheaders = {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        token: token
                    }
                } else {
                    varheaders = {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        token: "BHBH^^&6767767nNJNJHBHG#$#vg98990nsjd"

                    }
                }
            }
            if (loader)
                console.log("Api Data", form, "form");
            console.log("Api methodnew", methodnew, "methodnew");
            console.log("Api headers", varheaders, "headers");


            return fetch(finalUrl, {
                cache: 'no-cache',
                mode: 'cors',
                body: form,
                method: methodnew,
                headers: varheaders,
            })
                .then((response) => {
                    // console.log(response.json(), "response")
                    return response.json()

                })
                .then((responseJson) => {
                    console.log(responseJson, "responseJson")
                    if (responseJson.user_status == "false" || responseJson.user_status == false) {
                        Toast.show(responseJson.message);
                        this.logoutData();
                    } else {
                        return responseJson;
                    }
                })
                .catch((error) => {
                    Toast.show(Constant.kAPIError);
                    console.log(error);

                });
        } else {
            Helper.popUpNoInternet();
        }
    }
    static async makeRequestImage({ url, data, method = "POST", loader = true }) {
        if (Helper.isNetConnected) {
            let finalUrl = Config.url + url;
            console.log(finalUrl, "finalUrl");
            let form;
            let methodnew;
            let varheaders;

            let token = await this.getData("token");
            console.log(token, "tokentoken")
            if (method == "POST") {
                methodnew = "POST";
                varheaders = {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data;',
                    token: token
                }
                form = data;
            }
            
            
            if (loader)
                console.log("Api Data", form, "form");
            console.log("Api methodnew", methodnew, "methodnew");
            console.log("Api headers", varheaders, "headers");


            return fetch(finalUrl, {
                cache: 'no-cache',
                mode: 'cors',
                body: form,
                method: methodnew,
                headers: varheaders,
            })
                .then((response) => {
                    console.log(response.json(), "response")
                    return response.json()

                })
                .then((responseJson) => {
                    console.log(responseJson, "responseJson")
                    if (responseJson.user_status == "false" || responseJson.user_status == false) {
                        Toast.show(responseJson.message);
                        this.logoutData();
                    } else {
                        return responseJson;
                    }
                })
                .catch((error) => {
                    Toast.show(Constant.kAPIError);
                    console.log(error);

                });
        } else {
            Helper.popUpNoInternet();
        }
    }

    static logoutData() {
        Helper.removeItemValue('userData')
        Helper.userData = {}
        Helper.user_id = ''
        Actions.Login();

    }

    static popUpNoInternet = () => {
        setTimeout(() => {
            Alert.alert(
                "No Internet",
                "Oops! It seems that you are not connected to the internet. Please check your internet connection and try again.",
                [
                    {
                        text: "OK", onPress: () => {
                        }
                    },
                ],
                { cancelable: false }
            )
        }, 100);
    }

    static alert(alertMessage, cb) {
        Alert.alert(
            Config.app_name,
            alertMessage,
            [
                { text: 'OK', onPress: () => { if (cb) cb(true); console.log('OK Pressed') } },
            ],
            { cancelable: false }
        )
    }


    static DeniedPermissionPopup() {
        var msg = "App doesn't have location access permissions. Please go to settings and allow Q-Discounts for location access permissions.";
        Alert.alert(
            'Q-Discounts',
            msg
            ,
            [
                { text: 'Cancel', onPress: () => { console.log('OK Pressed') } },
                { text: 'Settings', onPress: () => Helper.openSettingPage() },
            ],
            { cancelable: false }
        )

    }
    static openSettingPage() {
        if (Platform.OS == 'android') {
            Linking.openSettings()
        }
        else {
            Linking.canOpenURL('app-settings:').then(supported => {
                if (!supported) {
                    console.log('Can\'t handle settings url');
                } else {
                    return Linking.openURL('app-settings:');
                }
            }).catch(err => console.error('An error occurred', err));
        }

    }

}