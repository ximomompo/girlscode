import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
// import firebase from 'react-native-firebase';
import { Input, MainView, Button } from '../../../components/Commons';


class RegisterForm extends Component {
    onSubmit = (values) => {
        console.log('register', values);
    }
    render() {
        return (
            <MainView>
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
