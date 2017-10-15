import * as types from './types';

const initalState = null;

export default function (state = initalState, action) {
    switch (action.type) {
    case types.FETCH_IMAGE:
        return Object.assign({}, state, action.payload);
    case types.CLEAR_IMAGE:
        return null;
    default:
        return state;
    }
}
