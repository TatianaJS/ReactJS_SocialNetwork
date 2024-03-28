import React from 'react';
import { reduxForm } from 'redux-form';
import classes from '../../../css/Profile/ProfileInfo/ProfileInfo.module.css';
import { Input, Textarea, createField } from '../../../utils/FormControls/FormControls';
import noPhoto from '../../../assets/img/no-photo.png';

const MyDataForm = ({handleSubmit, profile, error}) => {
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
                    {createField(Input, 'fullName', 'Имя', 'input', [], '')}
                    {createField(Textarea, 'aboutMe', 'Обо мне', '', [], '')}
                    <label className="input_checkbox__customized">
                        {createField(Input, 'lookingForAJob', null, 'checkbox', [], 'Ищу работу')}
                    </label>
                    {createField(Textarea, 'lookingForAJobDescription', 'Описание работы', '', [], '')}
                    <span>
                        {Object.keys(profile.contacts).map(key => {
                            return <div key={key} className={classes.contact}>
                                    <b>{key}:</b> {createField(Input, 'contacts.' + key, key, 'input', [], '')}
                                </div>
                        })}
                    </span>
                    {error && 
                        <div className='form_error'>{error}</div>}
                    <button type='submit'>
                        Сохранить профиль
                    </button>
                </form>
            </div>
        </div>
    )
}

const MyDataFormReduxForm = reduxForm({
    form: 'editProfile'
})(MyDataForm);

export default MyDataFormReduxForm;