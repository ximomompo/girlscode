import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import * as colors from '../../../../../helpers/colors';
import styles from '../../styles';

const colorsPicker = [colors.green, colors.red, colors.blue, 'yellow', 'black', 'white'];

const PickerColors = props => (
    <View style={styles.pickerColor}>
        {colorsPicker.map(cP => (
            <TouchableOpacity
                key={cP}
                style={{ padding: 5 }}
                onPress={() => props.setColorText(cP)}
            >
                <View style={[styles.pickerColorItem, { backgroundColor: cP }]} />
            </TouchableOpacity>
        ))}
    </View>
);

PickerColors.propTypes = {
    setColorText: PropTypes.func.isRequired,
};

export default PickerColors;
