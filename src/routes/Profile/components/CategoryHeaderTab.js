import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import SVGImage from 'react-native-svg-image';
import styles from '../styles';

const CategoryHeaderTab = props => (
    <TouchableOpacity
        onPress={() => props.onPress(props.index)}
        style={[styles.containerItemHeaderTabs, props.style]}
    >
        <SVGImage
            style={styles.iconCategory}
            scrollEnabled={false}
            source={{ uri: props.icon }}
        />
    </TouchableOpacity>
);

CategoryHeaderTab.propTypes = {
    index: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

export default CategoryHeaderTab;
