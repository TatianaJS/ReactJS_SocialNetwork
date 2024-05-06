import { applyMiddleware, combineReducers, legacy_createStore, compose, Action, AnyAction } from 'redux'
import profileReducer from './profileReducer'
import dialoguesReducer from './dialoguesReducer'
import sidebarReducer from './sidebarReducer'
import usersReducer from './usersReducer'
import authReducer from './authReducer'
import { ThunkAction, ThunkDispatch, thunk } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './appReducer'
import chatReducer from './chatReducer'

const thunkMiddleware = thunk

let rootReducer = combineReducers({
    pageProfile: profileReducer,
    pageDialogues: dialoguesReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
    chat: chatReducer
})

type RootReducerType = typeof rootReducer // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

//type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
//export type InferActionsTypes<T extends {[keys: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type InferActionsTypes<T> = T extends {[keys: string]: (...args: any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

export type AppDispatch = typeof store.dispatch

//для Redux DevTools
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

//основной
//let store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

//@ts-ignore
window.__store__ = store

export default store