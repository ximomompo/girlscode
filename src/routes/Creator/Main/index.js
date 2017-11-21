import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import { Icon } from 'react-native-elements';
import { View, Dimensions, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import * as colors from '../../../helpers/colors';
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
    renderCarousel = () => {
        if (this.state.publishScenes.length === 0) {
            return (
                <View style={{ width: '100%', flex: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => this.newScene()}
                        style={[styles.sceneBasic, styles.sceneSize_md, styles.defaultScene]}
                    >
                        <Icon
                            name="picture-o"
                            type="font-awesome"
                            color={colors.gray1}
                            style={styles.iconDefaultScene}
                            iconStyle={{ fontSize: 64 }}
                        />
                        <Text style={styles.textDefaultScene}>Añadir primera escena</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
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
        );
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
                        color={colors.red}
                        textDefault="Escena fallo"
                        icon="times"
                    />
                    <Scene
                        size="sm"
                        onPress={() => this.openDoneScene()}
                        scene={this.state.doneScene}
                        color={colors.green}
                        textDefault="Escena final"
                        icon="check"
                    />
                </View>
                {this.renderCarousel()}
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
