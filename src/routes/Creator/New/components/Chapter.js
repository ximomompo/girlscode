import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    TextInput,
    View,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
// import CameraRollPicker from 'react-native-camera-roll-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Emoji from 'react-native-emoji';
import firebase from 'react-native-firebase';
import Question from './Question';
import Separator from './Separator';
import styles from '../styles';

class Chapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            image: props.image,
            question: props.question,
            numQuestions: props.numQuestions,
            uploadImage: false,
        };
    }
    setText = (value) => {
        this.setState({ text: value }, () => {
            this.props.chapterRef.child('text').set(value);
        });
    }
    setImage = (value, url) => {
        this.setState({ image: value }, () => {
            this.props.chapterRef.child('image').set(url);
        });
    }
    openPicker = () => {
        ImagePicker.openPicker({
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width / 1.61,
            cropping: true,
        }).then((image) => {
            this.setState({ uploadImage: true });
            const task = firebase.storage()
                .ref(`playbooks/${this.props.pbKey}/${this.props.chapterKey}`)
                .put(image.path);

            task.on('state_changed', () => {
                // console.log('state', snapFile.state);
            }, (error) => {
                this.setState({ uploadImage: false });
                console.log('error', error);
            }, (res) => {
                this.setState({ uploadImage: false });
                this.setImage(image.path, res.downloadURL);
            });
        });
    }
    addQuestion = async () => {
        await this.props.chapterRef.child('question').child('answers').push({
            correct: true,
        });
        await this.props.chapterRef.child('question').child('answers').push({
            correct: false,
        });
        const question = await this.props.chapterRef.child('question').child('answers').once('value');
        this.setState({ question: question.val() });
        this.props.setNumQuestion(1);
    }
    removeQuestion = () => {
        this.setState({ question: null }, () => {
            this.props.setNumQuestion(-1);
            this.props.chapterRef.child('question').remove();
        });
    }

    renderImage = () => {
        const height = Dimensions.get('window').width / 1.61;
        if (this.state.uploadImage) {
            return (
                <View style={[styles.defaultImage, { height }]}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
        if (this.state.image) {
            return (
                <TouchableOpacity onPress={() => this.openPicker()}>
                    <Image
                        style={[styles.image, { height }]}
                        source={{ uri: this.state.image }}
                    />
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity onPress={() => this.openPicker()}>
                <View style={[styles.defaultImage, { height }]}>
                    <Text style={styles.emojiDefaultImage}>
                        <Emoji name="frame_with_picture" />
                    </Text>
                    <Text style={styles.textDefaultImage}>Selecciona una imagen</Text>
                </View>
            </TouchableOpacity>
        );
    }
    renderQuestion = () => {
        if (this.state.question) {
            return (
                <Question
                    questionRef={this.props.chapterRef.child('question')}
                    removeQuestion={this.removeQuestion}
                />
            );
        }
        return (
            <TouchableOpacity
                style={styles.containerButton}
                onPress={() => this.addQuestion()}
            >
                <Text style={styles.emojiButton}>
                    <Emoji name="thinking_face" />
                </Text>
                <Text style={[styles.textButton, styles.textAddQuestion]}>
                    Añadir pregunta
                </Text>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View>
                {this.renderImage()}
                <Separator>
                    <Text style={styles.textSeparator}>Capítulo {this.props.number}</Text>
                </Separator>
                <TextInput
                    style={styles.inputText}
                    multiline
                    placeholder="Escribe aquí el texto de tu capítulo"
                    onChangeText={value => this.setText(value)}
                    value={this.state.text}
                />
                {this.renderQuestion()}
            </View>
        );
    }
}

Chapter.propTypes = {
    chapterRef: PropTypes.shape().isRequired,
    pbKey: PropTypes.string.isRequired,
    chapterKey: PropTypes.string.isRequired,
    image: PropTypes.string,
    text: PropTypes.string,
    question: PropTypes.shape({
        text: PropTypes.string,
        answers: PropTypes.shape({
            text: PropTypes.string,
            correcnt: PropTypes.bool,
        }),
    }),
    setNumQuestion: PropTypes.func.isRequired,
    removeChapter: PropTypes.func.isRequired,
};

Chapter.defaultProps = {
    image: null,
    text: null,
    question: null,
};

export default Chapter;
