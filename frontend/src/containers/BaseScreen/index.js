import React, {Component, ActivityIndicator} from 'react';
import {
    Platform,
    Fragment,
    View,
    StatusBar,
    Button,
    SafeAreaView,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    ImageBackground
} from 'react-native';
import FlashMessage from "react-native-flash-message";
import {Keyboard} from 'react-native'

export default class BaseScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView
                style={[
                this.props.style, {
                    backgroundColor: "#000"
                }
            ]}>

                {/* <View style={[ {height:20},{ backgroundColor:"#000"}]}>
                        <StatusBar translucent backgroundColor={this.props.statusBarColor !== ''
                        ? this.props.statusBarColor
                        : "#000"} barStyle="light-content" />
                    </View>                     */}

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{
                        flex: 1,
                        backgroundColor: '#fff'
                    }}>

                        {this.props.children}
                        <FlashMessage position="top"/>
                    </View>
                </TouchableWithoutFeedback>

            </SafeAreaView>
        );
    }
}
