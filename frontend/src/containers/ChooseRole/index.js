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

class ChooseRole extends Component {
  state = {
    selected_role: '',
  };

  // navigate to home after request of forgot password
  onProceedButtonPressed = () => {
    // TODO: Forgot Password
    if(this.state.selected_role == 'officer'){
      this.props.navigation.navigate('OfficerSignUp');
    }
    return;
    this.props.navigation.navigate('Signup');
  }

  // navigate to home after request of forgot password
  onRolesButtonPressed = (role) => {
    this.setState({selected_role:role})
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
            <Image
              style={styles.logo}
              source={require('../../assets/images/icon.png')}
            />
            <Text style={styles.logoText}>Choose Your Role</Text>
          </View>

          {/* Form */}
          <Form style={styles.form}>
            
            <Button
              style={[styles.button,{height:80, backgroundColor:this.state.selected_role == 'officer' ? "#7646e480":"#7646e4"}]}
              onPress={()=>{this.onRolesButtonPressed("officer")}}
              hasText
              block
              large
            >
              <Text style={styles.sendText}>I'm the Officer</Text>
            </Button>

            <Button
              style={[styles.button,{height:80,backgroundColor:this.state.selected_role == 'citizen' ? "#7646e480":"#7646e4"}]}
              onPress={()=>{this.onRolesButtonPressed("citizen")}}
              hasText
              block
              large
            >
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
              dark
              rounded
            >
              <Text style={styles.sendText}>PROCEED</Text>
            </Button>

          </View>
        </Content>
      </Container>
    );
  }
}

export default ChooseRole;
