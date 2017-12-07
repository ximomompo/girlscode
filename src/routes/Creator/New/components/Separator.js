import React from 'react';
import { View } from 'react-native';
import styles from '../styles';

const Separator = () => (
    <View style={styles.containerSeparator}>
        <View />
        <View style={styles.containerPointSeparator}>
            <View style={styles.pointSeparator} />
            <View style={styles.pointSeparator} />
            <View style={styles.pointSeparator} />
        </View>
        <View />
    </View>
);

export default Separator;
