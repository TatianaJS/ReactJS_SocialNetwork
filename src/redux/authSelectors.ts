import { AppStateType } from './redux-store'

export const selectIsAuthorized = (state: AppStateType) => {
    return state.auth.isAuthorized
}

export const selectCurrentUserLogin = (state: AppStateType) => {
    return state.auth.login
}