import { StyleSheet } from 'react-native'
import colors from '../../common/colors'

export default LoginStyle = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: colors.white,
    },


    Logintxt: {
        fontSize: 28, color: colors.black,
        marginTop: "40%",
        marginHorizontal: 30

    },

    email: {
        fontSize: 14, color: colors.darklight,
        marginHorizontal: 30

    },
    email_view: {
        marginHorizontal: 30,
        marginTop:30,
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


    forgotpassword_view: {
        flex: 1, marginHorizontal: 30,
        justifyContent: "flex-end", alignItems: "flex-end",

    },
    forgot_view: {
        flexDirection: 'row',
        paddingVertical: 13,
    },
    forgot_txt: {
        fontSize: 14, color: colors.gery,
    },
    cliclktxt: {
        fontSize: 14, color: colors.bluelight,
    },
    login_view: {
        alignItems: 'center',
        justifyContent: 'center',
    
        height: 50,
        backgroundColor: colors.bluelight,
    },
    login_txt: {
        fontSize: 16, color: colors.white,
        textAlign: "center", fontWeight: 'normal'

    },

    account_view: {
        flex: 1,
        justifyContent: 'center', alignItems: 'center',

    },
    forgot_view: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 13, alignItems: 'center', justifyContent: 'center'
    },
    account_txt: {
        fontSize: 14, color: colors.gery,
    },
    signupcliclktxt: {
        fontSize: 14, color: colors.bluelight,
    },
















});