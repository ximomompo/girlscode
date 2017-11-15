import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const CategoryItem = props => (
    <TouchableOpacity
        style={{
            width: '100%',
            height: 56,
            flex: 0,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: 'black',
        }}
        onPress={() => props.setCategory(props.item)}
    >
        <Icon
            name={props.item.icon}
            type="font-awesome"
            color={(props.selectedCategory === props.item.name) ? 'black' : 'gray'}
            style={{ position: 'absolute', left: 20, top: 12 }}
            iconStyle={{ fontSize: 32 }}
        />
        <Text
            style={{
                paddingLeft: 16,
                paddingRight: 16,
                fontSize: 12,
                color: (props.selectedCategory === props.item.name) ? 'black' : 'gray',
            }}
        >
            {props.item.name}
        </Text>
    </TouchableOpacity>
);

CategoryItem.propTypes = {
    setCategory: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string,
    item: PropTypes.shape({
        icon: PropTypes.string,
        name: PropTypes.string,
    }).isRequired,
};

CategoryItem.defaultProps = {
    selectedCategory: null,
};

export default CategoryItem;
