import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-elements';
import Answer from './components/Answer';
import IconAbsolute from './components/IconAbsolute';
import { Text } from '../../../../components/Commons';
import * as colors from '../../../../helpers/colors';
import styles from '../styles';

class LayoutForm extends Component {
    setText = (value) => {
        this.props.sceneRef.child('question').set(value);
    }

    addAnswer = () => {
        this.props.sceneRef.child('answers').push({
            text: 'Respuesta',
            correct: false,
        });
    }

    renderForm = () => (
        <KeyboardAwareScrollView
            contentContainerStyle={[styles.containerText, {
                justifyContent: 'flex-start',
                paddingTop: 80,
            }]}
        >
            <IconAbsolute
                position="TopLeft"
                onPress={() => this.props.goToLayout('capture')}
            >
                <Icon
                    name="cross"
                    type="entypo"
                    color={colors.white}
                    iconStyle={{ fontSize: 32 }}
                />
            </IconAbsolute>
            <Icon
                name="question-circle-o"
                type="font-awesome"
                color={colors.white}
                iconStyle={{ fontSize: 46 }}
            />
            <TextInput
                ref={(c) => { this.textInputQ = c; }}
                style={[styles.textInput, styles.textInputQuestion]}
                multiline
                autoFocus
                onChangeText={question => this.setText(question)}
                value={this.props.scene.question}
            />
            {Object.keys(this.props.scene.answers).map(answerKey => (
                <Answer
                    key={answerKey}
                    answerKey={answerKey}
                    answer={this.props.scene.answers[answerKey]}
                    sceneRef={this.props.sceneRef}
                />
            ))}
            <TouchableOpacity
                style={styles.addQuestion}
                onPress={() => this.addAnswer()}
            >
                <Text style={styles.addQuestionText}>Añadir respuesta</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <IconAbsolute
                    position="TopLeft"
                    onPress={() => this.props.goToLayout('capture')}
                >
                    <Icon
                        name="cross"
                        type="entypo"
                        color={colors.white}
                        iconStyle={{ fontSize: 32 }}
                    />
                </IconAbsolute>
                <IconAbsolute
                    position="TopLeft"
                    onPress={() => this.props.goToLayout('capture')}
                >
                    <Text style={styles.iconText}>Listo</Text>
                </IconAbsolute>
                <Image
                    style={styles.imageBackground}
                    source={{ uri: this.props.scene.image }}
                />
                {this.renderForm()}
            </View>
        );
    }
}

LayoutForm.propsTypes = {
    goToLayout: PropTypes.func.isRequired,
    scene: PropTypes.shape({
        question: PropTypes.string.isRequired,
        answers: PropTypes.arrayOf().isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
    sceneRef: PropTypes.string.isRequired,
};

export default LayoutForm;
