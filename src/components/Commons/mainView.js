import React from 'react';
import { StyleSheet, View } from 'react-native';
// import * as colors from '../../helpers/colors';

const styles = StyleSheet.create({
    container: {
        padding: 12,
        alignItems: 'center',
        flex: 1,
    },
});

const MainView = (props) => {
    const { style, ...other } = props;
    return (
        <View
            style={[styles.container, style]}
            {...other}
        />
    );
};

export default MainView;
