import React from 'react';
import { View } from 'react-native';
import styles from '../styles';

const Separator = props => (
    <View style={styles.containerSeparator}>
        <View style={styles.lineSeparator} />
        {props.children}
        <View style={styles.lineSeparator} />
    </View>
);

export default Separator;
