import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import { sortBy } from 'lodash';
import {
    View,
    TextInput,
    Animated,
    ActivityIndicator,
    Image,
    Alert,
    Text,
    FlatList,
} from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import PopupDialog, { SlideAnimation, DialogButton, DialogTitle } from 'react-native-popup-dialog';
import Emoji from 'react-native-emoji';
import { VALUE_SCENE_PUBLISHED } from '../../../helpers/constants';
import CategoryItem from './components/CategoryItem';
import Footer from './components/Footer';
import Chapter from './components/Chapter';
import Header from './components/Header';
import styles from './styles';

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

class MainCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            chapters: [],
            numQuestions: 0,
            scrollAnim: new Animated.Value(0),
            offsetAnim: new Animated.Value(0),
            loaded: false,
            yPosition: [],
            categories: [],
            category: null,
        };
    }
    componentWillMount() {
        this.state.scrollAnim.addListener(this.handleScroll);
        this.refPb.once('value', (snap) => {
            const { title, category } = snap.val();
            const chapters = [];
            const preloadImages = [];
            let numQuestions = 0;
            snap.child('chapters').forEach((chapter) => {
                const { question, image } = chapter.val();
                if (image) preloadImages.push(Image.prefetch(image));
                if (question) numQuestions += 1;
                chapters.push(Object.assign({}, chapter.val(), {
                    key: chapter.key,
                }));
            });
            Promise.all(preloadImages).then(() => {
                this.setState({
                    title,
                    numQuestions,
                    chapters: sortBy(chapters, ['created_at']),
                    loaded: true,
                    category: (category) ? category.name : null,
                });
            });
        });
        firebase.database().ref('categories').once('value', (snap) => {
            const categories = [];
            snap.forEach((snapC) => {
                categories.push(Object.assign({}, snapC.val(), {
                    id: snapC.key,
                }));
            });
            this.setState({ categories });
        });
    }
    componentWillUnmount() {
        this.state.scrollAnim.removeListener(this.handleScroll);
    }

    setTitle = (value) => {
        this.setState({ title: value }, () => {
            this.refPb.child('title').set(value);
        });
    }
    setNumQuestion = (value) => {
        this.setState({ numQuestions: this.state.numQuestions + value });
    }
    setCategory = (value) => {
        this.setState({ category: value.name }, () => {
            this.refPb.child('category').set(value);
        });
    }
    handleScroll = ({ value }) => {
        this.previousScrollvalue = this.currentScrollValue;
        this.currentScrollValue = value;
    };

    handleScrollEndDrag = () => {
        this.scrollEndTimer = setTimeout(this.handleMomentumScrollEnd, 250);
    };

    handleMomentumScrollBegin = () => {
        clearTimeout(this.scrollEndTimer);
    };

    handleMomentumScrollEnd = () => {
        const previous = this.previousScrollvalue;
        const current = this.currentScrollValue;

        if (previous > current || current < 64) {
            // User scrolled down or scroll amount was too less, lets snap back our header
            Animated.spring(this.state.offsetAnim, {
                toValue: -current,
                tension: 300,
                friction: 35,
            }).start();
        } else {
            Animated.timing(this.state.offsetAnim, {
                toValue: 0,
                duration: 0,
            }).start();
        }
    };
    newChapter = async () => {
        const dataChapter = {
            created_at: firebase.database.ServerValue.TIMESTAMP,
        };
        const key = await this.refPb.child('chapters').push().key;
        await this.refPb.child('chapters').child(key).set(dataChapter).then(() => {
            const newChapter = Object.assign({}, dataChapter, { key });
            this.setState({
                chapters: [...this.state.chapters, newChapter],
            }, () => {
                this.flatListRef.scrollToEnd();
            });
        });
    }
    removeChapter = (chapterKey) => {
        Alert.alert(
            'Borrar capítulo',
            '¿Estas seguro de eliminar este capítulo?',
            [
                {
                    text: 'Eliminar',
                    onPress: () => {
                        const index = this.state.chapters
                            .findIndex(chapter => chapter.key === chapterKey);
                        this.setState({
                            chapters: update(this.state.chapters, { $splice: [[index, 1]] }),
                        }, () => {
                            const indexScroll = (index > this.state.chapters.length - 1)
                                ? this.state.chapters.length - 1
                                : index;
                            this.scrollToElementByIndex(indexScroll);
                        });
                        
                        this.refPb.child('chapters').child(chapterKey).once('value', (snap) => {
                            if (snap.hasChild('question')) {
                                this.setNumQuestion(-1);
                            }
                            snap.ref.remove();
                        });
                    },
                },
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }
    scrollToElementByIndex = (index) => {
        this.flatListRef.scrollToIndex({ index });
    }
    openPopDialog = () => {
        this.popupDialogCat.show();
    }
    confirmPublish = () => {
        this.refPb.child('finished_at').set(firebase.database.ServerValue.TIMESTAMP).then(() => {
            this.popupDialogCat.dismiss();
            this.popupDialogPublished.show();
        });
    }
    refPb = firebase.database().ref('building_playbooks').child(this.props.pbKey);
    render() {
        if (!this.state.loaded) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
        const { scrollAnim, offsetAnim } = this.state;

        const translateY = Animated.add(scrollAnim, offsetAnim).interpolate({
            inputRange: [0, 64],
            outputRange: [0, -64],
            extrapolate: 'clamp',
        });
        return (
            <View style={styles.containerMain}>
                <KeyboardAwareFlatList
                    style={styles.containerFlatList}
                    innerRef={(ref) => { this.flatListRef = ref; }}
                    scrollEventThrottle={16}
                    onScroll={
                        Animated.event([{
                            nativeEvent: {
                                contentOffset: {
                                    y: this.state.scrollAnim,
                                },
                            },
                        }])
                    }
                    onMomentumScrollBegin={this.handleMomentumScrollBegin}
                    onMomentumScrollEnd={this.handleMomentumScrollEnd}
                    onScrollEndDrag={this.handleScrollEndDrag}
                    data={this.state.chapters}
                    keyExtractor={item => item.key}
                    renderItem={({ item, index }) => (
                        <Chapter
                            number={index + 1}
                            chapterRef={this.refPb.child('chapters').child(item.key)}
                            setNumQuestion={this.setNumQuestion}
                            removeChapter={this.removeChapter}
                            pbKey={this.props.pbKey}
                            chapterKey={item.key}
                            {...item}
                        />
                    )}
                    ListHeaderComponent={() => (
                        <View style={{ marginTop: 64 }}>
                            <TextInput
                                ref={(c) => { this.textInput = c; }}
                                style={styles.inputTitle}
                                placeholder="Pon un título a tu historia"
                                onChangeText={value => this.setTitle(value)}
                                value={this.state.title}
                                multiline
                            />
                        </View>
                    )}
                />
                <Header
                    numQuestions={this.state.numQuestions}
                    numChapters={this.state.chapters.length}
                    style={{ transform: [{ translateY }] }}
                    refPb={this.refPb}
                    scrollToElementByIndex={this.scrollToElementByIndex}
                    openPopDialog={this.openPopDialog}
                />
                <Footer
                    newChapter={this.newChapter}
                    numQuestions={this.state.numQuestions}
                    numChapters={this.state.chapters.length}
                />
                <PopupDialog
                    width={0.8}
                    height={350}
                    ref={(popupDialog) => { this.popupDialogCat = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    dialogTitle={<DialogTitle title="Último paso" />}
                    actions={[
                        <DialogButton
                            text="Publicar"
                            onPress={() => {
                                this.confirmPublish();
                            }}
                            key="publish"
                            disabled={!this.state.category}
                            textStyle={styles.buttonPopup}
                        />,
                    ]}
                >
                    <View style={styles.containerPopup}>
                        <Text style={styles.textPopup}>
                            Selecciona la categoría en la que encontrarías tu historia
                        </Text>
                        <FlatList
                            style={styles.containerCategories}
                            extraData={this.state}
                            data={this.state.categories}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <CategoryItem
                                    item={item}
                                    setCategory={this.setCategory}
                                    selected={(this.state.category === item.name)}
                                />
                            )}
                        />
                    </View>
                </PopupDialog>
                <PopupDialog
                    width={0.8}
                    height={400}
                    ref={(popupDialog) => { this.popupDialogPublished = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    actions={[
                        <DialogButton
                            text="Ok!"
                            onPress={() => Actions.reset('playbooks')}
                            key="done"
                            textStyle={styles.buttonPopup}
                        />,
                    ]}
                >
                    <View style={styles.containerPopup}>
                        <Text style={styles.emojiPopup}>
                            <Emoji name="smiley" />
                        </Text>
                        <Text style={styles.texth1Popup}>
                            Historia enviada para publicar
                        </Text>
                        <Text style={styles.textPopup}>
                            Nuestro equipo esta validando que la historia puede ser publicada, una vez aprobada nos pondremos en contacto contingo. Si se publica tu historia conseguiras {this.state.chapters.length * VALUE_SCENE_PUBLISHED} puntos en la categoria {this.state.category} ¡Mucha suerte!
                        </Text>
                    </View>
                </PopupDialog>
            </View>
        );
    }
}

MainCreator.propTypes = {
    pbKey: PropTypes.string.isRequired,
};

export default MainCreator;
