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
import Main from './routes/Creator/Main';
import Make from './routes/Creator/MakeScene';
import Publish from './routes/Creator/Publish';
import Gallery from './routes/Gallery';
import * as colors from './helpers/colors';
import { clearImage } from './modules/gallery/actions';
import { VALUE_SCENE_PUBLISHED } from './helpers/constants';

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
        const uploadFile = (sceneKey, image) => (
            new Promise((resolve, reject) => {
                const task = firebase.storage().ref('playbooks')
                    .child(key)
                    .child(sceneKey)
                    .put(image);

                task.on('state_changed', (snapFile) => {
                    // console.log('state', snapFile.state);
                }, (error) => {
                    console.log('error', error);
                    reject(error);
                }, (res) => {
                    resolve(res.downloadURL);
                });
            })
        );

        const uploadScenes = () => (
            new Promise((resolve, reject) => (
                firebase.database().ref('building_playbooks')
                    .child(key)
                    .child('scenes')
                    .orderByChild('finished_at')
                    .startAt(1)
                    .once('value', (snapScenes) => {
                        const uploadImagesPromisesS = [];
                        return snapScenes.forEach((snapScene) => {
                            uploadImagesPromisesS.push(
                                uploadFile(snapScene.key, snapScene.val().image).then((res) => {
                                    snapScene.ref.child('imageURL').set(res);
                                }),
                            );
                            return Promise.all(uploadImagesPromisesS)
                                .then(() => resolve())
                                .catch(() => reject());
                        });
                    })
            ))
        );
        firebase.database().ref('building_playbooks')
            .child(key)
            .once('value', (snap) => {
                if (!snap.val().title) {
                    return Alert.alert(
                        'Título necesario',
                        'Debes añadir escribir un título para tu playbook',
                        [{ text: 'OK' }],
                        { cancelable: true },
                    );
                }

                if (!snap.val().category) {
                    return Alert.alert(
                        'Categoría necesaria',
                        'Debes asignar una categoría a tu playbook',
                        [{ text: 'OK' }],
                        { cancelable: true },
                    );
                }
                snap.ref.child('publishing').set(true);
                // subir imagenes
                const uploadImagesPromises = [];

                uploadImagesPromises.push(uploadScenes());

                uploadImagesPromises.push(
                    uploadFile('done', snap.val().done_scene.image).then((res) => {
                        snap.ref.child('done_scene').child('imageURL').set(res);
                    }),
                );

                uploadImagesPromises.push(
                    uploadFile('error', snap.val().error_scene.image).then((res) => {
                        snap.ref.child('error_scene').child('imageURL').set(res);
                    }),
                );

                return Promise.all(uploadImagesPromises).then(() => {
                    const data = Object.assign({}, snap.val(), {
                        publish_at: firebase.database.ServerValue.TIMESTAMP,
                    });
                    // migrar de building_playbooks to publish_playbooks
                    firebase.database().ref('publish_playbooks')
                        .child(key)
                        .set(data)
                        .then(() => {
                            const categoryKey = snap.val().category.id;
                            // eliminar todos los building_playbooks del propietario
                            snap.ref.child('publishing').set(false);
                            snap.ref.off();
                            Actions.reset('playbooks');

                            firebase.database().ref('users_categories')
                                .child(firebase.auth().currentUser.uid)
                                .child(categoryKey)
                                .once('value', (snapUserCat) => {
                                    const points = VALUE_SCENE_PUBLISHED * snap.val().numScenes;
                                    snapUserCat.ref.child('points').set(snapUserCat.val().points + points);
                                    snapUserCat.ref.child('logs').push({
                                        points,
                                        created_at: firebase.database.ServerValue.TIMESTAMP,
                                        type: 'published',
                                        playbook_key: key,
                                    });
                                });

                            firebase.database().ref('building_playbooks')
                                .orderByChild('owner_id')
                                .equalTo(firebase.auth().currentUser.uid)
                                .once('value', (snapBP) => {
                                    snapBP.forEach((snapBPChild) => {
                                        snapBPChild.ref.remove();
                                    });
                                });
                        });
                }).catch(() => {
                    Alert.alert(
                        'Error al publicar',
                        'Ha ocurrido un error al publicar',
                        [{ text: 'OK' }],
                        { cancelable: true },
                    );
                    snap.ref.child('publishing').set(false);
                });
            });
    }
    checkToPusblishPb = (key) => {
        firebase.database().ref('building_playbooks').child(key)
            .once('value', (snap) => {
                if (!snap.child('done_scene').child('finished_at').val()) {
                    Alert.alert(
                        'No existe escena final',
                        'Para publicar es necesario que tengas una escena final',
                        [{ text: 'OK' }],
                        { cancelable: true },
                    );
                } else if (!snap.child('error_scene').child('finished_at').val()) {
                    Alert.alert(
                        'No existe escena de fallo',
                        'Para publicar es necesario que tengas una escena de fallo',
                        [{ text: 'OK' }],
                        { cancelable: true },
                    );
                } else if (snap.child('numScenes').val() < 3) {
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
                            renderRightButton={() => {}}
                        >
                            <Scene
                                key="onboarding_creator"
                                component={OnboardingCreator}
                                renderLeftButton={() => (
                                    <Icon
                                        name="cross"
                                        type="entypo"
                                        style={{ marginLeft: 12 }}
                                        onPress={() => Actions.reset('playbooks')}
                                    />
                                )}
                                moreno="morena"
                            />
                            <Scene
                                key="main_creator"
                                component={Main}
                                navTransparent={false}
                                renderLeftButton={() => (
                                    <TouchableOpacity onPress={() => Actions.reset('playbooks')}>
                                        <Text style={{ marginLeft: 12 }}>Cancelar</Text>
                                    </TouchableOpacity>
                                )}
                                renderRightButton={props => (
                                    <TouchableOpacity
                                        onPress={() => this.checkToPusblishPb(props.pbKey)}
                                    >
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
                                component={Publish}
                                title="Publicar"
                                navTransparent={false}
                                renderLeftButton={() => (
                                    <TouchableOpacity onPress={() => Actions.reset('playbooks')}>
                                        <Text style={{ marginLeft: 12 }}>Cancelar</Text>
                                    </TouchableOpacity>
                                )}
                                renderRightButton={props => (
                                    <TouchableOpacity
                                        onPress={() => this.onPublishPb(props.pbKey)}
                                    >
                                        <Text style={{ marginRight: 12 }}>Publicar</Text>
                                    </TouchableOpacity>
                                )}
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
                                    this.props.clearImage();
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
