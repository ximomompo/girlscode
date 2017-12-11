import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import Emoji from 'react-native-emoji';
import PropTypes from 'prop-types';
import styles from '../styles';
import * as colors from '../../../../helpers/colors';

class Answer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            correct: props.correct,
            errorText: props.errorText,
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.correct !== nextProps.correct) {
            this.setState({ correct: nextProps.correct });
        }
        if (this.state.errorText !== nextProps.errorText) {
            this.setState({ errorText: nextProps.errorText });
        }
    }
    setText = (value) => {
        this.setState({ text: value }, () => {
            this.props.answerRef.child('text').set(value);
        });
    }
    renderErrorText = () => {
        if (this.state.correct) return null;
        return (
            <View style={styles.containerErrorText}>
                <View style={styles.containerTextErrorText}>
                    <Text style={styles.emojiErrorText}>
                        <Emoji name="ghost" />
                    </Text>
                    <Text style={styles.textErrorText}>
                        Agrega un mensaje para mostrar cuando se marque la opción incorrecta
                    </Text>
                </View>
                <AutoGrowingTextInput
                    style={styles.inputErrorText}
                    placeholder="Escribe aquí el texto de error"
                    onChangeText={value => this.props.setErrorText(value)}
                    value={this.state.errorText}
                />
            </View>
        );
    }
    render() {
        return (
            <View style={styles.containerAnswer}>
                <View style={styles.mediaAnswer} >
                    <TouchableOpacity
                        style={styles.iconAnswer}
                        onPress={() => this.props.setCorrect(this.props.answerKey)}
                    >
                        <Icon
                            name="check-circle"
                            type="font-awesome"
                            color={(this.state.correct) ? colors.green : colors.gray1}
                            iconStyle={{ fontSize: 32 }}
                        />
                    </TouchableOpacity>
                    <AutoGrowingTextInput
                        style={styles.inputAnswer}
                        placeholder="Respuesta"
                        value={this.state.text}
                        onChangeText={text => this.setText(text)}
                        underlineColorAndroid="transparent"
                    />
                </View>
                {this.renderErrorText()}
            </View>
        );
    }
}

Answer.propsTypes = {
    answerRef: PropTypes.func.isRequired,
    answerKey: PropTypes.string.isRequired,
    text: PropTypes.string,
    correct: PropTypes.bool.isRequired,
    setCorrect: PropTypes.func.isRequired,
    setErrorText: PropTypes.func.isRequired,
    errorText: PropTypes.string,
};

Answer.defaultProps = {
    text: null,
    errorText: null,
};

export default Answer;
