import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { Text, Button, MainView } from '../../components/Commons';

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
    newPlaybook = () => {
        const data = {
            owner_id: firebase.auth().currentUser.uid,
            created_at: firebase.database.ServerValue.TIMESTAMP,
        };
        const key = firebase.database().ref('building_playbooks').push(data).key;
        Actions.main_creator({ pbKey: key });
    }
    render() {
        return (
            <MainView style={styles.container}>
                <View style={styles.text}>
                    <Text style={styles.title}>Lorem Ipsum</Text>
                    <Text style={styles.aux}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                </View>
                <Button
                    title="Empezar"
                    onPress={() => this.newPlaybook()}
                    fullWidth
                    style={styles.button}
                />
            </MainView>
        );
    }
}

export default Create;
