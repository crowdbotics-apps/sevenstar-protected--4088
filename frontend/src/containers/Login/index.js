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

import validate from 'validate.js';
import styles from './styles';
import BaseScreen from '../BaseScreen';
import {showMessage, hideMessage} from "react-native-flash-message";
import {loginAPI} from '../../services/Authentication';

var constraints = {
    username: {
        presence: true,
        email: {
            message: 'is not valid email.'
        }
    },
    password: {
        presence: true,
        length: {
            minimum: 4,
            message: "must be at least 4 characters"
        }
    }
};

class Login extends Component {
    state = {
        username: '',
        password: '',
        loading: false
    };

    // navigate to home after a successful login
    onLoginButtonPressed = () => {
        const {username, password} = this.state;
        let errors = validate({
            username: username,
            password: password
        }, constraints);

        if (errors) {
            console.log("onLoginPress errors:: ", errors);
            if (errors.username) {
                showMessage({message: errors.username[0], type: "error"});
                return;
            }
            if (errors.password) {
                showMessage({message: errors.password[0], type: "error"});
                return;
            }
        }
        
        this.setState({loading: true});
        loginAPI(username, password).then((resp) => {
            console.log(resp);
            this.setState({loading: false});
            if (resp.token) {
                this
                    .props
                    .navigation
                    .replace('Home');
            } else {
                this.showAlert("Login!", resp.non_field_errors)
            }
        }).catch((ex) => {

            this.showAlert("Login!", 'Invalid Credentials..')
            this.setState({loading: false});
        });
    }

    showAlert(title, message) {
        Alert.alert(title, message, [
            {
                text: 'OK',
                onPress: () => console.log('OK Pressed')
            }
        ], {cancelable: false})
    }

    // navigate to signup screen
    onSignupButtonPressed = () => {
        this
            .props
            .navigation
            .replace('ChooseRole');
    }

    // navigate to forgot password screen
    onForgotPasswordButtonPressed = () => {
        this
            .props
            .navigation
            .replace('ForgotPassword');
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
                        {/* Logo */}
                        <View style={styles.logoContainer}>
                            <Image style={styles.logo} source={require('../../assets/images/logo.png')}/>
                        </View>

                        {/* Form */}
                        <Form style={styles.form}>
                            <Item style={styles.item} last>
                                <Input
                                    style={styles.input}
                                    placeholder="Username"
                                    placeholderTextColor="#afb0d1"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    onSubmitEditing={() => {
                                      this.passwordInput._root.focus();
                                    }}
                                    onChangeText={username => this.setState({username})}/>
                            </Item>
                            <Item style={styles.item} last>
                                <Input
                                    style={styles.input}
                                    placeholder="Password"
                                    ref={input => {
                                      this.passwordInput = input;
                                    }}
                                    returnKeyType="done"
                                    onSubmitEditing={this.onLoginButtonPressed}
                                    placeholderTextColor="#afb0d1"
                                    onChangeText={password => this.setState({password})}
                                    secureTextEntry/>
                            </Item>
                        </Form>

                        <View style={styles.buttonContainer}>
                            {/* Login Button */}
                            <Button
                                style={styles.button}
                                onPress={this.onLoginButtonPressed}
                                hasText
                                block
                                large
                                dark>
                                <Text style={styles.loginText}>LOGIN</Text>
                            </Button>

                            <View style={styles.forgotPasswordContainer}>
                                <TouchableOpacity onPress={this.onForgotPasswordButtonPressed}>
                                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Signup Button */}
                            <View style={styles.signupContainer}>
                                <Text style={styles.dontHaveAccountText}>Don't have an account yet?</Text>
                                <TouchableOpacity onPress={this.onSignupButtonPressed}>
                                    <Text style={styles.signupText}>Sign Up here.</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Content>
                </Container>
            </BaseScreen>
        );
    }
}

export default Login;
