import React, {Component} from 'react';
import {Image, TouchableOpacity, TouchableHighlight, View} from 'react-native';
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
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

class Signup extends Component {
    state = {
        first_name: '',
        last_name: '',
        birthdate: '',
        feets: '',
        inches: '',
        weight: '',
        profile_image: '',
        image: null,
        isDateTimePickerVisible: false
    };

    // navigate to login screen after a successful signup
    onSignupButtonPressed = () => {
        // TODO: Login

        this
            .props
            .navigation
            .navigate('Login');
    }

    _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    _handleDatePicked = (date) => {
        this._hideDateTimePicker();
        this.setState({
            date_of_birth: new Date(date)
                .toISOString()
                .replace(/T/, ' ')
                .replace(/\..+/, '')
        })
        this.setState({
            birthdate: new Date(date).toDateString()
        })
    };

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
                        <Text style={styles.logoText}>Please, fill out the form</Text>
                        <Text style={styles.logoText}>as you have it in your driver's license</Text>
                    </View>

                    {this.stepForm1()}
  
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        maximumDate={moment(new Date())
                        .subtract(18, 'years')
                        .toDate()}
                        mode={'date'}
                        onCancel={this._hideDateTimePicker}/>
                </Content>
            </Container>
        );
    }

    stepForm1() {
        return (
            <Form style={styles.form}>

                <Text style={styles.subText}>STEP 1 of 3. PERSONAL INFO</Text>
                <Item style={styles.item} rounded last>
                    <Input
                        style={styles.input}
                        placeholder="First Name"
                        placeholderTextColor="#afb0d1"
                        autoCapitalize="none"
                        onChangeText={first_name => this.setState({first_name})}/>
                </Item>

                <Item style={styles.item} rounded last>
                    <Input
                        style={styles.input}
                        placeholder="Last Name"
                        placeholderTextColor="#afb0d1"
                        autoCapitalize="none"
                        onChangeText={last_name => this.setState({last_name})}/>
                </Item>

                <Item style={styles.item} rounded last>
                    <TouchableHighlight
                        activeOpacity={1}
                        underlayColor="#afb0d100"
                        onPress={this
                        ._showDateTimePicker
                        .bind(this)}
                        style={[{
                            height: 45,
                            width: "100%"
                        }
                    ]}>
                        <View
                            pointerEvents={'none'}
                            style={[{
                                flex: 1
                            }
                        ]}>
                            <Input
                                value={this.state.birthdate}
                                style={styles.input}
                                placeholder="Date of Birth"
                                placeholderTextColor="#afb0d1"
                                returnKeyType="next"
                                editable={false}
                                onKeyPress={keyPress => console.log(keyPress)}
                                onFocus={() => this._showDateTimePicker.bind(this)}
                                selectTextOnFocus={false}/>
                        </View>
                    </TouchableHighlight>
                </Item>

                <Button
                    rounded
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
                        dark
                        rounded>
                        <Text style={styles.signupText}>NEXT</Text>
                    </Button>
                </View>

            </Form>
        )
    }
}

export default Signup;
