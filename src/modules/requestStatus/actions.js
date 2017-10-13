import * as types from './types';

export function setLoading(domain) {
    return {
        type: types.LOADING,
        domain,
    };
}

export function setError(error, domain) {
    return {
        type: types.ERROR,
        payload: error,
        domain,
    };
}

export function setSuccess(response, domain, showMessage = false) {
    return {
        type: types.SUCCESS,
        payload: response,
        domain,
        showMessage,
    };
}

export function setReset(domain) {
    return {
        type: types.RESET,
        domain,
    };
}

export function cleanMessage() {
    return {
        type: types.CLEAN_MESSAGE,
    };
}
