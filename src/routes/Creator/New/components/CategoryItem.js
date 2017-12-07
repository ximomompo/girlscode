import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, TouchableOpacity } from 'react-native';
import { black, gray2 } from '../../../../helpers/colors';
import { regular, bold } from '../../../../helpers/fonts';
import styles from '../styles';

const CategoryItem = props => (
    <TouchableOpacity
        style={styles.containerItemCat}
        onPress={() => props.setCategory(props.item)}
    >
        <Image
            style={{ width: 32, height: 32 }}
            source={{ uri: props.item.icon }}
        />
        <Text
            style={[styles.textCat, {
                color: (props.selected) ? black : gray2,
                fontFamily: (props.selected) ? bold : regular,
            }]}
        >
            {props.item.name}
        </Text>
    </TouchableOpacity>
);

CategoryItem.propTypes = {
    setCategory: PropTypes.func.isRequired,
    item: PropTypes.shape({
        icon: PropTypes.string,
        name: PropTypes.string,
    }).isRequired,
};

CategoryItem.defaultProps = {
    selectedCategory: null,
};

export default CategoryItem;
