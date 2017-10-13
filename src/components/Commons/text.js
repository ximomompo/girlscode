import React from 'react';
import { StyleSheet, Text } from 'react-native';
// import * as colors from '../../helpers/colors';

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Roboto-Regular',
    },
});

export default (props) => {
    const { style, ...other } = props;
    return (
        <Text
            style={[styles.text, style]}
            {...other}
        />
    );
};
