import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Image } from 'react-native';
import styles from '../styles';

const CategoryHeaderTab = props => (
    <TouchableOpacity
        onPress={() => props.onPress(props.index)}
        style={[styles.containerItemHeaderTabs, props.style]}
    >
        <View style={styles.innerItemHeaderTabs}>
            <Image
                style={styles.iconCategory}
                source={{ uri: props.icon }}
                resizeMode="contain"
            />
        </View>
    </TouchableOpacity>
);

CategoryHeaderTab.propTypes = {
    index: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

export default CategoryHeaderTab;
