import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styles from '../../styles';

const Icon = props => (
    <TouchableOpacity
        style={[styles.iconsAbsolute, styles[`positionIcon${props.position}`]]}
        onPress={props.onPress}
    >
        {props.children}
    </TouchableOpacity>
);

Icon.propsTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    position: PropTypes.oneOf(['TopLeft', 'TopRight', 'BottonLeft', 'BottomRight']),
};

export default Icon;
