import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './modules/rootReducers';


export default function configureStore() {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
        ),
    );
    const store = createStore(reducer, {}, enhancer);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept(() => {
            const nextRootReducer = require('./modules/rootReducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
