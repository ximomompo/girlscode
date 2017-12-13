import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, MainView, Button } from '../../../components/Commons';
import { login } from '../../../modules/user/actions';
import styles from '../styles';
import { primary } from '../../../helpers/colors';

class LoginForm extends Component {
    onSubmit = (values) => {
        this.props.login(values.email, values.password);
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
                <Text style={styles.titleAuth}>Acceso</Text>
                <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    component={Input}
                />
                <Field
                    type="password"
                    name="password"
                    underlineColorAndroid="transparent"
                    placeholder="Contraseña"
                    secureTextEntry
                    component={Input}
                />
                <Button
                    buttonStyle={{ backgroundColor: 'red' }}
                    title="Acceder"
                    onPress={this.props.handleSubmit(props => this.onSubmit(props))}
                    fullWidth
                />
                <TouchableOpacity
                    onPress={() => Actions.forgotPassword()}
                >
                    <Text>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
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
