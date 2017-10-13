import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import * as colors from '../../helpers/colors';

const ButtonC = (props) => {
    const bgColor = () => {
        switch (props.color) {
        case 'primary':
            return colors.primary;
        case 'secondary':
            return colors.secondary;
        default:
            return colors.primary;
        }
    };
    const { buttonStyle, color, ...other } = props;
    const newButtonStyle = Object.assign({}, props.buttonStyle, {
        backgroundColor: bgColor(),
    });
    const containerViewStyle = {
        marginTop: 8,
        marginBottom: 8,
        width: (props.fullWidth) ? '100%' : 'auto',
    };
    const newDisabledStyle = (props.noSpecialStylesDisabled)
        ? newButtonStyle
        : props.disabledStyle;
    return (
        <Button
            buttonStyle={newButtonStyle}
            textStyle={{ textAlign: 'center' }}
            containerViewStyle={containerViewStyle}
            borderRadius={20}
            large
            disabledStyle={newDisabledStyle}
            {...other}
        />
    );
};

ButtonC.PropTypes = {
    fullWidth: PropTypes.bool,
    color: PropTypes.string,
    noSpecialStylesDisabled: PropTypes.bool,
};

ButtonC.defaultProps = {
    fullWidth: false,
    color: 'primary',
    noSpecialStylesDisabled: false,
};

export default ButtonC;
