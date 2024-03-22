import { stopSubmit } from 'redux-form';
import { authAPI } from '../api/api';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuthorized: false
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

//dispatch
export const setAuthUserData = (userId, email, login, isAuthorized) => ({
    type: SET_AUTH_USER_DATA, 
    payload: {userId, email, login, isAuthorized}
});

//thunk
export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.auth();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
}

export const Authorization = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.singIn(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Error!';
        dispatch(stopSubmit('signIn', {
            _error: message
        }));
    }
}

export const logingOut = () => async (dispatch) => {
    let response = await authAPI.singOut();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;