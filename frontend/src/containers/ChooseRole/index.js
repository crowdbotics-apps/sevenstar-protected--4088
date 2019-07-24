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
import {Ionicons} from '@expo/vector-icons';
import BaseScreen from '../BaseScreen';

import styles from './styles';

class ChooseRole extends Component {
    state = {
        selected_role: ''
    };

    // navigate to home after request of forgot password
    onProceedButtonPressed = () => {
        // TODO: Forgot Password
        if (this.state.selected_role == 'officer') {
            this
                .props
                .navigation
                .navigate('OfficerSignUp');
        }
        if (this.state.selected_role == 'citizen') {
            this
                .props
                .navigation
                .navigate('CitizenSignUp');
        }
        return;
    }

    // navigate to home after request of forgot password
    onRolesButtonPressed = (role) => {
        this.setState({selected_role: role})
    }

    // navigate to login screen
    onLoginButtonPressed = () => {
        this
            .props
            .navigation
            .navigate('Login');
    }

    render() {
        return (
            <BaseScreen
                style={{
                flex: 1
            }}
                loading={false}>
                <Container style={styles.container}>
                    <Content contentContainerStyle={styles.content}>

                        <TouchableOpacity
                            onPress={() => {
                            this
                                .props
                                .navigation
                                .navigate('Login');
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
                            <Text style={styles.logoText}>Choose Your Role</Text>
                        </View>

                        {/* Form */}
                        <Form style={styles.form}>

                            <Button
                                style={[
                                styles.button, {
                                    borderColor: 'transparent',
                                    height: 80,
                                    backgroundColor: this.state.selected_role == 'officer'
                                        ? "#2BA4DD80"
                                        : "#2BA4DD"
                                }
                            ]}
                                onPress={() => {
                                this.onRolesButtonPressed("officer")
                            }}
                                hasText
                                block
                                large>
                                <Text style={styles.sendText}>I'm the Officer</Text>
                            </Button>

                            <Button
                                style={[
                                styles.button, {
                                    borderColor: 'transparent',
                                    height: 80,
                                    backgroundColor: this.state.selected_role == 'citizen'
                                        ? "#2BA4DD80"
                                        : "#2BA4DD"
                                }
                            ]}
                                onPress={() => {
                                this.onRolesButtonPressed("citizen")
                            }}
                                hasText
                                block
                                large>
                                <Text style={styles.sendText}>I'm the Citizen</Text>
                            </Button>

                        </Form>

                        <View style={styles.buttonContainer}>
                            {/* Login Button */}
                            <Button
                                style={styles.button}
                                onPress={this.onProceedButtonPressed}
                                hasText
                                block
                                large
                                dark>
                                <Text style={styles.sendText}>PROCEED</Text>
                            </Button>

                        </View>
                    </Content>
                </Container>
            </BaseScreen>
        );
    }
}

export default ChooseRole;
