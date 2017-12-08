import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import firebase from 'react-native-firebase';
import Playbook from './components/Playbook';
import styles from './styles';

class Playbooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            visible: true,
        };
    }
    componentWillMount() {
        firebase.database().ref('users_timeline')
            .child(firebase.auth().currentUser.uid)
            .once('value', (snap) => {
                const cards = [];
                snap.forEach((snapCard) => {
                    cards.push(snapCard.val());
                });
                this.setState({ cards });
            });
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <FlatList
                    style={{ width: '100%' }}
                    data={this.state.cards}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <Playbook pbKey={item.key} {...item} />
                    )}
                />
            </View>
        );
    }
}

export default Playbooks;
