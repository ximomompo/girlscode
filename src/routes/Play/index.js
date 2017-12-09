import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import { View, Image, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import PopupDialog, { SlideAnimation, DialogButton } from 'react-native-popup-dialog';
import { Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';
import Emoji from 'react-native-emoji';
import Swiper from 'react-native-swiper';
import Chapter from './components/Chapter';
import Footer from './components/Footer';
import { yellow } from '../../helpers/colors';
import { VALUE_SCENE_PLAYED } from '../../helpers/constants';
import styles from './styles';

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chapters: [],
            indexChapter: 0,
            errorText: null,
            loaded: false,
            pointsValue: 0,
            starCount: 0,
        };
    }
    componentWillMount() {
        firebase.database().ref('publish_playbooks')
            .child(this.props.pbKey)
            .once('value', (snapPb) => {
                const chapters = [];
                const preloadImages = [];
                snapPb.child('chapters').forEach((snapChapter) => {
                    const { image } = snapChapter.val();
                    let { question } = snapChapter.val();
                    if (question) {
                        const answers = [];
                        snapChapter.child('question').child('answers').forEach((snapAnswer) => {
                            answers.push(Object.assign({}, snapAnswer.val(), {
                                key: snapAnswer.key,
                            }));
                        });
                        question = Object.assign({}, question, {
                            answers,
                        });
                    }
                    chapters.push(Object.assign({}, snapChapter.val(), {
                        key: snapChapter.key,
                        question,
                    }));
                    preloadImages.push(Image.prefetch(image));
                });

                const orderedChapters = sortBy(chapters, ['created_at']);

                snapPb.ref.child('numPlays').set(snapPb.val().numPlays + 1);

                Promise.all(preloadImages).then(() => {
                    this.setState({
                        chapters: orderedChapters,
                        category: snapPb.val().category,
                        pointsValue: orderedChapters.length * VALUE_SCENE_PLAYED,
                        loaded: true,
                    });
                });
            });

        firebase.database().ref('users_timeline')
            .child(firebase.auth().currentUser.uid)
            .child(this.props.pbKey)
            .child('status')
            .set('dirty');
    }
    onNextChapter = () => {
        const newIndex = this.state.indexChapter + 1;
        if (newIndex <= this.state.chapters.length) {
            this.swiperRef.scrollBy(1);
            this.setState({ indexChapter: newIndex });
            // El usuario ha llegado al último capítulo
            if (newIndex === this.state.chapters.length && this.props.statusPb !== 'completed') {
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
            }
        }
    }
    onShowErrorMessage = (message) => {
        this.setState({
            errorText: message,
        }, () => {
            this.popupDialogError.show();
        });
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating,
        }, () => {
            firebase.database().ref('publish_playbooks')
                .child(this.props.pbKey)
                .child('reviews')
                .child(firebase.auth().currentUser.uid)
                .set(rating)
                .then(() => {
                    firebase.database().ref('publish_playbooks')
                        .child(this.props.pbKey)
                        .once('value', (snap) => {
                            let sumRating = 0;
                            const numReviews = snap.child('reviews').numChildren();
                            snap.child('reviews').forEach((snapReview) => {
                                sumRating += snapReview.val();
                            });
                            snap.ref.child('averageRating').set(Math.round(sumRating / numReviews));
                        });
                });
        });
        setTimeout(() => {
            this.popupDialogRating.show();
        }, 600);
    }
    render() {
        if (!this.state.loaded) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
        const lastChapter = (
            <View style={styles.containerLastChapter}>
                <View style={styles.listItemLastChapter}>
                    <Emoji name="clap" />
                    <Text style={styles.textLastChapter}>
                        Has llegado al final de la historia.
                    </Text>
                </View>
                <View style={styles.listItemLastChapter}>
                    <Emoji name="tada" />
                    <Text style={styles.textLastChapter}>
                        Has conseguido {this.state.pointsValue} puntos en {this.props.categoryName}.
                    </Text>
                </View>
                <View style={styles.listItemLastChapter}>
                    <Emoji name="thought_balloon" />
                    <Text style={styles.textLastChapter}>
                        Deja una valoración de esta historia
                    </Text>
                </View>
                <View style={styles.containerRating}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={this.state.starCount}
                        selectedStar={rating => this.onStarRatingPress(rating)}
                        starColor={yellow}
                        starSize={32}
                    />
                </View>
                <TouchableOpacity
                    style={styles.containerLinkLastChapter}
                    onPress={() => Actions.reset('playbooks')}
                >
                    <Text
                        style={styles.textLinkLastChapter}
                    >
                        Ver más historias
                    </Text>
                </TouchableOpacity>
            </View>
        );
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.containerIconClose}
                    onPress={() => Actions.reset('playbooks')}
                >
                    <Icon
                        name="close"
                        type="evilicons"
                        color="white"
                        iconStyle={{ fontSize: 24 }}
                    />
                </TouchableOpacity>
                <Swiper
                    style={styles.wrapper}
                    loop={false}
                    scrollEnabled={false}
                    showsPagination={false}
                    index={0}
                    ref={(ref) => { this.swiperRef = ref; }}
                >
                    {this.state.chapters.map((chapter, index) => (
                        <Chapter
                            {...chapter}
                            style={{ flex: 1, paddingBottom: 64 }}
                            number={index + 1}
                            onShowErrorMessage={this.onShowErrorMessage}
                            onNextChapter={this.onNextChapter}
                            lastChapter={(this.state.chapters.length === index + 1) ? lastChapter : undefined}
                        />
                    ))}
                </Swiper>
                <Footer
                    title={this.props.title}
                    currentChapter={this.state.indexChapter + 1}
                    totalChapters={this.state.chapters.length}
                    owner={this.props.owner}
                />
                <PopupDialog
                    width={0.7}
                    height={200}
                    ref={(popupDialog) => { this.popupDialogRating = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    onDismissed={() => Actions.reset('playbooks')}
                    actions={[
                        <DialogButton
                            text="Ver más historias"
                            onPress={() => this.popupDialogRating.dismiss()}
                            key="done"
                            textStyle={styles.buttonPopup}
                        />,
                    ]}
                >
                    <View style={styles.containerPopup}>
                        <Text style={styles.emojiPopup}>
                            <Emoji name="smiley" />
                        </Text>
                        <Text style={styles.textPopup}>
                            ¡Gracias por tu valoración!
                        </Text>
                    </View>
                </PopupDialog>
                <PopupDialog
                    width={0.8}
                    height={300}
                    ref={(popupDialog) => { this.popupDialogError = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    onDismissed={() => Actions.reset('playbooks')}
                    actions={[
                        <DialogButton
                            text="Volver a comenzar"
                            onPress={() => this.popupDialogRating.dismiss()}
                            key="done"
                            textStyle={styles.buttonPopup}
                        />,
                    ]}
                >
                    <View style={styles.containerPopup}>
                        <Text style={styles.emojiPopup}>
                            <Emoji name="sweat" />
                        </Text>
                        <Text style={styles.textH1Popup}>
                            No es la mejor opción
                        </Text>
                        <Text style={styles.textPopup}>
                            {this.state.errorText}
                        </Text>
                    </View>
                </PopupDialog>
            </View>
        );
    }
}

Play.propTypes = {
    pbKey: PropTypes.string.isRequired,
    statusPb: PropTypes.string.isRequired,
    owner: PropTypes.shape({
        photoURL: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
};

export default Play;
