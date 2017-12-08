import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import * as colors from '../../helpers/colors';
import * as fonts from '../../helpers/fonts';

const ButtonC = (props) => {
    const bgColor = () => {
        switch (props.color) {
        case 'primary':
            return colors.primary;
        case 'secondary':
            return colors.secondary;
        case 'FB': {
            return colors.blueFb;
        }
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
            textStyle={{ textAlign: 'center', fontFamily: fonts.regular }}
            containerViewStyle={containerViewStyle}
            borderRadius={50}
            large
            disabledStyle={newDisabledStyle}
            fontFamily="Roboto-Medium"
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
