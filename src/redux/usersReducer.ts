import { Dispatch } from 'redux'
import { usersAPI } from '../api/usersAPI'
import { UserType } from '../types/types'
import { updateObjectInArray } from '../utils/objHelpers'
import { BaseThunkType, InferActionsTypes } from './redux-store'
import { ResponseType } from '../api/api'

const FOLLOW = 'SN/Users/FOLLOW'
const UNFOLLOW = 'SN/Users/UNFOLLOW'
const SET_USERS = 'SN/Users/SET_USERS'
const SET_CURRENT_PAGE = 'SN/Users/SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'SN/Users/SET_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'SN/Users/TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_PROGRESS = 'SN/Users/TOGGLE_FOLLOWING_PROGRESS'
const SET_FILTER = 'SN/Users/SET_FILTER'

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of users ids
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalItemsCount: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching 
                    ? [...state.followingInProgress, action.userId] 
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        case SET_FILTER:
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state
    }
}

//dispatch
export const actions = {
    affirmFollow: (userId: number) => ({type: FOLLOW, userId} as const),
    affirmUnfollow: (userId: number) => ({type: UNFOLLOW, userId} as const),
    setUsers: (users: Array<UserType>) => ({type: SET_USERS, users} as const),
    setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const),
    setFilter: (filter: FilterType) => ({type: SET_FILTER, payload: filter} as const),
    setTotalItemsCount: (totalItemsCount: number) => ({type: SET_TOTAL_COUNT, totalCount: totalItemsCount} as const),
    setIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId} as const)
}

//thunk
export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.setFilter(filter)) 

        let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
        dispatch(actions.setIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalItemsCount(data.totalCount))
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, 
                                    userId: number, 
                                    apiMethod: (userId: number) => Promise<ResponseType>, 
                                    actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), actions.affirmFollow)
    }
}

export const unfollow = (userId: number): ThunkType =>{
    return async (dispatch: any) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), actions.affirmUnfollow)
    }
}

export default usersReducer

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>