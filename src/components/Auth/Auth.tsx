import React, { FC } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux'
import { Authorization } from '../../redux/authReducer'
import { Navigate } from 'react-router-dom'
import classes from '../../css/Auth/Auth.module.css'
import { GetStringKeys, Input, createField } from '../../utils/FormControls/FormControls'
import { requiredField } from '../../utils/Validators/Validators'
import { AppDispatch, AppStateType } from '../../redux/redux-store'

type AuthorizationFormOwnProps = {
    captchaUrl: string | null
}

const SignInForm: FC<InjectedFormProps<AuthorizationFormValuesType, AuthorizationFormOwnProps> & AuthorizationFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return ( 
        <form 
            className={classes.signin_form}
            onSubmit={handleSubmit}>
            {createField<AuthorizationFormValuesTypeKeys>(Input, 'email', 'E-mail', 'text', [requiredField], '')}
            {createField<AuthorizationFormValuesTypeKeys>(Input, 'password', 'Пароль', 'password', [requiredField], '')}
            <label className='input_checkbox__customized'>
                {createField<AuthorizationFormValuesTypeKeys>(Input, 'rememberMe', undefined, 'checkbox', [], 'Запомнить меня')}
            </label>
            {captchaUrl && <img src={captchaUrl} alt='' />}
            {captchaUrl && createField<AuthorizationFormValuesTypeKeys>(Input, 'captcha', 'Введите символы с картинки', 'text', [requiredField], '')}
            {error && <div className='form_error'>{error}</div>}
            <div>
                <button type='submit'>
                    Авторизоваться
                </button>
            </div>
        </form>
    )
}

const SignInReduxForm = reduxForm<AuthorizationFormValuesType, AuthorizationFormOwnProps>({
    form: 'signIn'
})(SignInForm)

export type AuthorizationFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type AuthorizationFormValuesTypeKeys = GetStringKeys<AuthorizationFormValuesType>

export const AuthPage: FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuthorized = useSelector((state: AppStateType) => state.auth.isAuthorized)
    const dispatch:AppDispatch = useDispatch()

    const onSubmit = (formData: AuthorizationFormValuesType) => {
        dispatch(Authorization(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuthorized) {
        return <Navigate to={'/profile'} />
    }

    return <div>
        <h1 className={classes.page_title}>
            Авторизация
        </h1>
        <SignInReduxForm 
            onSubmit={onSubmit} 
            captchaUrl={captchaUrl} />
    </div>
}