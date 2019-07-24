import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Container,
  Content,
  Form,
  Item,
  Input,
  Text,
} from 'native-base';

import styles from './styles';


class Signup extends Component {
  state = {
    username: '',
    password: '',
    phone_no: '',
  };

  // navigate to login screen after a successful signup
  onSignupButtonPressed = () => {
    // TODO: Login

    this.props.navigation.replace('CitizenInfo');
  }

  // navigate to login screen
  onLoginButtonPressed = () => {
    this.props.navigation.replace('Login');
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/logo.png')}
            />
            <Text style={styles.logoText}>CITIZEN SIGNUP</Text>
          </View>

          {/* Form */}
          <Form style={styles.form}>
            <Item
              style={styles.item}
              last
            >
              <Input
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#afb0d1"
                autoCapitalize="none"
                onChangeText={username => this.setState({ username })}
              />
            </Item>
            <Item
              style={styles.item}
              last
            >
              <Input
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#afb0d1"
                onChangeText={password => this.setState({ password })}
                secureTextEntry
              />
            </Item>
            <Item
              style={styles.item}
              last
            >
              <Input
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#afb0d1"
                onChangeText={phone_no => this.setState({ phone_no })}
                
              />
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
              dark
            >
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
    );
  }
}

export default Signup;
