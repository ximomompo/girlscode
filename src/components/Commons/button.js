import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
// import * as colors from '../../helpers/colors';

const ButtonC = (props) => {
    const { buttonStyle, ...other } = props;
    const newButtonStyle = Object.assign({}, props.buttonStyle, {
    });
    const containerViewStyle = {
        marginTop: 8,
        marginBottom: 8,
        width: (props.fullWidth) ? '100%' : 'auto',
    };
    return (
        <Button
            buttonStyle={newButtonStyle}
            textStyle={{ textAlign: 'center' }}
            containerViewStyle={containerViewStyle}
            borderRadius={20}
            large
            {...other}
        />
    );
};

ButtonC.PropTypes = {
    fullWidth: PropTypes.bool,
};

ButtonC.defaultProps = {
    fullWidth: false,
};

export default ButtonC;
