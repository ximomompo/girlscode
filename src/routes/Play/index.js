import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import { View, Image, Text, FlatList, TouchableHighlight } from 'react-native';
import firebase from 'react-native-firebase';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
import { Button } from '../../components/Commons';
import Answer from './components/Answer';
import { VALUE_SCENE_PLAYED } from '../../helpers/constants';
import IconAbsolute from '../Creator/MakeScene/Layouts/components/IconAbsolute';
import styles from './styles';

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

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
            category: {},
            pointsValue: 0,
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
                    category: snapPb.val().category,
                    currentScene: orderedScenes[0],
                    pointsValue: snapPb.val().numScenes * VALUE_SCENE_PLAYED,
                    images,
                });

                snapPb.ref.child('numPlays').set(snapPb.val().numPlays + 1);

                Promise.all(preloadImages).then(() => {
                    this.setState({ loadImages: true });
                });
            });

        firebase.database().ref('users_timeline')
            .child(firebase.auth().currentUser.uid)
            .child(this.props.pbKey)
            .child('status')
            .set('dirty');
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
            if (this.props.statusPb !== 'completed') {
                firebase.database().ref('users_timeline')
                    .child(firebase.auth().currentUser.uid)
                    .child(this.props.pbKey)
                    .child('status')
                    .set('completed');

                firebase.database().ref('users_categories')
                    .child(firebase.auth().currentUser.uid)
                    .child(this.state.category.id)
                    .child('logs')
                    .push({
                        points: this.state.pointsValue,
                        created_at: firebase.database.ServerValue.TIMESTAMP,
                        type: 'played',
                        playbook_key: this.props.pbKey,
                    });
                this.popupDialog.show();
            } else {
                Actions.reset('playbooks');
            }
        }
        if (this.state.lastScene === 'error') {
            Actions.reset('playbooks');
        }
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
                { scale: stylesScene.transform.scale * 0.95 },
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
        if (this.state.scenes.length === 0 || !this.state.loadImages) {
            return (
                <Spinner
                    visible
                    textContent="Cargando..."
                    textStyle={{ color: '#FFF' }}
                />
            );
        }
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
                <PopupDialog
                    width={0.7}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                >
                    <View style={{ padding: 20, width: '100%', height: '100%', flex: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ width: 80, height: 80 }}
                            source={{ uri: this.state.category.icon }}
                        />
                        <Text>¡Has finalizado este playbook!</Text>
                        <Text style={styles.points}>+{this.state.pointsValue} ptos</Text>
                        <Text style={styles.pointsAux}>en Derecho sexuales</Text>
                        <Button
                            style={{ marginTop: 16 }}
                            title="OK!"
                            onPress={() => Actions.reset('playbooks')}
                            fullWidth
                        />
                    </View>
                </PopupDialog>
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
