import React from 'react';
import classes from '../../css/Users/Users.module.css';
import Paginator from '../Paginator/Paginator';
import User from './User';

const Users = ({currentPage, onPageChanged, totalItemsCount, pageSize, users, ...props}) => {
    return <div>
        <Paginator 
            currentPage={currentPage} 
            onPageChanged={onPageChanged} 
            totalItemsCount={totalItemsCount} 
            pageSize={pageSize} />
        <div className={classes.users_list}>
            {users.map(u => <User 
                                user={u} 
                                key={u.id} 
                                followingInProgress={props.followingInProgress}
                                follow={props.follow}
                                unfollow={props.unfollow} />)}
        </div> 
    </div>
}

export default Users;