import React, { FC } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import classes from '../../../css/Profile/ProfileInfo/ProfileInfo.module.css'
import { GetStringKeys, Input, Textarea, createField } from '../../../utils/FormControls/FormControls'
import noPhoto from '../../../assets/img/no-photo.png'
import { UserProfileType } from '../../../types/types'

type MyDataFormPropsType = {
    profile: UserProfileType
}

type ProfileTypeKeys = GetStringKeys<UserProfileType>

const MyDataForm: FC<InjectedFormProps<UserProfileType, MyDataFormPropsType> & MyDataFormPropsType> = ({handleSubmit, profile, error}) => {
    return (
        <div className={classes.info_page}>
            <div className={classes.avatar}>
                <img 
                    src={profile.photos.large !== null ? profile.photos.large : noPhoto} 
                    alt='' 
                    className={classes.user_photo} />
            </div>
            <div className={classes.data}>
                <form onSubmit={handleSubmit}>
                    {createField<ProfileTypeKeys>(Input, 'fullName', 'Имя', 'input', [], '')}
                    {createField<ProfileTypeKeys>(Textarea, 'aboutMe', 'Обо мне', '', [], '')}
                    <label className="input_checkbox__customized">
                        {createField(Input, 'lookingForAJob', undefined, 'checkbox', [], 'Ищу работу')}
                    </label>
                    {createField<ProfileTypeKeys>(Textarea, 'lookingForAJobDescription', 'Описание работы', '', [], '')}
                    <span>
                        {Object.keys(profile.contacts).map(key => {
                            return <div key={key} className={classes.contact}>
                                    <b>{key}:</b> 
                                    {createField(Input, 'contacts.' + key, key, 'input', [], '')}
                                </div>
                        })}
                    </span>
                    {error && 
                        <div className='form_error'>
                            {error}
                        </div>}
                    <button type='submit'>
                        Сохранить профиль
                    </button>
                </form>
            </div>
        </div>
    )
}

const MyDataFormReduxForm = reduxForm<UserProfileType, MyDataFormPropsType>({
    form: 'editProfile'
})(MyDataForm)

export default MyDataFormReduxForm