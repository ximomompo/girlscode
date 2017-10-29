import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import Scene from './Scene';
import styles from './styles';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playbook: {},
        };
    }
    componentWillMount() {
        firebase.database().ref('building_playbooks').child(this.props.pbKey)
            .once('value', (snap) => {
                this.setState({ playbook: snap.val() });
            });
    }
    newScene = () => {
        const data = {
            image: false,
            text: 'Escribe aquí...',
            question: 'Escribe aquí tu pregunta',
            answers: false,
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
        const sceneKey = firebase.database().ref('building_playbooks')
            .child(this.props.pbKey)
            .child('scenes')
            .push(data).key;
        Actions.make_scene({
            sceneKey,
            pbKey: this.props.pbKey,
        });
    }
    openScene = () => {
        this.newScene();
    }
    renderScenes = () => {
        if (this.state.playbook.scenes) {
            return Object.keys(this.state.playbook.scenes)
                .map(sceneKey => (
                    <Scene
                        key={sceneKey}
                        onPress={() => Actions.make_scene({ sceneKey, pbKey: this.props.pbKey })}
                    />
                ));
        }
        return null;
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableHighlight onPress={() => Actions.make_scene()}>
                    <View style={[styles.sceneBasic, styles.sceneSizeSm]} />
                </TouchableHighlight>
                <View style={styles.middleWay}>
                    {this.renderScenes()}
                    <Scene onPress={() => this.newScene()} />
                </View>
                <TouchableHighlight onPress={() => Actions.make_scene()}>
                    <View style={[styles.sceneBasic, styles.sceneSizeSm]} />
                </TouchableHighlight>
            </ScrollView>
        );
    }
}

Main.propsTypes = {
    pbKey: PropTypes.string.isRequired,
};

export default Main;
