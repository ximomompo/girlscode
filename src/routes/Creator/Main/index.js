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
            publishScenes: null,
        };
    }
    componentWillMount() {
        firebase.database().ref('building_playbooks').child(this.props.pbKey)
            .child('scenes')
            .orderByChild('finished_at')
            .startAt(1)
            .once('value', (snap) => {
                this.setState({ publishScenes: snap.val() });
            });
    }
    openErrorScene = () => {
        Actions.make_scene({
            sceneRef: `building_playbooks/${this.props.pbKey}/error_scene`,
            pbKey: this.props.pbKey,
            specialScene: true,
        });
    }
    openScene = (sceneKey) => {
        Actions.make_scene({
            sceneRef: `building_playbooks/${this.props.pbKey}/scenes/${sceneKey}`,
            pbKey: this.props.pbKey,
        });
    }
    openDoneScene = () => {
        Actions.make_scene({
            sceneRef: `building_playbooks/${this.props.pbKey}/done_scene`,
            pbKey: this.props.pbKey,
            specialScene: true,
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

        this.openScene(sceneKey);
    }
    renderScenes = () => {
        if (this.state.publishScenes) {
            return Object.keys(this.state.publishScenes)
                .map(sceneKey => (
                    <Scene
                        key={sceneKey}
                        onPress={() => this.openScene(sceneKey)}
                    />
                ));
        }
        return null;
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableHighlight onPress={() => this.openErrorScene()}>
                    <View style={[styles.sceneBasic, styles.sceneSizeSm]} />
                </TouchableHighlight>
                <View style={styles.middleWay}>
                    {this.renderScenes()}
                    <Scene onPress={() => this.newScene()} />
                </View>
                <TouchableHighlight onPress={() => this.openDoneScene()}>
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
