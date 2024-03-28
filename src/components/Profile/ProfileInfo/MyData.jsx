import React from 'react';
import classes from '../../../css/Profile/ProfileInfo/ProfileInfo.module.css';
import noPhoto from '../../../assets/img/no-photo.png';
import MyContact from './MyContacts';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const MyData = ({profile, isOwner, savePhoto, onEditMode, status, updateStatus}) => {
    const onMyProfilePhotoUploading = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    return (
        <div className={classes.info_page}>
            <div className={classes.avatar}>
                <img 
                    src={profile.photos.large !== null ? profile.photos.large : noPhoto} 
                    alt='' 
                    className={classes.user_photo} />
                {isOwner && 
                    <input type='file' onChange={onMyProfilePhotoUploading} />}
            </div>
            <div className={classes.data}>
                <div className={classes.line_one}>
                    <div className={classes.fio}>
                        {profile.fullName}
                        <ProfileStatusWithHooks 
                            status={status}
                            updateStatus={updateStatus} />
                    </div>
                    {isOwner && <div>
                        <button onClick={onEditMode}>
                            Редактировать профиль
                        </button>
                    </div>}
                </div>
                <div className={classes.info}>
                    {profile.aboutMe && 
                        <span><b>Обо мне:</b> {profile.aboutMe}</span>}
                    <span><b>Ищу работу:</b> {profile.lookingForAJob ? 'Да' : 'Нет'}</span>
                    {profile.lookingForAJobDescription && 
                        <span><b>Описание работы:</b> {profile.lookingForAJobDescription}</span>}
                    <span className={classes.separate}>Контакты</span>
                    {Object.keys(profile.contacts).map((key, index) => {
                        return <MyContact 
                                    key={index} 
                                    contactTitle={key} 
                                    contactValue={profile.contacts[key]} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default MyData;