import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import IconBadge from 'react-native-icon-badge';
import { Scene, Router, Stack, Tabs, Actions, Modal } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabIcon } from './components/Commons';
import LoginForm from './routes/Auth/LoginForm';
import RegisterForm from './routes/Auth/RegisterForm';
import AuthMain from './routes/Auth';
import Playbooks from './routes/Playbooks';
import Profile from './routes/Profile';
import OnboardingCreator from './routes/Creator';
import Main from './routes/Creator/Main';
import Make from './routes/Creator/MakeScene';
import Gallery from './routes/Gallery';
import * as colors from './helpers/colors';
import { clearImage } from './modules/gallery/actions';

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
                <Scene key="login" component={LoginForm} backTitle=" " title="Acceder" />
                <Scene key="register" component={RegisterForm} backTitle=" " title="Registro" />
            </Stack>

            <Tabs
                key="playbooks"
                initial={props.logged}
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
                    renderRightButton={() => {}}
                >
                    <Scene
                        key="onboarding_creator"
                        component={OnboardingCreator}
                        init
                        renderLeftButton={() => (
                            <Icon
                                name="cross"
                                type="entypo"
                                style={{ marginLeft: 12 }}
                                onPress={() => Actions.reset('playbooks')}
                            />
                        )}
                    />
                    <Scene
                        key="main_creator"
                        component={Main}
                        renderLeftButton={() => (
                            <TouchableOpacity onPress={() => Actions.reset('playbooks')}>
                                <Text style={{ marginLeft: 12 }}>Cancelar</Text>
                            </TouchableOpacity>
                        )}
                        renderRightButton={() => (
                            <TouchableOpacity onPress={() => Actions.publish_playbook()}>
                                <Text style={{ marginRight: 12 }}>Publicar</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <Scene
                        key="make_scene"
                        component={Make}
                        hideNavBar
                    />
                    <Scene
                        key="publish_playbook"
                        component={Make}
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
            <Scene
                key="gallery"
                title="Galería"
                renderLeftButton={() => (
                    <TouchableOpacity
                        onPress={() => {
                            props.clearImage();
                            Actions.pop();
                        }}
                    >
                        <Text style={[styles.text, styles.iconLeft]}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>
                )}
                renderRightButton={() => (
                    <TouchableOpacity onPress={Actions.pop}>
                        <Text style={[styles.text, styles.iconRight]}>OK</Text>
                    </TouchableOpacity>
                )}
            >
                <Modal
                    key="gallery_modal"
                    component={Gallery}
                />
            </Scene>
        </Stack>
    </Router>
);

RouterComponent.propTypes = {
    logged: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        clearImage,
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(RouterComponent);
