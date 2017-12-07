import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import IconBadge from 'react-native-icon-badge';
import { Scene, Router, Stack, Tabs, Actions, Modal } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'react-native-firebase';
import { TabIcon } from './components/Commons';
import LoginForm from './routes/Auth/LoginForm';
import RegisterForm from './routes/Auth/RegisterForm';
import AuthMain from './routes/Auth';
import Playbooks from './routes/Playbooks';
import Profile from './routes/Profile';
import OnboardingCreator from './routes/Creator';
import MainCreator from './routes/Creator/New';
import Play from './routes/Play';
import * as colors from './helpers/colors';
import { clearImage } from './modules/gallery/actions';
import { publishPlaybook } from './helpers/functions';

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: colors.primary,
    },
    iconLeft: {
        marginLeft: 12,
    },
    iconRight: {
        marginRight: 12,
    },
});

class RouterComponent extends Component {
    onPublishPb = (key) => {
        publishPlaybook(key)
            .then(() => Actions.reset('playbooks'))
            .catch((error) => {
                if (error.type === 'alert') {
                    Alert.alert(
                        error.title,
                        error.message,
                        [{ text: 'OK' }],
                        { cancelable: true },
                    );
                }
                console.log('error', error);
            });
    }
    checkToPusblishPb = (key) => {
        firebase.database().ref('building_playbooks').child(key)
            .once('value', (snap) => {
                if (snap.child('numScenes').val() <= 0) {
                    Alert.alert(
                        'Pocas de escenas',
                        'El número de escenas debe ser de al menos 3',
                        [{ text: 'OK' }],
                        { cancelable: true },
                    );
                } else {
                    Actions.publish_playbook({ pbKey: key });
                }
            });
    }
    render() {
        return (
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
                        initial={!this.props.logged}
                        navTransparent
                    >
                        <Scene key="index" component={AuthMain} init />
                        <Scene key="login" component={LoginForm} backTitle=" " title="Acceder" />
                        <Scene key="register" component={RegisterForm} backTitle=" " title="Registro" />
                    </Stack>

                    <Tabs
                        key="playbooks"
                        initial={this.props.logged}
                        showLabel={false}
                        renderRightButton={() => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
                        )}
                    >
                        <Scene
                            key="playbooks_list"
                            component={Playbooks}
                            title="Playbooks"
                            init
                            icon={TabIcon}
                            iconName="open-book"
                            iconType="entypo"
                            direction="leftToRight"
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
                        <Scene
                            key="profile"
                            component={Profile}
                            title="Perfil"
                            icon={TabIcon}
                            iconName="torso-female"
                            iconType="foundation"
                        />
                    </Tabs>
                    <Modal
                        key="play"
                        hideNavBar
                        component={Play}
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
