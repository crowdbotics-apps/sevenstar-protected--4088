import React, {Component} from 'react';
import {
    ActivityIndicator,
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
import PopupDialog, {SlideAnimation} from 'react-native-popup-dialog';

export default class BaseScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        paddingBottom:30
                    }}>

                        {this.props.children}
                        <View
                            style={{
                            position: 'absolute',
                            width: '100%'
                        }}>
                            <FlashMessage
                                style={{
                                zIndex: 222
                            }}
                                position="top"/>
                        </View>
                        {this.loadingDialog()}
                    </View>
                </TouchableWithoutFeedback>

        );
    }

    loadingDialog() {
        return (
            <PopupDialog
                visible={this.props.loading}
                style={{
                width: '100%',
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center'
            }}
                dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </PopupDialog>
        )
    }
}
