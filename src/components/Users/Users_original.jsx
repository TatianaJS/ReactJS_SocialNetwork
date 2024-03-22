import React from 'react';
import classes from '../../css/Users/Users.module.css';
import axios from 'axios';
import userPhoto from '../../assets/img/no-pic.png'

const Users = (props) => {
    let getUsers = () => {
        if (props.users.length === 0) {
            axios
                .get('https://social-network.samuraijs.com/api/1.0/users')
                .then(response => {
                    props.setUsers(response.data.items);
                });
        }
    };

    return <div>
        <button onClick={getUsers}>Получить пользователей</button>
        {
            props.users.map(u => <div key={u.id}>
                <div>
                    <img 
                        src={u.photos.small !== null ? u.photos.small : userPhoto} 
                        alt='' 
                        className={classes.user_photo} />
                    <div>
                        {u.followed 
                        ? <button onClick={ () => { props.unfollow(u.id) } }>Отписаться</button> 
                        : <button onClick={ () => { props.follow(u.id) } }>Подписаться</button>}
                    </div>
                </div>
                <div>
                    <div>
                        <span>{u.name}</span>
                        <span>{u.status}</span>
                    </div>
                    <div>
                        <span>{'u.location.city'}</span>
                        <span>{'u.location.country'}</span>
                    </div>
                </div>
            </div>)
        }    
    </div>
};

export default Users;