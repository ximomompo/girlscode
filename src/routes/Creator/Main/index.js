import React, { Component } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import update from 'react-addons-update';
import PlaybookItem from './components/PlaybookItem';
import { Text, Button, MainView } from '../../../components/Commons';
import styles from './styles';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playbooks: [],
        };
    }
    componentWillMount() {
        firebase.database().ref('building_playbooks')
            .child(firebase.auth().currentUser.uid)
            .orderByChild('created_at')
            .once('value', (snap) => {
                const playbooks = [];
                snap.forEach((snapChild) => {
                    if (!snapChild.hasChild('published_at')) {
                        playbooks.push(Object.assign({}, snapChild.val(), {
                            key: snapChild.key,
                        }));
                    }
                });
                this.setState({ playbooks: playbooks.reverse() });
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
        const ref = firebase.database().ref('building_playbooks').child(firebase.auth().currentUser.uid);
        const key = await ref.push(data).key;
        await ref.child(key).child('chapters').push(dataChapter);
        Actions.main_creator({ pbKey: key });
    }
    removePlaybook = (pbKey) => {
        Alert.alert(
            'Borrar Playbook',
            '¿Estas seguro de eliminar este playbook?',
            [
                {
                    text: 'Eliminar',
                    onPress: () => {
                        const index = this.state.playbooks
                            .findIndex(playbook => playbook.key === pbKey);
                        this.setState({
                            playbooks: update(this.state.playbooks, { $splice: [[index, 1]] }),
                        }, () => {
                            firebase.database().ref('building_playbooks')
                                .child(firebase.auth().currentUser.uid)
                                .child(pbKey)
                                .remove();
                        });
                    },
                },
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }
    renderFlatList = () => {
        if (this.state.playbooks.length === 0) return null;
        return (
            <View style={{ maxHeight: 192, height: this.state.playbooks.length * 64 }}>
                <FlatList
                    style={styles.flatList}
                    data={this.state.playbooks}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <PlaybookItem
                            pbKey={item.key}
                            removePlaybook={this.removePlaybook}
                            {...item}
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </View>
        );
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
                {this.renderFlatList()}
                <Button
                    title="Crear nuevo playbook"
                    onPress={() => this.newPlaybook()}
                    fullWidth
                    style={styles.button}
                />
            </MainView>
        );
    }
}

export default Create;
