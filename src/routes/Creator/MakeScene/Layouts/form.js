import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';
import Answer from './components/Answer';
import IconAbsolute from './components/IconAbsolute';
import { Text } from '../../../../components/Commons';
import * as colors from '../../../../helpers/colors';
import styles from '../styles';

class LayoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: props.scene.question,
            answers: [],
        };
    }

    componentWillMount() {
        // Iniciar anwers con 2 preguntas por defecto
        this.props.sceneRef.child('answers').orderByChild('created_at').on('value', (snap) => {
            if (!snap.val()) {
                snap.ref.push({
                    text: 'Respuesta',
                    correct: false,
                });
                snap.ref.push({
                    text: 'Respuesta',
                    correct: false,
                });
            }
            const answers = [];
            snap.forEach((answer) => {
                answers.push({
                    id: answer.key,
                    ...answer.val(),
                });
            });
            this.setState({ answers });
        });
    }

    setQuestionText = (value) => {
        this.setState({ question: value }, () => this.props.sceneRef.child('question').set(value));
    }

    addAnswer = () => {
        this.props.sceneRef.child('answers').push({
            text: 'Respuesta',
            correct: false,
            created_at: firebase.database.ServerValue.TIMESTAMP,
        }).then(() => this.scrollView.scrollToEnd());
    }

    /**
    * Comprobar el número de respuestas correctas.
    */
    done = () => {
        this.props.sceneRef.child('answers')
            .orderByChild('correct')
            .equalTo(true)
            .once('value', (snap) => {
                if (snap.numChildren() === 0) {
                    Alert.alert(
                        'No hay respuesta correctas',
                        'Debes marcar al menos 1 respuesta correcta',
                        [{ text: 'OK' }],
                        { cancelable: true },
                    );
                } else if (snap.numChildren() === this.state.answers.length) {
                    Alert.alert(
                        'Todas las respuestas son correctas',
                        'No pueden ser todas las respuestas correctas',
                        [{ text: 'OK' }],
                        { cancelable: true },
                    );
                } else {
                    this.props.sceneRef.child('answers').off();
                    this.props.finishScene({
                        question: this.state.question,
                    });
                }
            });
    }

    renderForm = () => (
        <View style={{ width: '100%' }}>
            <KeyboardAwareScrollView
                ref={(ref) => { this.scrollView = ref; }}
                contentContainerStyle={{
                    padding: 20,
                    paddingTop: 80,
                }}
            >
                <Icon
                    name="question-circle-o"
                    type="font-awesome"
                    color={colors.white}
                    iconStyle={styles.mainIconForm}
                />
                <TextInput
                    ref={(c) => { this.textInputQ = c; }}
                    style={[styles.textInput, styles.textInputQuestion]}
                    multiline
                    autoFocus
                    onChangeText={question => this.setQuestionText(question)}
                    value={this.state.question}
                />
                <FlatList
                    data={this.state.answers}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Answer
                            answer={item}
                            sceneRef={this.props.sceneRef}
                        />
                    )}
                />
                <TouchableOpacity
                    style={styles.addQuestion}
                    onPress={() => this.addAnswer()}
                >
                    <Text style={styles.addQuestionText}>Añadir respuesta</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
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
                        iconStyle={[styles.shadowDefault, { fontSize: 32 }]}
                    />
                </IconAbsolute>
                <IconAbsolute
                    position="TopRight"
                    onPress={() => this.done()}
                >
                    <Text style={[styles.shadowDefault, styles.iconText]}>Listo</Text>
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
    finishScene: PropTypes.func.isRequired,
    scene: PropTypes.shape({
        question: PropTypes.string.isRequired,
        answers: PropTypes.arrayOf().isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
    sceneRef: PropTypes.string.isRequired,
};

export default LayoutForm;

