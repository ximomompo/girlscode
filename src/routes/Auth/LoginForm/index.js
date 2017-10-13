import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, MainView, Button } from '../../../components/Commons';
import { login } from '../../../modules/user/actions';

const styles = StyleSheet.create({
    container: {
        marginTop: 64,
    },
});

class LoginForm extends Component {
    onSubmit = (values) => {
        this.props.login(values.email, values.password);
    }
    render() {
        return (
            <MainView style={styles.container}>
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

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        login,
    }, dispatch)
);

export default reduxForm({ form: 'login' })(
    connect(null, mapDispatchToProps)(LoginForm),
);
