import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '../Commons';
import { getStatus } from '../../modules/requestStatus/selectors';

const StatusButton = (props) => {
    const defaultButton = (
        <Button
            title={props.textDefault}
            {...props}
        />
    );
    switch (props.requestStatus) {
    case 'loading': {
        const { icon, ...other } = props;
        return (
            <Button
                title={props.textLoading}
                disabled
                noSpecialStylesDisabled
                loading
                activityIndicatorStyle={{ position: 'absolute', left: 8, top: 30 }}
                {...other}
            />
        );
    }
    case 'success':
        return (
            <Button
                title={props.textSuccess}
                {...props}
            />
        );
    case 'error':
        if (!props.reset) {
            return defaultButton;
        }
        return (
            <Button
                title={props.textError}
                {...props}
            />
        );
    default:
        return defaultButton;
    }
};

StatusButton.propTypes = {
    domain: PropTypes.string.isRequired,
    reset: PropTypes.bool,
    textDefault: PropTypes.string,
    textLoading: PropTypes.string,
    textSuccess: PropTypes.string,
    textError: PropTypes.string,
};

StatusButton.defaultProps = {
    reset: false,
    textDefault: 'Guardar',
    textLoading: 'Procesando',
    textSuccess: 'Guardado',
    textError: 'Error',
};

function mapStateToProps(state, ownProps) {
    return {
        requestStatus: getStatus(state, ownProps.domain),
    };
}

export default connect(mapStateToProps)(StatusButton);
