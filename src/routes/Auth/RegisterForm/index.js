import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Alert, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { Input, MainView, Button } from '../../../components/Commons';
import { PHOTO_DEFAULT } from '../../../helpers/constants';

const styles = StyleSheet.create({
    container: {
        marginTop: 64,
    },
});


class RegisterForm extends Component {
    onSubmit = (values) => {
        firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
            .then((_user) => {
                const dataUser = {
                    displayName: values.username,
                    username: values.username,
                    email: values.email,
                    photoURL: PHOTO_DEFAULT,
                };

                _user.updateProfile({
                    displayName: values.username,
                    photoURL: PHOTO_DEFAULT,
                });

                firebase.database().ref('users').child(_user.uid).set(dataUser)
                    .then(() => {
                        Actions.replace('playbooks_list');
                    });
            })
            .catch((error) => {
                Alert.alert(
                    'Error al registrarse',
                    error.message,
                    [{ text: 'OK' }],
                    { cancelable: true },
                );
            });
    };
    render() {
        return (
            <MainView style={styles.container}>
                <Field
                    type="username"
                    name="username"
                    placeholder="Nombre"
                    autoCapitalize="none"
                    component={Input}
                />
                <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoCapitalize="none"
                    component={Input}
                />
                <Field
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    secureTextEntry
                    component={Input}
                />
                <Button
                    buttonStyle={{ backgroundColor: 'red' }}
                    title="REGÍSTRATE"
                    onPress={this.props.handleSubmit(props => this.onSubmit(props))}
                    fullWidth
                />
            </MainView>
        );
    }
}

export default reduxForm({ form: 'login' })(RegisterForm);
