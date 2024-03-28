import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../api/api';
import axios from 'axios';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuthorized: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTH_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
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

export const getCaptchaURLSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS, 
    payload: {captchaUrl}
});

//thunk
export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.auth();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
}

export const Authorization = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.singIn(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if(response.data.resultCode === 10) {
            dispatch(getCaptchaURL());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Error!';
        dispatch(stopSubmit('signIn', {
            _error: message
        }));
    }
}

export const getCaptchaURL = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaURL();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaURLSuccess(captchaUrl));
}

export const logingOut = () => async (dispatch) => {
    let response = await authAPI.singOut();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false, null));
    }
}

export default authReducer;