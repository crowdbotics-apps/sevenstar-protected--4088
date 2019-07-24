import React, {Component} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {
    Button,
    Container,
    Content,
    Form,
    Item,
    Input,
    Text
} from 'native-base';

import styles from './styles';
import BaseScreen from '../BaseScreen';
import {showMessage, hideMessage} from "react-native-flash-message";
import validate from 'validate.js';
import {Ionicons} from '@expo/vector-icons';

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
    },
    phone_no: {
        presence: true
    }
};

class Signup extends Component {
    state = {
        username: '',
        password: '',
        phone_no: '',
        role: 'officer',
        loading: false
    };

    // navigate to login screen after a successful signup
    onSignupButtonPressed = () => {
        // TODO: Login this     .props     .navigation     .navigate('OfficerInfo');
        const {username, password, phone_no} = this.state;
        let errors = validate({
            username: username,
            password: password,
            phone_no: phone_no
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
            if (errors.phone_no) {
                showMessage({message: errors.phone_no[0], type: "error"});
                return;
            }
        }
        this
            .props
            .navigation
            .replace('OfficerInfo');
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
                                .replace('ChooseRole');
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
                            <Text style={styles.logoText}>OFFICER SIGNUP</Text>
                        </View>

                        {/* Form */}
                        <Form style={styles.form}>
                            <Item style={styles.item} last>
                                <Input
                                    style={styles.input}
                                    placeholder="Username"
                                    placeholderTextColor="#afb0d1"
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
                                    placeholderTextColor="#afb0d1"
                                    onSubmitEditing={() => {
                                      this.phone_noInput._root.focus();
                                    }}
                                    ref={input => {
                                      this.passwordInput = input;
                                    }}
                                    onChangeText={password => this.setState({password})}
                                    secureTextEntry/>
                            </Item>
                            <Item style={styles.item} last>
                                <Input
                                    style={styles.input}
                                    placeholder="Phone Number"
                                    keyboardType={"number-pad"}
                                    placeholderTextColor="#afb0d1"
                                    onSubmitEditing={this.onSignupButtonPressed}
                                    ref={input => {
                                      this.phone_noInput = input;
                                    }}
                                    onChangeText={phone_no => this.setState({phone_no})}/>
                            </Item>

                        </Form>

                        <View style={styles.buttonContainer}>
                            {/* Login Button */}
                            <Button
                                style={styles.button}
                                onPress={this.onSignupButtonPressed}
                                hasText
                                block
                                large
                                dark>
                                <Text style={styles.signupText}>NEXT</Text>
                            </Button>

                            {/* Signup Button */}
                            <View style={styles.loginContainer}>
                                <Text style={styles.haveAccountText}>Already have an account?</Text>
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

export default Signup;
