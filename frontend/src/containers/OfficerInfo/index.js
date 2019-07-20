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
    first_name: '',
    last_name: '',
    department: '',
    batch_no: '',
    profile_image:''
  };

  // navigate to login screen after a successful signup
  onSignupButtonPressed = () => {
    // TODO: Login

    this.props.navigation.navigate('Login');
  }

  // navigate to login screen
  onLoginButtonPressed = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Please, fill out the form</Text>
          </View>

          {/* Form */}
          <Form style={styles.form}>
            <Item
              style={styles.item}
              rounded
              last
            >
              <Input
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="#afb0d1"
                autoCapitalize="none"
                onChangeText={first_name => this.setState({ first_name })}
              />
            </Item>

            <Item
              style={styles.item}
              rounded
              last
            >
              <Input
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#afb0d1"
                autoCapitalize="none"
                onChangeText={last_name => this.setState({ last_name })}
              />
            </Item>

            <Item
              style={styles.item}
              rounded
              last
            >
              <Input
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#afb0d1"
                autoCapitalize="none"
                onChangeText={department => this.setState({ department })}
              />
            </Item>

            <Item
              style={styles.item}
              rounded
              last
            >
              <Input
                style={styles.input}
                placeholder="Department"
                placeholderTextColor="#afb0d1"
                autoCapitalize="none"
                onChangeText={first_name => this.setState({ first_name })}
              />
            </Item>

            <Item
              style={styles.item}
              rounded
              last
            >
              <Input
                style={styles.input}
                placeholder="Badge Number"
                placeholderTextColor="#afb0d1"
                autoCapitalize="none"
                onChangeText={batch_no => this.setState({ batch_no })}
              />
            </Item>

            <Item
              style={styles.item}
              rounded
              last
            >
              <Input
                style={styles.input}
                placeholder="Upload Your Photo"
                placeholderTextColor="#afb0d1"
                autoCapitalize="none"
                onChangeText={profile_image => this.setState({ profile_image })}
              />
            </Item>

            <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              onPress={this.onSignupButtonPressed}
              hasText
              block
              large
              dark
              rounded
            >
              <Text style={styles.signupText}>COMPLETE</Text>
            </Button>
            </View>

          </Form>

        </Content>
      </Container>
    );
  }
}

export default Signup;
