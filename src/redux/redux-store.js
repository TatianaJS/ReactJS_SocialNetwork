import { applyMiddleware, combineReducers, legacy_createStore, compose } from 'redux';
import profileReducer from './profileReducer';
import dialoguesReducer from './dialoguesReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import { thunk } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './appReducer';

const thunkMiddleware = thunk;

let reducers = combineReducers({
    pageProfile: profileReducer,
    pageDialogues: dialoguesReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
});

//для Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

//основной
//let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));

window.__store__ = store;

export default store;