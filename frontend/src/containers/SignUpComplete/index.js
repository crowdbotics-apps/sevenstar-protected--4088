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

class SignUpComplete extends Component {
  state = {
    email: '',
  };

  // navigate to home after request of forgot password
  onGotItButtonPressed = () => {
    // TODO: Forgot Password

    this.props.navigation.navigate('Login');
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
            <Text style={styles.logoText}>Thanks for signing up!</Text>
          </View>

          {/* Form */}
          <Form style={styles.form}>
            
            <Text style={styles.descriptionText}>
              {"Your sign up request was submitted. You will get a notification to <user_email> once the request will be approved"}
            </Text>
          </Form>

          <View style={styles.buttonContainer}>
            {/* Login Button */}
            <Button
              style={styles.button}
              onPress={this.onGotItButtonPressed}
              hasText
              block
              large
              dark
            >
              <Text style={styles.sendText}>GOT IT</Text>
            </Button>

          </View>
        </Content>
      </Container>
    );
  }
}

export default SignUpComplete;
