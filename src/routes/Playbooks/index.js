import React, { Component } from 'react';
import { FlatList } from 'react-native';
import firebase from 'react-native-firebase';
import { MainView } from '../../components/Commons';
import Playbook from './components/Playbook';

class Playbooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
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
    renderCards = () => (
        this.state.cards.map(card => (
            <Playbook key={card.key} {...card} />
        ))
    )
    render() {
        return (
            <MainView style={{ justifyContent: 'flex-start' }}>
                <FlatList
                    style={{ width: '100%' }}
                    data={this.state.cards}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <Playbook pbKey={item.key} {...item} />
                    )}
                />
            </MainView>
        );
    }
}

export default Playbooks;
