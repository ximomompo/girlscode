import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { Input, MainView } from '../../../components/Commons';
import StatusButton from '../../../components/StatusButton';
import { register } from '../../../modules/user/actions';
import { primary } from '../../../helpers/colors';
import styles from '../styles';


class RegisterForm extends Component {
    onSubmit = (values) => {
        this.props.register(values.email, values.password, values.username);
    };
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
                <Text style={styles.titleAuth}>Registro</Text>
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
                    textDefault="Regístrate"
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
