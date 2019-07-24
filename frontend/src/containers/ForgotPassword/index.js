import React, {Component} from 'react';
import {Image, TouchableOpacity, View, Alert} from 'react-native';
import {
    Button,
    Container,
    Content,
    Form,
    Item,
    Input,
    Text
} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import validate from 'validate.js';

import styles from './styles';
import BaseScreen from '../BaseScreen';
import {showMessage, hideMessage} from "react-native-flash-message";
import {forgetAPI} from '../../services/Authentication';

var constraints = {
    email: {
        presence: true,
        email: {
            message: 'is not valid.'
        }
    }
};

class ForgetPassword extends Component {
    state = {
        email: "",
        loading: false
    };

    // navigate to home after request of forgot password
    onForgotPasswordButtonPressed = () => {
        // TODO: Forgot Password

        const {email} = this.state;

        let errors = validate({
            email: email
        }, constraints);

        if (errors) {
            console.log("onPress errors:: ", errors);
            if (errors.email) {
                showMessage({message: errors.email[0], type: "error"});
                return;
            }
        }
        this.showLoader();
        forgetAPI(this.state.email).then((resp) => {
            console.log(resp);
            this.setState({loading: false});
            this.showAlert("Forget Password!", resp.response)
        })
        //this  .props .navigation .navigate('Login');
    }

    showLoader() {
        this.setState({loading: true})
    }

    showAlert(title, message) {
        Alert.alert(title, message, [
            {
                text: 'OK',
                onPress: () => console.log('OK Pressed')
            }
        ], {cancelable: false})
    }

    // navigate to login screen
    onLoginButtonPressed = () => {
        this
            .props
            .navigation
            .replace('Login');
    }

    render() {
        return (
            <BaseScreen
                style={{
                flex: 1
            }}
                loading={this.state.loading}>
                <Container style={styles.container}>
                    <Content contentContainerStyle={styles.content}>

                        <TouchableOpacity
                            onPress={() => {
                            this
                                .props
                                .navigation
                                .replace('Login');
                        }}
                            style={{
                            width: 50,
                            height: 30,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Ionicons name="ios-arrow-back" size={25} color="#333"/>
                            <Text
                                style={{
                                color: '#333',
                                marginStart: 5
                            }}>Back</Text>
                        </TouchableOpacity>

                        {/* Logo */}
                        <View style={styles.logoContainer}>
                            <Image style={styles.logo} source={require('../../assets/images/logo.png')}/>
                            <Text style={styles.logoText}>Forgot Password?</Text>
                        </View>

                        {/* Form */}
                        <Form style={styles.form}>
                            <Item style={styles.item} last>
                                <Input
                                    style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor="#afb0d1"
                                    autoCapitalize="none"
                                    onSubmitEditing={this.onForgotPasswordButtonPressed}
                                    onChangeText={email => this.setState({email})}/>
                            </Item>
                            <Text style={styles.resetInstructionsText}>
                                Enter your email below to receive your password reset instructions.
                            </Text>
                        </Form>

                        <View style={styles.buttonContainer}>
                            {/* Login Button */}
                            <Button
                                style={styles.button}
                                onPress={this.onForgotPasswordButtonPressed}
                                hasText
                                block
                                large
                                dark>
                                <Text style={styles.sendText}>SEND</Text>
                            </Button>

                            {/* Signup Button */}
                            <View style={styles.loginContainer}>
                                <Text style={styles.rememberAccountText}>Remember your account?</Text>
                                <TouchableOpacity onPress={this.onLoginButtonPressed}>
                                    <Text style={styles.loginText}>Login Now.</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Content>
                </Container>
            </BaseScreen>
        );
    }
}

export default ForgetPassword;
