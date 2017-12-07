import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import Emoji from 'react-native-emoji';
import styles from '../styles';

const Footer = props => (
    <View style={styles.containerFooter}>
        <View style={styles.containerMetrics}>
            <View style={styles.containerMetric}>
                <Text style={styles.textMetric}>
                    {props.numChapters}
                </Text>
                <Text style={styles.emojiHeader}>
                    <Emoji name="memo" />
                </Text>
            </View>
            <View style={styles.containerMetric}>
                <Text style={styles.textMetric}>
                    {props.numQuestions}
                </Text>
                <Text style={styles.emojiHeader}>
                    <Emoji name="thinking_face" />
                </Text>
            </View>
        </View>
        <TouchableOpacity
            style={styles.containerAddChapter}
            onPress={() => props.newChapter()}
        >
            <Text style={styles.textAddChapter}>
                Nuevo capítulo
            </Text>
        </TouchableOpacity>
    </View>
);

Footer.propTypes = {
    newChapter: PropTypes.func.isRequired,
    numQuestions: PropTypes.number.isRequired,
    numChapters: PropTypes.number.isRequired,
};

export default Footer;
