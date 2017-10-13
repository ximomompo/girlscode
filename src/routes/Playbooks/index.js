import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

class Playbooks extends Component {
    onLogout = () => {
        firebase.auth().signOut().then(() => Actions.replace('index'));
    }
    render() {
        return (
            <View>
                <Text>
                    Playbooks
                </Text>
                <Icon name="rowing" />
                <Button
                    icon={{ name: 'home', size: 32 }}
                    buttonStyle={{ backgroundColor: 'red' }}
                    title="Cerrar sesión"
                    onPress={() => this.onLogout()}
                />
            </View>
        );
    }
}

export default Playbooks;
