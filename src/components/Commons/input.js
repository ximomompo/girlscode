import React from 'react';
import { StyleSheet } from 'react-native';
import { FormInput } from 'react-native-elements';
import * as colors from '../../helpers/colors';

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: colors.gray2,
        borderRadius: 16,
        margin: 8,
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 16,
        paddingLeft: 16,
        width: '100%',
    },
    input: {
        borderBottomWidth: 0,
        fontSize: 14,
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
