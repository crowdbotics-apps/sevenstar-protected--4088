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

import {connect} from 'react-redux';
import styles from './styles';

class ChooseRole extends Component {
    state = {
        pay_role: ''
    };

    // navigate to home after request of forgot password
    onProceedButtonPressed = () => {
        if (this.state.pay_role == '0') {
            this
                .props
                .navigation
                .replace('CitizenInfo');
        }
        if (this.state.pay_role == '1') {
            this
                .props
                .navigation
                .replace('CitizenInfo');
        }
    }

    async componentWillMount() {
        if (this.props.signUpData) {
            this.setState({pay_role: this.props.signUpData.pay_role});
        }
    }

    // navigate to home after request of forgot password
    onRolesButtonPressed = (role) => {
        this.props.signUpData.pay_role = role;
        this
            .props
            .updateSignUpData(this.props.signUpData);
        this.setState({pay_role: role})
    }

    render() {
        return (
            <BaseScreen style={{
                flex: 1
            }} loading={false}>
                <Container style={styles.container}>
                    <Content contentContainerStyle={styles.content}>

                        <TouchableOpacity
                            onPress={() => {
                            this
                                .props
                                .navigation
                                .replace('CitizenSignUp');
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
                                    backgroundColor: this.state.pay_role == '0'
                                        ? "#2BA4DD80"
                                        : "#2BA4DD"
                                }
                            ]}
                                onPress={() => {
                                this.onRolesButtonPressed("0")
                            }}
                                hasText
                                block
                                large>
                                <Text style={styles.sendText}>Pay Tickets</Text>
                            </Button>

                            <Button
                                style={[
                                styles.button, {
                                    borderColor: 'transparent',
                                    height: 80,
                                    backgroundColor: this.state.pay_role == '1'
                                        ? "#2BA4DD80"
                                        : "#2BA4DD"
                                }
                            ]}
                                onPress={() => {
                                this.onRolesButtonPressed("1")
                            }}
                                hasText
                                block
                                large>
                                <Text style={styles.sendText}>Use Full Version</Text>
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
const mapStateToProps = state => ({signUpData: state.auth.userData});

const mapDispatchToProps = (dispatch) => ({
    updateSignUpData: (data) => {
        dispatch({type: 'UpdateSignUpData', userData: data})
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChooseRole);
