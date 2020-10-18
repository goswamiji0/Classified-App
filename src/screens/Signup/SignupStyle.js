import { StyleSheet } from 'react-native'
import colors from '../../common/colors'

export default SignupStyle = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: colors.white,
    },
    account_txt: {
        fontSize: 15, color: colors.gery,
    },

    Logintxt: {
        fontSize: 28, color: colors.black,
        marginHorizontal: 30,
        
    },
    signupcliclktxt: {
        marginLeft: 10,
        fontSize: 15, color: colors.bluelight,
    },
    subline: {
        fontSize: 14, color: colors.darklight,
        marginTop: 8,marginHorizontal: 30, 
    },
    email_view: {
        marginHorizontal: 30, 
        marginTop:20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderBottomWidth: 0.5,
        borderColor: colors.darklight,
    },

    email_edit: {
        fontSize: 15,
        color: colors.bluelight,
        marginLeft: -4,
        flex: 1,
    },


    email_img: {
        height: 22,
        width: 22,
        marginLeft: 5,
        resizeMode: 'contain',

    },

    password_view: {
        marginHorizontal: 30, 
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderBottomWidth: 0.5,
        borderColor: colors.darklight,

    },
    password_edit: {
        fontSize: 15,
        color: colors.black,
        marginLeft: -4,
        flex: 1,
    },
    password_img: {
        height: 22,
        width: 22,
        marginLeft: 5,
        resizeMode: 'contain',
    },



    login_view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: colors.bluelight,
    },
    login_txt: {
        fontSize: 16, color: colors.white,
        textAlign: "center", fontWeight: 'normal'

    },


















});