import React, { Component } from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { Button, MainView } from '../../components/Commons';
import * as colors from '../../helpers/colors';
import * as fonts from '../../helpers/fonts';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    name: {
        fontFamily: fonts.bold,
        fontSize: 20,
    },
    email: {
        fontFamily: fonts.regular,
        color: colors.gray,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: colors.gray,
        margin: 20,
    },
});

class Profile extends Component {
    onLogout = () => {
        Actions.reset('auth');
        firebase.auth().signOut();
    }
    render() {
        return (
            <MainView style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: firebase.auth().currentUser.photoURL }}
                />
                <Text style={styles.name}>{firebase.auth().currentUser.displayName}</Text>
                <Text style={styles.email}>{firebase.auth().currentUser.email}</Text>
                <Button
                    title="CERRAR SESIÓN"
                    onPress={() => this.onLogout()}
                    fullWidth
                />
            </MainView>
        );
    }
}

export default Profile;
