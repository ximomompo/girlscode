import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { Text, Button, MainView } from '../../../components/Commons';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    text: {
        marginBottom: 24,
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Roboto-Black',
        fontSize: 28,
        marginTop: 8,
        marginBottom: 8,
    },
    aux: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 8,
        marginBottom: 8,
    },
    button: {
        marginTop: 8,
        marginBottom: 8,
    },
});

class Create extends Component {
    onLogout = () => {
        firebase.auth().signOut().then(() => Actions.replace('index'));
    }
    render() {
        return (
            <MainView style={styles.container}>
                <Button
                    title="Abrir galería"
                    onPress={() => Actions.creator_make()}
                    fullWidth
                />
            </MainView>
        );
    }
}

export default Create;
