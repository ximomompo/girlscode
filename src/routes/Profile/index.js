import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { Button } from '../../components/Commons';

class Profile extends Component {
    onLogout = () => {
        firebase.auth().signOut().then(() => Actions.replace('index'));
    }
    render() {
        return (
            <View>
                <Text>
                    Profile
                </Text>
                <Button
                    title="CERRAR SESIÓN"
                    onPress={() => this.onLogout()}
                    fullWidth
                />
            </View>
        );
    }
}

export default Profile;
