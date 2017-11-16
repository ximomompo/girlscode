import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles';

const Answer = props => (
    <TouchableOpacity
        style={styles.answerContainer}
        onPress={() => props.callback(props.correct)}
    >
        <Text style={[styles.textInput, styles.textInputAnswer]}>
            {props.text}
        </Text>
    </TouchableOpacity>
);

Answer.propsTypes = {
    text: PropTypes.string.isRequired,
    correct: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired,
};

export default Answer;
