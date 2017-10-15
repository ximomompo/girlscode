import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import requestStatus from './requestStatus/reducers';
import gallery from './gallery/reducers';

const rootReducer = combineReducers({
    requestStatus,
    gallery,
    form,
});

export default rootReducer;
