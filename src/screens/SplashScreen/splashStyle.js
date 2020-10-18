import { StyleSheet } from 'react-native';
import colors from '../../common/colors';

export default splashStyle = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: colors.bluelight,
        alignItems: 'center'
    },
    logoview: {
        flex: 1.5, justifyContent: 'center', alignItems: 'center'
    },
    logoviewcircle: {
        elevation: 3, padding: 50, borderRadius: 150,
        backgroundColor: colors.white
    },
    logoImg: {
        height: 300, width: 300, resizeMode: 'cover'
    },
    cityview: {
        flex: 1
    },
    cityImg: {
        height: '100%', width: '100%', resizeMode: 'cover'
    },
    login_view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bluelight,
    },
    login_txt: {
        fontSize: 18, color: colors.white,
        textAlign: "center", fontWeight: 'bold'

    },
});