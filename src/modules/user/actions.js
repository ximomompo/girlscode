import firebase from 'react-native-firebase';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
// import * as types from './types';
import * as reqStatusActions from '../requestStatus/actions';
import { PHOTO_DEFAULT } from '../../helpers/constants';

function createUser(id, data) {
    return firebase.database().ref('users').child(id).set(data);
}

export function authByFB() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
        .then((result) => {
            if (result.isCancelled) {
                Alert.alert(
                    'Cancelado',
                    'El inicio de sesión a través de Facebook ha sido cancelado',
                    [{ text: 'OK' }],
                    { cancelable: true },
                );
            } else {
                AccessToken.getCurrentAccessToken()
                    .then((data) => {
                        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
                        firebase.auth().signInWithCredential(credential)
                            .then((response) => {
                                console.log('signInWithCredentialThen', response);
                            }, (err) => {
                                // Promise was rejected
                                console.log('signInWithCredentialErr', err);
                            });
                    }, (error) => {
                        Alert.alert(
                            'Ha ocurrido un error',
                            error,
                            [{ text: 'OK' }],
                            { cancelable: true },
                        );
                    });
            }
        }, (error) => {
            Alert.alert(
                'Ha ocurrido un error',
                error,
                [{ text: 'OK' }],
                { cancelable: true },
            );
        });
}

export function register(email, password, username) {
    return (dispatch) => {
        const domain = 'register';
        dispatch(reqStatusActions.setLoading(domain));
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((_user) => {
                const dataUser = {
                    displayName: username,
                    username,
                    email,
                    photoURL: PHOTO_DEFAULT,
                };

                _user.updateProfile({
                    displayName: username,
                    photoURL: PHOTO_DEFAULT,
                });

                return createUser(_user.uid, dataUser).then(() => {
                    Actions.replace('playbooks_list');
                });
            })
            .catch((error) => {
                Alert.alert(
                    'Error al registrarse',
                    error,
                    [{ text: 'OK' }],
                    { cancelable: true },
                );
                dispatch(reqStatusActions.setError(error, domain));
            });
    };
}

export function login(email, password) {
    return (dispatch) => {
        const domain = 'login';
        dispatch(reqStatusActions.setLoading(domain));
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
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
