import { BaseThunkType, InferActionsTypes } from './redux-store'
import { FormAction, stopSubmit } from 'redux-form'
import { ResultCodeCaptchaEnum, ResultCodesEnum } from '../api/api'
import { authAPI } from './../api/authAPI'
import { securityAPI } from '../api/securityAPI'

export type InitialStateType2 = {
    userId: number | null
    email: string | null
    login: string | null
    isAuthorized: boolean
    captchaUrl: string | null
}

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuthorized: false,
    captchaUrl: null as string | null
}

const authReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch(action.type) {
        case 'SN/Auth/SET_AUTH_USER_DATA':
        case 'SN/Auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

//dispatch
export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuthorized: boolean) => ({
        type: 'SN/Auth/SET_AUTH_USER_DATA',
        payload: {userId, email, login, isAuthorized}
    } as const),
    getCaptchaURLSuccess: (captchaUrl: string) => ({
        type: 'SN/Auth/GET_CAPTCHA_URL_SUCCESS', 
        payload: {captchaUrl}
    } as const)
}

//thunk
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const authData = await authAPI.auth()
    if (authData.resultCode === ResultCodesEnum.Success) {
        const {id, login, email} = authData.data
        dispatch(actions.setAuthUserData(id, login, email, true))
    }
}

export const Authorization = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    const loginData = await authAPI.singIn(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if(loginData.resultCode === ResultCodeCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaURL())
        }
        const message = loginData.messages.length > 0 ? loginData.messages[0] : 'Error!'
        dispatch(stopSubmit('signIn', {
            _error: message
        }))
    }
}

export const getCaptchaURL = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaURL()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaURLSuccess(captchaUrl))
}

export const logingOut = (): ThunkType => async (dispatch) => {
    const response = await authAPI.singOut()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>