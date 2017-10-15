import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { Text, MainView, Button } from '../../components/Commons';

class Playbooks extends Component {
    onLogout = () => {
        firebase.auth().signOut().then(() => Actions.replace('index'));
    }
    render() {
        return (
            <MainView>
                <Button
                    title="Abrir galería"
                    onPress={() => Actions.gallery()}
                    fullWidth
                />
            </MainView>
        );
    }
}

export default Playbooks;
