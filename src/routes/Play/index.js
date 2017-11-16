import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import { View, Image, Text, FlatList, TouchableHighlight } from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import Answer from './components/Answer';
import IconAbsolute from '../Creator/MakeScene/Layouts/components/IconAbsolute';
import styles from './styles';


const defaultStylesText = {
    left: 0,
    top: 0,
    color: '#FFFFFF',
    transform: [
        { rotate: '0deg' },
        { scale: 1 },
    ],
};

class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scenes: [],
            doneScene: null,
            errorScene: null,
            indexScene: 0,
            content: 'text',
            currentScene: null,
            answers: [],
            lastScene: false,
            images: [],
            loadImages: false,
        };
    }
    componentWillMount() {
        firebase.database().ref('publish_playbooks')
            .child(this.props.pbKey)
            .once('value', (snapPb) => {
                const scenes = [];
                const images = [];
                const preloadImages = [];
                snapPb.child('scenes').forEach((snapScenes) => {
                    const imageURL = snapScenes.val().imageURL;
                    preloadImages.push(Image.prefetch(imageURL));
                    images.push(imageURL);
                    scenes.push(snapScenes.val());
                });
                preloadImages.push(Image.prefetch(snapPb.val().done_scene.imageURL));
                images.push(snapPb.val().done_scene.imageURL);

                preloadImages.push(Image.prefetch(snapPb.val().error_scene.imageURL));
                images.push(snapPb.val().error_scene.imageURL);

                const orderedScenes = _.sortBy(scenes, ['finished_at']);
                this.setState({
                    scenes: orderedScenes,
                    doneScene: snapPb.val().done_scene,
                    errorScene: snapPb.val().error_scene,
                    currentScene: orderedScenes[0],
                    images,
                });

                Promise.all(preloadImages).then(() => {
                    this.setState({ loadImages: true });
                })
            });
    }
    onNextScreen = () => {
        const indexScene = this.state.indexScene + 1;
        if (indexScene >= this.state.scenes.length) {
            this.setState({
                indexScene,
                currentScene: this.state.doneScene,
                content: 'text',
                lastScene: 'done',
            });
        } else {
            this.setState({
                indexScene,
                currentScene: this.state.scenes[indexScene],
                content: 'text',
            });
        }
    }
    onRespondAnswer = (correct) => {
        if (correct) {
            this.onNextScreen();
        } else {
            this.setState({
                currentScene: this.state.errorScene,
                content: 'text',
                lastScene: 'error',
            });
        }
    }
    onDone = () => {
        if (this.state.lastScene === 'done') {

        }
        if (this.state.lastScene === 'error') {
            
        }
        Actions.reset('playbooks');
    }
    setCurrentScene = (scene) => {
        this.setState({ currentScene: scene });
    }
    formatedStyles = (stylesScene) => {
        if (!stylesScene) return defaultStylesText;
        const dataStyles = {
            left: stylesScene.left || defaultStylesText.left,
            top: stylesScene.top || defaultStylesText.top,
            color: stylesScene.color || defaultStylesText.color,
        };
        if (!stylesScene.transform) {
            return Object.assign({}, dataStyles, {
                transform: [
                    { rotate: '0deg' },
                    { scale: 1 },
                ],
            });
        }
        return Object.assign({}, dataStyles, {
            transform: [
                { rotate: stylesScene.transform.rotate },
                { scale: stylesScene.transform.scale },
            ],
        });
    }
    formatedAnswers = answers => (
        Object.keys(answers).map(key => (
            Object.assign({}, answers[key], {
                id: key,
            })
        ))
    )
    renderContent = () => {
        const { currentScene } = this.state;
        switch (this.state.content) {
        case 'text':
            return (
                <TouchableHighlight
                    style={styles.containerText}
                    onPress={() => {
                        if (this.state.lastScene) {
                            this.onDone();
                        } else {
                            this.setState({ content: 'form' });
                        }
                    }}
                >
                    <Text style={[
                        styles.textDefault,
                        this.formatedStyles(currentScene.styles),
                        { paddingTop: 44 },
                    ]}
                    >
                        {currentScene.text}
                    </Text>
                </TouchableHighlight>
            );
        case 'form':
            return (
                <View
                    style={{
                        padding: 20,
                        paddingTop: 80,
                        width: '100%',
                    }}
                >
                    <Text style={[styles.textDefault, styles.textInputQuestion]}>
                        {currentScene.question}
                    </Text>
                    <FlatList
                        data={this.formatedAnswers(currentScene.answers)}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Answer {...item} callback={this.onRespondAnswer} />
                        )}
                    />
                </View>
            );
        default:
            return null;
        }
    }
    renderImages = () => (
        this.state.images.map(image => (
            <Image
                key={image}
                style={{ display: 'none' }}
                source={{
                    uri: image,
                    cache: 'force-cache',
                }}
            />
        ))
    );
    render() {
        if (this.state.scenes.length === 0 || !this.state.loadImages) return null;
        return (
            <View style={styles.container}>
                <IconAbsolute
                    position="TopLeft"
                    onPress={() => Actions.reset('playbooks')}
                >
                    <Icon
                        name="cross"
                        type="entypo"
                        color="white"
                        iconStyle={{ fontSize: 32 }}
                    />
                </IconAbsolute>
                {this.renderContent()}
                {this.renderImages()}
                <Image
                    style={styles.imageBackground}
                    source={{
                        uri: this.state.currentScene.imageURL,
                        cache: 'force-cache',
                    }}
                />
            </View>
        );
    }
}

export default Play;
