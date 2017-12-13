import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { MainView, Button } from '../../components/Commons';
import styles from './styles';
import { primary } from '../../helpers/colors';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
        };
    }
    onSubmit = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert(
                    'Email correcto',
                    'Se ha enviado un correo a el email indicado con instrucciones para la recuperación de la contraseña de tu cuenta.',
                    [{ text: 'OK', onPress: () => Actions.pop() }],
                    { cancelable: true },
                );
            })
            .catch((error) => {
                Alert.alert(
                    'Email incorrecto',
                    error.message,
                    [{ text: 'OK' }],
                    { cancelable: true },
                );
            });
    }
    render() {
        return (
            <MainView style={styles.containerAuth}>
                <TouchableOpacity
                    onPress={() => Actions.pop()}
                    style={styles.buttonNextAuth}
                >
                    <Icon
                        name="chevron-left"
                        type="entypo"
                        color={primary}
                        iconStyle={{ fontSize: 28 }}
                    />
                </TouchableOpacity>
                <Text style={styles.titleAuth}>Recuperar contraseña</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={value => this.setState({ email: value })}
                    value={this.state.email}
                    underlineColorAndroid="transparent"
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoCapitalize="none"
                />
                <Button
                    buttonStyle={{ backgroundColor: 'red' }}
                    title="Enviar"
                    onPress={() => this.onSubmit()}
                    fullWidth
                />
            </MainView>
        );
    }
}

export default ForgotPassword;

