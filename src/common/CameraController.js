import ImagePicker from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from "react-native";
import Helper from '../common/Helper';
import Config from '../common/Config';
// import { check, PERMISSIONS, request, openSettings } from 'react-native-permissions';

export default class CameraController {
    static async open(cb) {
        if (Platform.OS == 'android') {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        this.selecteImage(cb);
                    } else {
                        Helper.alert("Allow " + Config.app_name + " access to your device's photo,media and camera.");
                        // console.log('--------Camera permission denied');
                    }
                } else {
                    Helper.alert("Allow " + Config.app_name + " access to your device's photo,media and camera.");
                    // console.log('--------Camera permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            this.selecteImage(cb);
        }

    }
    static async AddToCalendar(cb) {
        if(Platform.OS=='android'){
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CALENDAR);
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        cb(true);
                    } else {
                        Helper.alert("Allow " + Config.app_name + " access to your device's calendar.");
                        // console.log('--------Camera permission denied');
                    }
                } else {
                    cb(false);
                    Helper.alert("Allow " + Config.app_name + " access to your device's calendar.");
                    // console.log('--------Camera permission denied');
                }
            } catch (err) {
                cb(false);
                console.warn(err);
            }
        }else{
            cb(true);
            console.log("yes");
            
        }

    }

  


    static selecteImage(cb) {
        var options = {
            title: 'Select type',
            quality: 0.2,
            // mediaTypes: 'Images',
            //allowsEditing: true,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('---------Response:  '+ response.fileName);

            if (response.didCancel) {
                // console.log('-----User cancelled image picker');
            } else if (response.error) {
                // console.log('-------ImagePicker Error: '+ response.error);
            } else {
                response.uri = Platform.OS === "android" ? response.uri : response.uri.replace("file://", "");
                cb(response);
            }
        });
    }

}