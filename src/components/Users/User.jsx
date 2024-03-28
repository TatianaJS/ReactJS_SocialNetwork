import React from 'react';
import classes from '../../css/Users/Users.module.css';
import noPhoto from '../../assets/img/no-photo.png';
import { NavLink } from 'react-router-dom';

const User = ({user, followingInProgress, follow, unfollow}) => {
    return (
        <div>
            <div className={classes.info}>
                <NavLink to={'/profile/' + user.id}>
                    <img 
                        src={user.photos.small !== null ? user.photos.small : noPhoto} 
                        alt='' 
                        className={classes.user_photo} />
                </NavLink>
                <div className={classes.user_info}>
                    <div>
                        <span className={classes.u_name}>
                            {user.name}
                        </span>
                        <span className={classes.u_status}>
                            {user.status}
                        </span>
                    </div>
                </div>
            </div>
            <div className={classes.follow_buttons}>
                {user.followed 
                ? <button 
                    disabled={followingInProgress.some(id => id === user.id)} 
                    className={classes.unfollow_btn} 
                    onClick={() => {unfollow(user.id)}}>
                        Отписаться</button> 
                : <button 
                    disabled={followingInProgress.some(id => id === user.id)}
                    className={classes.follow_btn} 
                    onClick={() => {follow(user.id)}}>
                    Подписаться</button>
                }
            </div>
        </div>
    )
}

export default User;