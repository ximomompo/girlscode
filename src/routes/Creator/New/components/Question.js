import React, { Component } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Emoji from 'react-native-emoji';
import { Icon } from 'react-native-elements';
import { gray2 } from '../../../../helpers/colors';
import Answer from './Answer';
import styles from '../styles';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null,
            errorText: null,
            answers: [],
        };
    }
    componentWillMount() {
        this.props.questionRef.once('value', (snap) => {
            const { text, errorText } = snap.val();
            const answers = [];
            snap.child('answers').forEach((answer) => {
                answers.push(Object.assign({}, answer.val(), {
                    key: answer.key,
                }));
            });
            this.setState({ text, answers, errorText });
        });
    }
    setText = (value) => {
        this.setState({ text: value }, () => this.props.questionRef.child('text').set(value));
    }
    setErrorText = (value) => {
        this.setState({ errorText: value }, () => this.props.questionRef.child('errorText').set(value));
    }
    setCorrect = (answerKey) => {
        const answers = this.state.answers.map(answer => (
            Object.assign({}, answer, {
                correct: (answer.key === answerKey),
            })
        ));
        this.setState({ answers }, () => {
            this.props.questionRef.once('value', (snap) => {
                snap.child('answers').forEach((answer) => {
                    answer.ref.child('correct').set(answer.key === answerKey);
                });
            });
        });
    }
    render() {
        return (
            <View style={styles.containerQuestion}>
                <TouchableOpacity
                    onPress={() => this.props.removeQuestion()}
                    style={styles.iconRemoveQuestion}
                >
                    <Icon
                        name="times"
                        type="font-awesome"
                        color={gray2}
                        iconStyle={{ fontSize: 16 }}
                    />
                </TouchableOpacity>
                <Text style={styles.containerEmoji}>
                    <Emoji name="thinking_face" />
                </Text>
                <TextInput
                    style={styles.inputQuestion}
                    multiline
                    placeholder="Escribe aquí la pregunta"
                    onChangeText={value => this.setText(value)}
                    value={this.state.text}
                />
                {this.state.answers.map(answer => (
                    <Answer
                        key={answer.key}
                        answerRef={this.props.questionRef.child('answers').child(answer.key)}
                        setCorrect={this.setCorrect}
                        answerKey={answer.key}
                        errorText={this.state.errorText}
                        setErrorText={this.setErrorText}
                        {...answer}
                    />
                ))}
            </View>
        );
    }
}

Question.propsTypes = {
    questionRef: PropTypes.shape().isRequired,
    removeQuestion: PropTypes.func.isRequired,
};

export default Question;
