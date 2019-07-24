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
import {ImagePicker, Permissions, Constants} from 'expo';
import BaseScreen from '../BaseScreen';
import {showMessage, hideMessage} from "react-native-flash-message";
import validate from 'validate.js';
import {Ionicons} from '@expo/vector-icons';

var constraints = {
    first_name: {
        presence: true,
        exclusion: {
            within: [""],
            message: "can not be blanked."
        }
    },
    last_name: {
        presence: true,
        exclusion: {
            within: [""],
            message: "can not be blanked."
        }
    },
    department: {
        presence: true,
        exclusion: {
            within: [""],
            message: "can not be blanked."
        }
    },
    batch_no: {
        presence: true,
        exclusion: {
            within: [""],
            message: "can not be blanked."
        }
    }
};

class Signup extends Component {
    state = {
        first_name: '',
        last_name: '',
        department: '',
        batch_no: '',
        profile_image: '',
        image: null,
        loading: false
    };

    // navigate to login screen after a successful signup
    onSignupButtonPressed = () => {
        // TODO: Login
        const {first_name, last_name, department, batch_no} = this.state;
        let errors = validate({
            first_name: first_name,
            last_name: last_name,
            department: department,
            batch_no: batch_no
        }, constraints);

        if (errors) {
            console.log("onSignupButtonPressed errors:: ", errors);
            if (errors.first_name) {
                showMessage({message: errors.first_name[0], type: "error"});
                return;
            }
            if (errors.last_name) {
                showMessage({message: errors.last_name[0], type: "error"});
                return;
            }
            if (errors.department) {
                showMessage({message: errors.department[0], type: "error"});
                return;
            }
            if (errors.batch_no) {
                showMessage({message: errors.batch_no[0], type: "error"});
                return;
            }
        }
        this
            .props
            .navigation
            .replace('SignUpComplete');
    }

    // navigate to login screen
    onLoginButtonPressed = () => {
        this
            .props
            .navigation
            .replace('Login');
    }
    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async() => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3]
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({image: result.uri});
        }
    };

    render() {
        let {image} = this.state;
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
                                .replace('OfficerSignUp');
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
                            <Text style={styles.logoText}>Please, fill out the form</Text>
                        </View>

                        {/* Form */}
                        <Form style={styles.form}>
                            <Item style={styles.item} last>
                                <Input
                                    style={styles.input}
                                    placeholder="First Name"
                                    placeholderTextColor="#afb0d1"
                                    autoCapitalize="words"
                                    onSubmitEditing={() => {
                                      this.last_nameInput._root.focus();
                                    }}
                                    onChangeText={first_name => this.setState({first_name})}/>
                            </Item>

                            <Item style={styles.item} last>
                                <Input
                                    style={styles.input}
                                    placeholder="Last Name"
                                    placeholderTextColor="#afb0d1"
                                    autoCapitalize="words"
                                    ref={input => {
                                      this.last_nameInput = input;
                                    }}
                                    onSubmitEditing={() => {
                                      this.departmentInput._root.focus();
                                    }}
                                    onChangeText={last_name => this.setState({last_name})}/>
                            </Item>

                            <Item style={styles.item} last>
                                <Input
                                    style={styles.input}
                                    placeholder="Department"
                                    placeholderTextColor="#afb0d1"
                                    autoCapitalize="words"
                                    ref={input => {
                                      this.departmentInput = input;
                                    }}
                                    onSubmitEditing={() => {
                                      this.batch_notInput._root.focus();
                                    }}
                                    onChangeText={department => this.setState({department})}/>
                            </Item>

                            <Item style={styles.item} last>
                                <Input
                                    style={styles.input}
                                    placeholder="Badge Number"
                                    placeholderTextColor="#afb0d1"
                                    autoCapitalize="none"
                                    keyboardType={"number-pad"}
                                    ref={input => {
                                      this.batch_notInput = input;
                                    }}
                                    onSubmitEditing={() => {
                                      this._pickImage();
                                    }}
                                    onChangeText={batch_no => this.setState({batch_no})}/>
                            </Item>

                            <Button
                                style={[
                                styles.input, {
                                    width: '100%',
                                    marginTop: 5,
                                    justifyContent: 'center',
                                    backgroundColor: '#2BA4DD'
                                }
                            ]}
                                hasText
                                onPress={this._pickImage}>
                                <Text style={styles.signupText}>Upload your photo</Text>
                            </Button>

                            <View style={styles.buttonContainer}>
                                <Button
                                    style={styles.button}
                                    onPress={this.onSignupButtonPressed}
                                    hasText
                                    block
                                    large
                                    dark>
                                    <Text style={styles.signupText}>COMPLETE</Text>
                                </Button>
                            </View>

                        </Form>

                    </Content>
                </Container>
            </BaseScreen>
        );
    }
}

export default Signup;
