import React from 'react';
import { ActivityIndicator } from 'react-native';
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
    case 'loading':
        return (
            <Button
                title={props.textLoading}
                loading
                activityIndicatorStyle={{ position: 'absolute', left: 12 }}
                disabled
                noSpecialStylesDisabled
                {...props}
            />
        );
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
