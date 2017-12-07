import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    View,
    TextInput,
    Alert,
    TouchableOpacity,
    Text,
    Animated,
    ActivityIndicator,
    Image,
} from 'react-native';
import firebase from 'react-native-firebase';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import Emoji from 'react-native-emoji';
import Chapter from './components/Chapter';
import Header from './components/Header';
import styles from './styles';

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
        };
    }
    componentWillMount() {
        this.state.scrollAnim.addListener(this.handleScroll);
        this.refPb.once('value', (snap) => {
            const { title } = snap.val();
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
                    chapters: _.sortBy(chapters, ['number']),
                    loaded: true,
                });
            });
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
                duration: 500,
            }).start();
        }
    };
    refPb = firebase.database().ref('building_playbooks').child(this.props.pbKey);

    /* validaciones: 
        - Tiene que existir la imagen
        - Tiene que existir texto (min 12)
        - Si tiene question:
        - - Las respuestas tienen que tener texto
        - - Tiene que existir una verdadera
        - - Tiene que existir el texto de question
    */
    newChapter = async () => {
        const dataChapter = {
            number: this.state.chapters.length + 1,
            created_at: firebase.database.ServerValue.TIMESTAMP,
        };
        const key = await this.refPb.child('chapters').push().key;
        await this.refPb.child('chapters').child(key).set(dataChapter).then(() => {
            const newChapter = Object.assign({}, dataChapter, { key });
            this.setState({
                chapters: [...this.state.chapters, newChapter],
            });
        });
    }
    removeChapter = () => {

    }
    scrollToElementByIndex = (index) => {
        this.flatListRef.scrollToIndex({ index });
    }
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
                <Header
                    numQuestions={this.state.numQuestions}
                    numChapters={this.state.chapters.length}
                    style={{ transform: [{ translateY }] }}
                    refPb={this.refPb}
                    scrollToElementByIndex={this.scrollToElementByIndex}
                />
                <KeyboardAwareFlatList
                    style={{ width: '100%', flex: 1, marginBottom: 64 }}
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
                    renderItem={({ item }) => (
                        <Chapter
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
                                placeholder="Pon un título"
                                onChangeText={value => this.setTitle(value)}
                                value={this.state.title}
                                multiline
                            />
                        </View>
                    )}
                />
                <TouchableOpacity
                    style={styles.containerFooter}
                    onPress={() => this.newChapter()}
                >
                    <Text style={styles.emojiButton}>
                        <Emoji name="memo" />
                    </Text>
                    <Text style={[styles.textButton, styles.textAddChapter]}>
                        Añadir nuevo capítulo
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

MainCreator.propTypes = {
    pbKey: PropTypes.string.isRequired,
};

export default MainCreator;
