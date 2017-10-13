import React from 'react';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as colors from '../../helpers/colors';

const TabIcon = props => (
    <Icon
        name={props.iconName}
        type={props.iconType}
        size={32}
        color={(props.focused) ? colors.primary : colors.black}
    />
);

TabIcon.propTypes = {
    iconName: PropTypes.string.isRequired,
    iconType: PropTypes.string,
};

TabIcon.defaultProps = {
    iconType: null,
};

export default TabIcon;
