import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Emoji from 'react-native-emoji';
import styles from '../styles';


class Header extends Component {
    /**
     * 
     * Validaciones
     * - Tiene que tener al menos 3 chapters
     * - Tiene que tener al menos 2 decisiones
     * - Tienes que tener título
     * - Tiene que existir la imagen
     * - Tiene que existir texto (min 12)
     * - Si tiene question:
     * - - Las respuestas tienen que tener texto
     * - - Tiene que existir una verdadera
     * - - Tiene que existir el texto de question
     * 
     */
    onPublish = async () => {
        const snapPB = await this.props.refPb.once('value');
        const { title } = snapPB.val();
        if (!title) {
            return Alert.alert(
                'Título requerido',
                'Debes añadir un título a tu historia',
                [{ text: 'OK' }],
                { cancelable: true },
            );
        }
        let numChapters = 0;
        let numQuestions = 0;
        const errorsChapters = [];
        await snapPB.child('chapters').forEach(async (snapChapter) => {
            const { image, text, question, number } = snapChapter.val();
            const index = parseInt(number, 10) - 1;
            if (!image) {
                errorsChapters.push({
                    index,
                    title: 'Imagen requerida',
                    message: `Aun no has añadido una imagen a tu capítulo ${number}`,
                });
            }
            if (!text) {
                errorsChapters.push({
                    index,
                    title: 'Texto requerido',
                    message: `Aun no has añadido un texto a tu capítulo ${number}`,
                });
            }
            if (question) {
                numQuestions += 1;
                if (!question.text) {
                    errorsChapters.push({
                        index,
                        title: 'Pregunta requerida',
                        message: `Debes añadir un texto a tu pregunta del capítulo ${number}`,
                    });
                }
                const answerNoText = Object.values(question.answers)
                    .filter(answer => !answer.text || answer.text.length < 2);
                const correctAnswer = Object.values(question.answers)
                    .filter(answer => answer.correct === true);

                if (answerNoText.length > 0) {
                    errorsChapters.push({
                        index,
                        title: 'Respuestas sin texto',
                        message: `Todas las respuestas deben tener texto en tu capítulo ${number}`,
                    });
                }
                if (correctAnswer.length !== 1) {
                    errorsChapters.push({
                        index,
                        title: 'Número de respuestas correctas',
                        message: 'Debes tener 1 respuesta correcta',
                    });
                }
            }
            numChapters += 1;
        });
        if (errorsChapters.length > 0) {
            const error = errorsChapters[0];
            this.props.scrollToElementByIndex(error.index);
            return Alert.alert(
                error.title,
                error.message,
                [{ text: 'OK' }],
                { cancelable: true },
            );
        }
        if (numChapters < 3) {
            return Alert.alert(
                'Capítulos insuficientes',
                'Tu historia debe tener al menos 3 capítulos',
                [{ text: 'OK' }],
                { cancelable: true },
            );
        }

        if (numQuestions < 2) {
            return Alert.alert(
                'Decisiones insuficientes',
                'Tu historia debe tener al menos 2 decisiones',
                [{ text: 'OK' }],
                { cancelable: true },
            );
        }
    }
    render() {
        return (
            <Animated.View style={[this.props.style, styles.containerHeader]}>
                <TouchableOpacity onPress={() => Actions.reset('playbooks')}>
                    <Text style={styles.textHeader}>Guardar</Text>
                </TouchableOpacity>
                <View style={styles.containerMetrics}>
                    <View style={styles.containerMetric}>
                        <Text style={styles.textMetric}>
                            {this.props.numChapters}
                        </Text>
                        <Text style={styles.emojiHeader}>
                            <Emoji name="memo" />
                        </Text>
                    </View>
                    <View style={styles.containerMetric}>
                        <Text style={styles.textMetric}>
                            {this.props.numQuestions}
                        </Text>
                        <Text style={styles.emojiHeader}>
                            <Emoji name="thinking_face" />
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.onPublish()}>
                    <Text style={styles.textHeader}>Publicar</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

Header.propTypes = {
    numChapters: PropTypes.number.isRequired,
    numQuestions: PropTypes.number.isRequired,
    style: PropTypes.shape().isRequired,
    refPb: PropTypes.shape().isRequired,
    scrollToElementByIndex: PropTypes.func.isRequired,
};

export default Header;
