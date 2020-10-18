import React from 'react';
import { StyleSheet, View, Text, Modal, Animated, Image, Easing, ActivityIndicator } from 'react-native';

export default class CustomLoader extends React.Component {
    constructor() {
        super();
        this.spinValue = new Animated.Value(0);
    }

    componentDidMount() {
        this.spin();
    }

    spin() {
        this.spinValue.setValue(0);
        Animated.timing(this.spinValue, {
            toValue: 1,
            duration: 1600,
            easing: Easing.linear,
            useNativeDriver:true
        }).start(() => this.spin()
        );
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.loaderVisible}
                onRequestClose={() => {
                    console.log("back press");
                }}>
                <View style={styles.container}>
                    {/* <ActivityIndicator size="large" color="#ffffff" /> */}
                    <Animated.Image
                        style={[styles.ImgCss, { transform: [{ rotate: spin }] }]}
                        source={require('../common/Images/loader.png')} />
                    {this.props.Text ?
                        <Text style={styles.textCss}>{this.props.Text}</Text>
                        : null}
                </View>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
        backgroundColor: "#00000090"
    },
    textCss: {
        marginTop: 20, fontSize: 18, fontWeight: 'bold', color: 'black'
    },
    ImgCss: {
        width: 45, height: 45, resizeMode: "contain"
    },
});