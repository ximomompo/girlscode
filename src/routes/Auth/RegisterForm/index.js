import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, MainView } from '../../../components/Commons';
import StatusButton from '../../../components/StatusButton';
import { register } from '../../../modules/user/actions';

const styles = StyleSheet.create({
    container: {
        marginTop: 64,
    },
});


class RegisterForm extends Component {
    onSubmit = (values) => {
        this.props.register(values.email, values.password, values.username);
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
                <StatusButton
                    domain="register"
                    textDefault="REGÍSTRATE"
                    onPress={this.props.handleSubmit(props => this.onSubmit(props))}
                    fullWidth
                />
            </MainView>
        );
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        register,
    }, dispatch)
);

export default reduxForm({ form: 'register' })(
    connect(null, mapDispatchToProps)(RegisterForm),
);
