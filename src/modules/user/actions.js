import firebase from 'react-native-firebase';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as types from './types';
import * as reqStatusActions from '../requestStatus/actions';
import { PHOTO_DEFAULT } from '../../helpers/constants';

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

                return firebase.database().ref('users').child(_user.uid).set(dataUser)
                    .then(() => {
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

export function login(params) {
    return (dispatch) => {
        const domain = 'quests';
        const path = '/entity/quests';
        const request = axios.get(path, { params });
        dispatch(reqStatusActions.setLoading(domain));
        return request.then((res) => {
            dispatch({
                type: types.FETCH_QUESTS,
                payload: res.data,
            });
            dispatch(reqStatusActions.setSuccess(res, domain));
        }).catch((error) => {
            logException(error);
            const dataError = (error.response) ? error.response.data : error;
            dispatch(reqStatusActions.setError(dataError, domain));
        });
    };
}
