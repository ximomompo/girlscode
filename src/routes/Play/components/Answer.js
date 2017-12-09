import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles';

const Answer = props => (
    <TouchableOpacity
        style={styles.containerAnswer}
        onPress={() => this.props.onRespondAnswer(props.correct)}
    >
        <Text style={styles.textAnswer}>{props.text}</Text>
    </TouchableOpacity>
);

Answer.propsTypes = {
    text: PropTypes.string.isRequired,
    correct: PropTypes.bool.isRequired,
    onRespondAnswer: PropTypes.func.isRequired,
};

export default Answer;
