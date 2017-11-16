import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import { View, Dimensions, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import Scene from './Scene';
import styles from './styles';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publishScenes: [],
            doneScene: {},
            errorScene: {},
        };
    }
    componentWillMount() {
        firebase.database().ref('building_playbooks').child(this.props.pbKey)
            .child('scenes')
            .once('value', (snap) => {
                const publishScenes = [];
                snap.forEach((scene) => {
                    if (scene.val().finished_at) {
                        publishScenes.push({
                            id: scene.key,
                            ...scene.val(),
                        });
                    }
                });
                this.setState({ publishScenes });
            });

        firebase.database().ref('building_playbooks').child(this.props.pbKey)
            .child('done_scene')
            .once('value', (snap) => {
                this.setState({ doneScene: snap.val() });
            });

        firebase.database().ref('building_playbooks').child(this.props.pbKey)
            .child('error_scene')
            .once('value', (snap) => {
                this.setState({ errorScene: snap.val() });
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
            styles: {
                color: '#FFFFFF',
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
                        scene={this.state.publishScenes[sceneKey]}
                    />
                ));
        }
        return null;
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
                >
                    <Scene
                        size="sm"
                        onPress={() => this.openErrorScene()}
                        scene={this.state.errorScene}
                    />
                    <Scene
                        size="sm"
                        onPress={() => this.openDoneScene()}
                        scene={this.state.doneScene}
                    />
                </View>
                <Carousel
                    ref={(c) => { this.carousel = c; }}
                    data={this.state.publishScenes}
                    renderItem={({ item }) => (
                        <Scene
                            key={item.id}
                            onPress={() => this.openScene(item.id)}
                            scene={item}
                        />
                    )}
                    sliderWidth={Dimensions.get('window').width}
                    sliderHeight={Dimensions.get('window').height}
                    itemWidth={160}
                    itemHeight={264}
                    firstItem={this.state.publishScenes.length - 1}
                />
                <TouchableHighlight
                    style={styles.bottomContainer}
                    onPress={() => this.newScene()}
                >
                    <Text style={styles.bottomText}>Nueva escena</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

Main.propsTypes = {
    pbKey: PropTypes.string.isRequired,
};

export default Main;

// <Scene onPress={() => this.newScene()} />
/**
<View style={styles.container}>

    {(this.state.publishScenes.length > 0)
        ? (
            <Carousel
                ref={(c) => { this.carousel = c; }}
                data={this.state.publishScenes}
                renderItem={({ item }) => (
                    <Scene
                        key={item.id}
                        onPress={() => this.openScene(item.id)}
                        scene={item}
                    />
                )}
                sliderWidth={500}
                itemWidth={200}
            />
        ) : null
    }

</View>
<Scene
    key={item.id}
    onPress={() => this.openScene(item.id)}
    scene={item}
/>
*/
