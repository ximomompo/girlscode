import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import IconBadge from 'react-native-icon-badge';
import { Scene, Router, Stack, Tabs } from 'react-native-router-flux';
import { TabIcon } from './components/Commons';
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
                />
                <Scene
                    key="playbooks_create"
                    component={Playbooks}
                    title="Crear"
                    icon={TabIcon}
                    iconName="photo-camera"
                />
                <Scene
                    key="profile"
                    component={Playbooks}
                    title="Perfil"
                    icon={TabIcon}
                    iconName="torso-female"
                    iconType="foundation"
                />
            </Tabs>
        </Stack>
    </Router>
);

RouterComponent.propTypes = {
    logged: PropTypes.bool.isRequired,
};

export default RouterComponent;

// <View>
//     <Icon name="bell" type="entypo" style={{ marginRight: 12 }} />
//     <Badge
//         value={3}
//         textStyle={{ color: 'orange' }}
//     />
// </View>
