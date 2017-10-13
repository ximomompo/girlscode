import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import requestStatus from './requestStatus/reducers';

const rootReducer = combineReducers({
    requestStatus,
    form,
});

export default rootReducer;
