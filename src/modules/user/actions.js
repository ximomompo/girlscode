import firebase from 'react-native-firebase';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
// import * as types from './types';
import * as reqStatusActions from '../requestStatus/actions';
import { PHOTO_DEFAULT } from '../../helpers/constants';

const createUser = async (id, data) => {
    await firebase.database().ref('users').child(id).update(data);
    await firebase.database().ref('users_categories').child(id).once('value', (snapUC) => {
        if (!snapUC.exists()) {
            firebase.database().ref('categories').once('value', (snapCat) => {
                snapCat.forEach((snapCatChild) => {
                    const dataCat = Object.assign({}, snapCatChild.val(), {
                        points: 0,
                    });
                    snapUC.ref.child(snapCatChild.key).set(dataCat);
                });
            });
        }
    });
    const playbooks = await firebase.database().ref('timeline_template').once('value');
    return firebase.database().ref('users_timeline').child(id).once('value', (snapUT) => {
        if (!snapUT.exists()) {
            snapUT.ref.set(playbooks);
        }
    });
};

function launchError(title, message, domain, dispatch) {
    Alert.alert(
        title,
        message,
        [{ text: 'OK' }],
        { cancelable: true },
    );
    dispatch(reqStatusActions.setError(message, domain));
}

export function authByFB() {
    return (dispatch) => {
        const domain = 'authByFB';
        return LoginManager.logInWithReadPermissions(['public_profile', 'email'])
            .then((result) => {
                if (result.isCancelled) {
                    launchError(
                        'Cancelado',
                        'El inicio de sesión a través de Facebook ha sido cancelado',
                        domain,
                        dispatch,
                    );
                } else {
                    dispatch(reqStatusActions.setLoading(domain));
                    AccessToken.getCurrentAccessToken()
                        .then((data) => {
                            const credential = firebase.auth.FacebookAuthProvider
                                .credential(data.accessToken);

                            firebase.auth().signInWithCredential(credential)
                                .then((_user) => {
                                    _user.updateProfile({
                                        email: _user.providerData.email,
                                    });
                                    return createUser(_user.uid, _user.providerData[0]).then(() => {
                                        dispatch(reqStatusActions.setReset(domain));
                                        Actions.replace('playbooks_list');
                                    });
                                }, (err) => {
                                    launchError('Ha ocurrido un error', err, domain, dispatch);
                                });
                        }, (error) => {
                            launchError('Ha ocurrido un error', error, domain, dispatch);
                        });
                }
            }, (error) => {
                launchError('Ha ocurrido un error', error, domain, dispatch);
            });
    };
}

export function register(email, password, username) {
    return (dispatch) => {
        const domain = 'register';
        dispatch(reqStatusActions.setLoading(domain));
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((_user) => {
                const dataUser = {
                    displayName: username,
                    email,
                    photoURL: PHOTO_DEFAULT,
                };

                return _user.updateProfile({
                    displayName: username,
                    photoURL: PHOTO_DEFAULT,
                }).then(() => {
                    createUser(_user.uid, dataUser).then(() => {
                        dispatch(reqStatusActions.setReset(domain));
                        Actions.reset('playbooks');
                    });
                });
            })
            .catch((error) => {
                console.log('errorMoreno', error.message);
                Alert.alert(
                    'Error al registrarse',
                    error.message,
                    [{ text: 'OK' }],
                    { cancelable: true },
                );
                dispatch(reqStatusActions.setError(error.message, domain));
            });
    };
}

export function login(email, password) {
    return (dispatch) => {
        const domain = 'login';
        dispatch(reqStatusActions.setLoading(domain));
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                dispatch(reqStatusActions.setReset(domain));
                Actions.replace('playbooks_list');
            })
            .catch((error) => {
                Alert.alert(
                    'Error al acceder',
                    error.message,
                    [{ text: 'OK' }],
                    { cancelable: true },
                );
                dispatch(reqStatusActions.setError(error, domain));
            });
    };
}
