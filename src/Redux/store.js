import { applyMiddleware, legacy_createStore as createStore, compose } from 'redux';
import { thunk } from 'redux-thunk'; // Make sure the import is correct
import Reducers from './rootReducer';

export default function configureStore() {
    const middlewareEnhancer = applyMiddleware(thunk);

    // Optional: Use Redux DevTools if available
    const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(Reducers, composedEnhancers(middlewareEnhancer));

    return store;
}
