import React from 'react';
import classes from '../../../css/Profile/ProfileInfo/ProfileInfo.module.css';
import Preloader from '../../Preloader/Preloader';
import noPhoto from '../../../assets/img/no-photo.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    
    return (
        <div>
            <div className={classes.top_img}>
                <img 
                    src="https://avatars.dzeninfra.ru/get-zen_doc/196027/pub_5cb2e7b9c07b6700b34e992c_5cb2ebb66749e800b419fc58/scale_2400" 
                    alt=''/>
            </div>
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
            <div className={classes.info}>
                <div className={classes.avatar}>
                    <img 
                        src={props.profile.photos.large !== null ? props.profile.photos.large : noPhoto} 
                        alt='' 
                        className={classes.user_photo} />
                </div>
                <div className={classes.data}>
                    <div className={classes.fio}>
                        {props.profile.fullName}
                    </div>
                    <div>
                        { props.profile.aboutMe !== null 
                        ? <span><b>Обо мне:</b> {props.profile.aboutMe}</span> 
                        : ''}
                        <span><b>Ищу работу:</b> {props.profile.lookingForAJob ? 'Да' : 'Нет'}</span>
                        { props.profile.lookingForAJobDescription !== null 
                        ? <span><b>Описание работы:</b> {props.profile.lookingForAJobDescription}</span> 
                        : ''}
                        <span>
                            <b>Контакты: </b>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;