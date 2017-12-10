import React from 'react';
import { StyleSheet } from 'react-native';
import { FormInput } from 'react-native-elements';
import * as colors from '../../helpers/colors';
import * as fonts from '../../helpers/fonts';

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 50,
        margin: 8,
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 16,
        paddingLeft: 16,
        width: '100%',
        backgroundColor: colors.white,
    },
    input: {
        borderBottomWidth: 0,
        fontSize: 16,
        fontFamily: fonts.regular,
        color: colors.black,
    },
});

export default (props) => {
    const { input: { value, onChange } } = props;
    return (
        <FormInput
            onChangeText={val => onChange(val)}
            value={value}
            containerStyle={styles.container}
            inputStyle={styles.input}
            {...props}
        />
    );
};
