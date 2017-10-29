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
            text: 'Respuesta',
        };
    }
    setText = (value) => {
        this.setState({ text: value });
        this.refAnswers.child('text').set(value);
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
    refAnswers = this.props.sceneRef.child('answers').child(this.props.answerKey);
    render() {
        return (
            <View style={styles.answerContainer}>
                <TouchableOpacity
                    style={[styles.iconsAbsolute, { top: 4, right: 4 }]}
                    onPress={() => this.removeAnswer()}
                >
                    <Icon
                        name="close"
                        type="font-awesome"
                        color={colors.black}
                        iconStyle={{ fontSize: 16 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.switchCorrect(!this.props.answer.correct)}
                >
                    <Icon
                        name="check-circle"
                        type="font-awesome"
                        color={(this.props.answer.correct) ? colors.green : colors.gray}
                        iconStyle={{ fontSize: 32 }}
                    />
                </TouchableOpacity>
                <TextInput
                    style={[styles.textInput, styles.textInputAnswer]}
                    multiline
                    value={this.state.text}
                    onChangeText={text => this.setText(text)}
                />
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
