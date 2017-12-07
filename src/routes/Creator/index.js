import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { Text, Button, MainView } from '../../components/Commons';

const schemeScene = {
    created_at: firebase.database.ServerValue.TIMESTAMP,
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
                    if (!snapChild.val().finished_at) {
                        this.setState({ lastPlaybookKey: snapChild.key });
                    }
                });
            });
    }
    newPlaybook = async () => {
        const data = {
            owner_id: firebase.auth().currentUser.uid,
            created_at: firebase.database.ServerValue.TIMESTAMP,
        };
        const dataChapter = {
            number: 1,
            created_at: firebase.database.ServerValue.TIMESTAMP,
        };
        const key = await firebase.database().ref('building_playbooks').push(data).key;
        await firebase.database().ref('building_playbooks')
            .child(key)
            .child('chapters')
            .push(dataChapter);
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
                    <Text style={styles.title}>Empezar a crear playbook</Text>
                    <Text style={styles.aux}>
                        Bienvenid@ al creador de Playbooks de CodigoNiña
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
