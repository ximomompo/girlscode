import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { Icon } from 'react-native-elements';
// import IconBadge from 'react-native-icon-badge';
import { Scene, Router, Stack, Modal } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabIcon } from './components/Commons';
import LoginForm from './routes/Auth/LoginForm';
import ForgotPassword from './routes/Auth/ForgotPassword';
import RegisterForm from './routes/Auth/RegisterForm';
import AuthMain from './routes/Auth';
import Playbooks from './routes/Playbooks';
import Profile from './routes/Profile';
import Settings from './routes/Profile/settings';
import OnboardingCreator from './routes/Creator/Main';
import MainCreator from './routes/Creator/New';
import Recommendations from './routes/Creator/Main/components/Recommendations';
import Play from './routes/Play';
import * as colors from './helpers/colors';
import * as fonts from './helpers/fonts';
import { clearImage } from './modules/gallery/actions';

class RouterComponent extends Component {
    onNothing = () => {}
    render() {
        return (
            <Router
                sceneStyle={{ backgroundColor: colors.moco }}
            >
                <Stack
                    key="root"
                    hideNavBar
                    init
                >
                    <Stack
                        key="auth"
                        initial={!this.props.logged}
                        navTransparent
                        headerMode="none"
                    >
                        <Scene
                            key="index"
                            component={AuthMain}
                            init
                        />
                        <Scene
                            key="login"
                            component={LoginForm}
                            backTitle=" "
                            title="Acceder"
                        />
                        <Scene
                            key="register"
                            component={RegisterForm}
                            backTitle=" "
                            title="Registro"
                        />
                        <Scene
                            key="forgotPassword"
                            component={ForgotPassword}
                            backTitle=" "
                            title="Recuperar contraseña"
                        />
                    </Stack>

                    <Scene
                        key="playbooks"
                        initial={this.props.logged}
                        component={Playbooks}
                        navTransparent
                        icon={TabIcon}
                        iconName="open-book"
                        iconType="entypo"
                        direction="leftToRight"
                        headerMode="none"
                        navigationBarStyle={{ border: 0 }}
                    />
                    <Stack
                        key="playbooks_create"
                        icon={TabIcon}
                        iconName="photo-camera"
                        navTransparent
                        type="replace"
                        hideTabBar
                        headerMode="none"
                    >
                        <Scene
                            key="onboarding_creator"
                            component={OnboardingCreator}
                        />
                        <Scene
                            key="main_creator"
                            component={MainCreator}
                        />
                    </Stack>
                    <Stack
                        key="user"
                        icon={TabIcon}
                        iconName="torso-female"
                        iconType="foundation"
                    >
                        <Scene
                            key="profile"
                            component={Profile}
                            navTransparent
                            init
                            hideNavBar
                        />
                        <Scene
                            key="setting"
                            component={Settings}
                            title="Configuración"
                            backButtonTintColor={colors.primary}
                            leftButtonTextStyle={{
                                color: colors.primary,
                                fontFamily: fonts.regular,
                                fontSize: 16,
                            }}
                            rightButtonTextStyle={{
                                color: colors.primary,
                                fontFamily: fonts.regular,
                                fontSize: 16,
                            }}
                        />
                    </Stack>
                    <Modal
                        key="play"
                        hideNavBar
                        component={Play}
                        duration={0}
                    />
                    <Modal
                        key="recommendations"
                        hideNavBar
                        component={Recommendations}
                        duration={0}
                    />
                </Stack>
            </Router>
        );
    }
}

RouterComponent.propTypes = {
    logged: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        clearImage,
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(RouterComponent);


/**
 * 
 * <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <IconBadge
            MainElement={<Icon name="bell" type="entypo" style={{ marginRight: 12 }} />}
            BadgeElement={
                <Text style={{ color: '#FFFFFF', fontSize: 11 }}>{1}</Text>
            }
            IconBadgeStyle={{
                top: 'auto',
                bottom: 0,
                minWidth: 18,
                height: 18,
                right: 4,
            }}
        />
    </View>
 */
