import * as types from './types';

export function setImage(data) {
    return (dispatch) => {
        dispatch({
            type: types.FETCH_IMAGE,
            payload: data,
        });
    };
}

export function clearImage() {
    return (dispatch) => {
        dispatch({
            type: types.CLEAR_IMAGE,
        });
    };
}
