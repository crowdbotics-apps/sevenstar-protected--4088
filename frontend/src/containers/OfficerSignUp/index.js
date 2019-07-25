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

import styles from './styles';
import BaseScreen from '../BaseScreen';
import {showMessage, hideMessage} from "react-native-flash-message";
import validate from 'validate.js';
import {Ionicons} from '@expo/vector-icons';
import {checkUserNameAPI} from '../../services/Authentication';
import {connect} from 'react-redux';

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
        presence: true,
        exclusion: {
            within: [""],
            message: "can not be blanked."
        }
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
        // TODO: Login this     .props     .navigation     .replace('OfficerInfo');
        const {username, password, phone_no} = this.state;
        let errors = validate({
            username: username,
            password: password,
            phone_no: phone_no
        }, constraints);

        if (errors) {
            console.log("onSignupButtonPressed errors:: ", errors);
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
        this.setState({loading: true});
        checkUserNameAPI(username).then((resp) => {
            console.log(resp.response);
            this.setState({loading: false});
            if (resp.response.success) {
                this
                    .props
                    .updateSignUpData({username: username, password: password, phone_no: phone_no});
                this
                    .props
                    .navigation
                    .replace('OfficerInfo');
            } else {
                console.log(resp.response.error);
                this.showAlert("SignUp!", resp.response.error)
            }
        }).catch((ex) => {
            this.setState({loading: false});
        });

    }

    async componentWillMount() {
        if (this.props.signUpData) {
            this.setState({username: this.props.signUpData.username, password: this.props.signUpData.password, phone_no: this.props.signUpData.phone_no});
        }
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
                                .updateSignUpData(null);
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
                                    value={this.state.username}
                                    placeholderTextColor="#afb0d1"
                                    autoCapitalize="none"
                                    onSubmitEditing={() => {
                                    this
                                        .passwordInput
                                        ._root
                                        .focus();
                                }}
                                    onChangeText={username => this.setState({username})}/>
                            </Item>
                            <Item style={styles.item} last>
                                <Input
                                    style={styles.input}
                                    placeholder="Password"
                                    value={this.state.password}
                                    placeholderTextColor="#afb0d1"
                                    onSubmitEditing={() => {
                                    this
                                        .phone_noInput
                                        ._root
                                        .focus();
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
                                    value={this.state.phone_no}
                                    keyboardType={"phone-pad"}
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

const mapStateToProps = state => ({signUpData: state.auth.userData});

const mapDispatchToProps = (dispatch) => ({
    updateSignUpData: (data) => {
        dispatch({type: 'UpdateSignUpData', userData: data})
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
