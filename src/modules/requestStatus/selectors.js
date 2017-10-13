import _ from 'lodash';

export function getStatus(state, domain) {
    if (!_.has(state, `requestStatus[${domain}].status`)) {
        return 'no-call';
    }
    return state.requestStatus[domain].status;
}

export function getMessage(state, domain) {
    if (!_.has(state, `requestStatus[${domain}].message`)) {
        return null;
    }
    return state.requestStatus[domain].message;
}

export function hasError(state, domain) {
    return (getStatus(state, domain) === 'error');
}

export function isFinished(state, domain) {
    return (getStatus(state, domain) === 'error' || getStatus(state, domain) === 'success');
}

export function isLoading(state, domain) {
    return (getStatus(state, domain) === 'loading');
}

export function getMessageValue(state) {
    if (!_.has(state, 'requestStatus.message.value')) {
        return null;
    }
    return state.requestStatus.message.value;
}

export function getMessageType(state) {
    if (!_.has(state, 'requestStatus.message.type')) {
        return null;
    }
    return state.requestStatus.message.type;
}

export function isSuccess(state, domain) {
    return (getStatus(state, domain) === 'success');
}

export function isPresent(state, domain) {
    return (getStatus(state, domain) !== 'no-call');
}
