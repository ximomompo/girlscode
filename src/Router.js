import React from 'react';
import PropTypes from 'prop-types';
// import { StyleSheet } from 'react-native';
import { Scene, Router, Stack } from 'react-native-router-flux';
import LoginForm from './routes/Auth/LoginForm';
import RegisterForm from './routes/Auth/RegisterForm';
import AuthMain from './routes/Auth';
import Playbooks from './routes/Playbooks';
import * as colors from './helpers/colors';

const RouterComponent = props => (
    <Router
        sceneStyle={{ backgroundColor: colors.white }}
    >
        <Stack
            key="root"
            hideNavBar
            init
        >
            <Stack
                key="auth"
                initial={!props.logged}
                navTransparent
            >
                <Scene key="index" component={AuthMain} init />
                <Scene key="login" component={LoginForm} backTitle=" " />
                <Scene key="register" component={RegisterForm} backTitle=" " />
            </Stack>

            <Stack
                key="playbooks"
                initial={props.logged}
            >
                <Scene key="playbooks_list" component={Playbooks} title="playbooks list" init />
                <Scene key="playbooks_create" component={Playbooks} title="playbooks create" />
            </Stack>
        </Stack>
    </Router>
);

RouterComponent.propTypes = {
    logged: PropTypes.bool.isRequired,
};

export default RouterComponent;
