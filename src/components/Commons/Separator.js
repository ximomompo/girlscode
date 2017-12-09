import React from 'react';
import { View, StyleSheet } from 'react-native';
import { gray2 } from '../../helpers/colors';

const styles = StyleSheet.create({
    containerSeparator: {
        flex: 0,
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        marginTop: 24,
        marginBottom: 24,
    },
    containerPointSeparator: {
        flex: 0,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    pointSeparator: {
        width: 6,
        height: 6,
        borderRadius: 4,
        backgroundColor: gray2,
        marginLeft: 8,
        marginRight: 8,
    },
});

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
