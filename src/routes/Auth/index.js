import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SVGImage from 'react-native-svg-image';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { MainView, Button } from '../../components/Commons';
import { LOGO } from '../../helpers/constants';


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    image: {
        alignItems: 'center',
        marginTop: 64,
        flex: 1,
        width: 200,
        height: 200,
    },
    actions: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        width: '100%',
    },
});


class AuthMain extends Component {
    loginByFb = () => {
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
    render() {
        return (
            <MainView style={styles.container}>
                <SVGImage
                    style={styles.image}
                    scrollEnabled={false}
                    source={{ uri: LOGO }}
                />
                <View style={styles.actions}>
                    <Button
                        color="FB"
                        title="Acceder con Facebook"
                        onPress={() => this.loginByFb()}
                        fullWidth
                        icon={{ name: 'facebook', type: 'entypo' }}
                    />
                    <Button
                        title="Acceder por email"
                        onPress={() => Actions.login()}
                        fullWidth
                    />
                    <Button
                        title="Regístrate"
                        onPress={() => Actions.register()}
                        fullWidth
                    />
                </View>
            </MainView>
        );
    }
}


export default AuthMain;
