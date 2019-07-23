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

class Signup extends Component {
    state = {
        first_name: '',
        last_name: '',
        department: '',
        batch_no: '',
        profile_image: '',
        image: null
    };

    // navigate to login screen after a successful signup
    onSignupButtonPressed = () => {
        // TODO: Login

        this
            .props
            .navigation
            .navigate('Login');
    }

    // navigate to login screen
    onLoginButtonPressed = () => {
        this
            .props
            .navigation
            .navigate('Login');
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
            <Container style={styles.container}>
                <Content contentContainerStyle={styles.content}>
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
                                autoCapitalize="none"
                                onChangeText={first_name => this.setState({first_name})}/>
                        </Item>

                        <Item style={styles.item} last>
                            <Input
                                style={styles.input}
                                placeholder="Last Name"
                                placeholderTextColor="#afb0d1"
                                autoCapitalize="none"
                                onChangeText={last_name => this.setState({last_name})}/>
                        </Item>

                        <Item style={styles.item} last>
                            <Input
                                style={styles.input}
                                placeholder="Department"
                                placeholderTextColor="#afb0d1"
                                autoCapitalize="none"
                                onChangeText={department => this.setState({department})}/>
                        </Item>

                        <Item style={styles.item} last>
                            <Input
                                style={styles.input}
                                placeholder="Badge Number"
                                placeholderTextColor="#afb0d1"
                                autoCapitalize="none"
                                onChangeText={batch_no => this.setState({batch_no})}/>
                        </Item>

                        <Button
                            style={[
                            styles.input, {
                                width: '100%',
                                marginTop: 5,
                                justifyContent: 'center',
                                backgroundColor: '#121d56'
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
        );
    }
}

export default Signup;
