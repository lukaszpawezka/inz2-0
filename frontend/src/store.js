import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import config from './config';
import auth from './ducks/auth';
import data from './ducks/data';

export const history = createHashHistory({
    hashType: 'slash',
    getUserConfirmation: (message, callback) => callback(window.confirm(message))
});

const reducers = combineReducers({
    router: connectRouter(history),
    auth,
    data
});

let enhancers;
if (config.DEBUG) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancers = composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)));
} else {
    enhancers = applyMiddleware(thunk, routerMiddleware(history));
}

const store = createStore(
    reducers,
    enhancers
);

export default store;