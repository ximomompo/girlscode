import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { reduxForm, Field } from 'redux-form';
import firebase from 'react-native-firebase';
import { Input, MainView, Button } from '../../../components/Commons';

class LoginForm extends Component {
    onSubmit = (values) => {
        firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .then((response) => {
                console.log('then', response);
                Actions.replace('playbooks_list');
            })
            .catch((error) => {
                Alert.alert(
                    'Error al acceder',
                    error.message,
                    [{ text: 'OK' }],
                    { cancelable: true },
                );
            });
    }
    render() {
        return (
            <MainView>
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
                    title="ACCEDE"
                    onPress={this.props.handleSubmit(props => this.onSubmit(props))}
                    fullWidth
                />
            </MainView>
        );
    }
}

export default reduxForm({ form: 'login' })(LoginForm);
