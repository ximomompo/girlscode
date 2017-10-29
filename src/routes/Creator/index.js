import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { Text, Button, MainView } from '../../components/Commons';

const schemeScene = {
    image: false,
    text: 'Escribe aquí...',
    created_at: firebase.database.ServerValue.TIMESTAMP,
    position: {
        left: 0,
        top: 0,
        transform: {
            rotate: '0deg',
            scale: 1,
        },
    },
};

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
    constructor(props) {
        super(props);
        this.state = {
            lastPlaybookKey: false,
        };
    }
    componentWillMount() {
        firebase.database().ref('building_playbooks')
            .orderByChild('owner_id')
            .equalTo(firebase.auth().currentUser.uid)
            .limitToLast(1)
            .once('value', (snap) => {
                snap.forEach((snapChild) => {
                    this.setState({ lastPlaybookKey: snapChild.key });
                });
            });
    }
    newPlaybook = () => {
        const data = {
            owner_id: firebase.auth().currentUser.uid,
            created_at: firebase.database.ServerValue.TIMESTAMP,
            error_scene: Object.assign({}, schemeScene),
            done_scene: Object.assign({}, schemeScene),
        };
        const key = firebase.database().ref('building_playbooks').push(data).key;
        Actions.main_creator({ pbKey: key });
    }
    renderLoadLastPlaybook = () => {
        if (this.state.lastPlaybookKey) {
            return (
                <Button
                    title="Último Playbook"
                    onPress={() => Actions.main_creator({ pbKey: this.state.lastPlaybookKey })}
                    fullWidth
                    style={styles.button}
                />
            );
        }
        return null;
    }
    render() {
        return (
            <MainView style={styles.container}>
                <View style={styles.text}>
                    <Text style={styles.title}>Lorem Ipsum</Text>
                    <Text style={styles.aux}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Text>
                </View>
                <Button
                    title="Empezar"
                    onPress={() => this.newPlaybook()}
                    fullWidth
                    style={styles.button}
                />
                {this.renderLoadLastPlaybook()}
            </MainView>
        );
    }
}

export default Create;
