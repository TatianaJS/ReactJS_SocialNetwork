import React, { FC } from 'react'
import classes from '../../css/Users/Users.module.css'
import Paginator from '../Paginator/Paginator'
import User from './User'
import { UserType } from '../../types/types'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: FC<PropsType> = ({
    currentPage, 
    onPageChanged, 
    totalItemsCount, 
    pageSize, 
    users, 
    ...props}) => {
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

export default Users