import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import { View, Image, Text, FlatList, TouchableHighlight } from 'react-native';
import firebase from 'react-native-firebase';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';
import Answer from './components/Answer';
import { yellow } from '../../helpers/colors';
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
            indexScene: 0,
            content: 'text',
            currentScene: null,
            answers: [],
            lastScene: false,
            images: [],
            loadImages: false,
            category: {},
            pointsValue: 0,
            starCount: 0,
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
                    if (snapScenes.val().errorScene) {
                        const imageErrorURL = snapScenes.val().errorScene.imageURL;
                        preloadImages.push(Image.prefetch(imageErrorURL));
                        images.push(imageErrorURL);
                    }
                    preloadImages.push(Image.prefetch(imageURL));
                    images.push(imageURL);
                    scenes.push(snapScenes.val());
                });

                const orderedScenes = _.sortBy(scenes, ['finished_at']);
                this.setState({
                    scenes: orderedScenes,
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
        this.setState({
            indexScene,
            currentScene: this.state.scenes[indexScene],
            content: 'text',
            lastScene: (this.state.scenes[indexScene].finalScene) ? 'done' : null,
        });
    }
    onRespondAnswer = (correct) => {
        if (correct) {
            this.onNextScreen();
        } else {
            this.setState({
                currentScene: this.state.scenes[this.state.indexScene].errorScene,
                content: 'text',
                lastScene: 'error',
            });
        }
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating,
        });
        // firebase.database().ref('publish_playbooks');
        Actions.reset('playbooks');
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
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.starCount}
                            selectedStar={rating => this.onStarRatingPress(rating)}
                            starColor={yellow}
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
