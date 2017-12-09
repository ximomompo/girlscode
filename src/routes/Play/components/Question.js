import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Emoji from 'react-native-emoji';
import Answer from './Answer';
import styles from '../../Creator/New/styles';
import stylesPlay from '../styles';

class Question extends Component {
    onRespondAnswer = correct => (
        (correct)
            ? this.props.onNextChapter()
            : this.props.onShowErrorMessage(this.props.errorText)
    )
    render() {
        return (
            <View style={stylesPlay.containerQuestion}>
                <Text style={styles.containerEmoji}>
                    <Emoji name="thinking_face" />
                </Text>
                <Text style={stylesPlay.textQuestion}>
                    {this.props.text}
                </Text>
                {this.props.answers.map(answer => (
                    <Answer
                        key={answer.key}
                        onRespondAnswer={this.onRespondAnswer}
                        {...answer}
                    />
                ))}
            </View>
        );
    }
}

Question.propsTypes = {
    text: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            correct: PropTypes.bool.isRequired,
        }),
    ).isRequired,
    onNextChapter: PropTypes.func.isRequired,
    onShowErrorMessage: PropTypes.func.isRequired,
};

export default Question;
