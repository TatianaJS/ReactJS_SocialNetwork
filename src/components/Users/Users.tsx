import React, { FC, useEffect } from 'react'
import classes from '../../css/Users/Users.module.css'
import Paginator from '../Paginator/Paginator'
import User from './User'
import { FilterType, requestUsers } from '../../redux/usersReducer'
import { UsersSearchForm } from './UsersSearchForm'
import { useDispatch, useSelector } from 'react-redux'
import { getCurPage, getFollowingInProgress, getPageSize, getTotalItemsCount, getUsers, getUsersFilter } from '../../redux/usersSelectors'
import { AppDispatch } from '../../redux/redux-store'
import { useNavigate, useSearchParams } from 'react-router-dom'

type PropsType = {}

type QueryParamsType = {
    term?: string
    page?: string
    friend?: string
}

export const Users: FC<PropsType> = (props) => {
    const users = useSelector(getUsers)
    const totalItemsCount = useSelector(getTotalItemsCount)
    const currentPage = useSelector(getCurPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch:AppDispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParameters] = useSearchParams()

    useEffect(() => {
        const parsed = Object.fromEntries(new URLSearchParams(searchParameters.toString())) as QueryParamsType
        // equals const parsed = Object.fromEntries(searchParameters)

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if (!!parsed.friend)
            switch(parsed.friend) {
                case 'null':
                    actualFilter = {...actualFilter, friend: null}
                    break
                case 'true':
                    actualFilter = {...actualFilter, friend: true}
                    break
                default:
                    actualFilter = {...actualFilter, friend: false}
            }
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        navigate({
            pathname: '/users',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const follow = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged} />

        <Paginator 
            currentPage={currentPage} 
            onPageChanged={onPageChanged} 
            totalItemsCount={totalItemsCount} 
            pageSize={pageSize} />
        <div className={classes.users_list}>
            {users.map(u => <User 
                                user={u} 
                                key={u.id} 
                                followingInProgress={followingInProgress}
                                follow={follow}
                                unfollow={unfollow} />)}
        </div> 
    </div>
}