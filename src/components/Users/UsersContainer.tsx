import React, { FC } from 'react'
import { Users } from './Users'
import Preloader from '../Preloader/Preloader'
import { getIsFetching } from '../../redux/usersSelectors'
import { useSelector } from 'react-redux'

type UsersPagePropsType = {
    pageTitle: string
}

export const UsersPage: FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)
    return <>
        <h2>{props.pageTitle}</h2>
        {isFetching ? <Preloader /> : null}
        <Users />
    </>
}