import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import Emoji from 'react-native-emoji';
import styles from '../styles';

const Footer = props => (
    <View style={styles.containerFooter}>
        <Image
            style={styles.avatar}
            source={{ uri: props.owner.photoURL }}
        />
        <View style={styles.containerTextFooter}>
            <Text
                style={styles.textPrimaryFooter}
                numberOfLines={1}
            >
                {props.title}
            </Text>
            <Text style={styles.textAuxFooter}>
                creado por {props.owner.displayName}
            </Text>
        </View>
        <View style={styles.containerNumChapters}>
            <Emoji name="memo" />
            <Text style={styles.textNumChapters}>
                {props.currentChapter}/{props.totalChapters}
            </Text>
        </View>
    </View>
);

Footer.propTypes = {
    title: PropTypes.string.isRequired,
    currentChapter: PropTypes.number.isRequired,
    totalChapters: PropTypes.number.isRequired,
    owner: PropTypes.shape({
        photoURL: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
    }).isRequired,
};

export default Footer;
