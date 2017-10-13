import * as types from './types';

const initalState = {
    message: null,
};

export default function (state = initalState, action) {
    switch (action.type) {
    case types.LOADING:
        return Object.assign({}, state, {
            [action.domain]: {
                status: 'loading',
            },
        });
    case types.ERROR:
        return Object.assign({}, state, {
            [action.domain]: {
                status: 'error',
                message: action.payload.message,
            },
            message: {
                value: action.payload.message,
                type: 'error',
            },
        });
    case types.SUCCESS: {
        const value = {
            [action.domain]: {
                status: 'success',
                message: action.payload.message,
            },
        };
        if (action.showMessage) {
            value.message = {
                value: action.payload.message,
                type: 'success',
            };
        }
        return Object.assign({}, state, value);
    }
    case types.RESET:
        return Object.assign({}, state, {
            [action.domain]: {
                status: 'reset',
            },
        });
    case types.CLEAN_MESSAGE:
        return Object.assign({}, state, {
            message: null,
        });
    default:
        return state;
    }
}
