import { ResponseType, ResultCodeCaptchaEnum, ResultCodesEnum, instance } from './api'

type AuthResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    auth() {
        return instance.get<ResponseType<AuthResponseDataType>>(`auth/me`).then(res => res.data)
    },
    singIn(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance
        .post<ResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha})
        .then(res => res.data)
    },
    singOut() {
        return instance.delete(`auth/login`)
    }
}