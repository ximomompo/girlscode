import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { Icon } from 'react-native-elements';
import * as colors from '../../../../../helpers/colors';
import styles from '../../styles';

class Answer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.answer.text,
        };
    }
    setText = (value) => {
        this.setState({ text: value }, () => this.refAnswers.child('text').set(value));
    }
    switchCorrect = (value) => {
        this.refAnswers.child('correct').set(value);
    }
    removeAnswer = () => {
        const self = this;
        this.props.sceneRef.child('answers').once('value', (snap) => {
            if (snap.numChildren() > 2) {
                self.refAnswers.remove();
            }
        });
    }
    refAnswers = this.props.sceneRef.child('answers').child(this.props.answer.id)
    render() {
        return (
            <View style={styles.answerContainer}>
                <TouchableOpacity
                    style={styles.iconCorrectContainer}
                    onPress={() => this.switchCorrect(!this.props.answer.correct)}
                >
                    <Icon
                        name="check-circle"
                        type="font-awesome"
                        color={(this.props.answer.correct) ? colors.green : colors.gray1}
                        iconStyle={{ fontSize: 32 }}
                    />
                </TouchableOpacity>
                <TextInput
                    style={[styles.textInput, styles.textInputAnswer]}
                    multiline
                    value={this.state.text}
                    onChangeText={text => this.setText(text)}
                />
                <TouchableOpacity
                    style={styles.iconTrashContainer}
                    onPress={() => this.removeAnswer()}
                >
                    <Icon
                        name="trash"
                        type="font-awesome"
                        color={colors.gray2}
                        iconStyle={{ fontSize: 24 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

Answer.propsTypes = {
    answer: PropTypes.shape({
        text: PropTypes.string.isRequired,
        correct: PropTypes.bool,
    }).isRequired,
    sceneRef: PropTypes.string.isRequired,
    answerKey: PropTypes.string.isRequired,
};

export default Answer;
