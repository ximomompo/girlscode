import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, TouchableOpacity } from 'react-native';
// import { Icon } from 'react-native-elements';
import styles from '../styles';

const CategoryItem = props => (
    <TouchableOpacity
        style={[styles.containerItemCat, {
            backgroundColor: (props.selected) ? '#EAEAEA' : 'white',
        }]}
        onPress={() => props.setCategory(props.item)}
    >
        <Image
            style={{ position: 'absolute', left: 16, top: 10, width: 32, height: 32 }}
            source={{ uri: props.item.icon }}
        />
        <Text
            style={[styles.textCat, {
                color: (props.selected) ? 'black' : 'gray',
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

/*
<Icon
    name={props.item.icon}
    type="font-awesome"
    color={(props.selectedCategory === props.item.name) ? 'black' : 'gray'}
    style={{ position: 'absolute', left: 20, top: 12 }}
    iconStyle={{ fontSize: 32 }}
/>
*/