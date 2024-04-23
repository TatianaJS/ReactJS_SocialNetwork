import { profileAPI } from './../api/profileAPI'
import { FormAction, stopSubmit } from 'redux-form'
import avImgOne from '../assets/img/avatar_1.png'
import avImgTwo from '../assets/img/avatar_5.jpg'
import avImgThree from '../assets/img/avatar_3.jpg'
import { PhotosType, PostType, UserProfileType } from '../types/types'
import { BaseThunkType, InferActionsTypes } from './redux-store'

const ADD_POST = 'SN/Profie/ADD-POST'
const SET_USER_PROFILE = 'SN/Profie/SET_USER_PROFILE'
const SET_STATUS = 'SN/Profie/SET_STATUS'
const DELETE_POST = 'SN/Profie/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SN/Profie/SAVE_PHOTO_SUCCESS'

let initialState = {
    postsDt: [
        {
            id: 1,
            image: avImgOne,
            message: 'Hi, how are u?',
            likes: 12
        },
        {
            id: 2,
            image: avImgTwo,
            message: 'Hi, everybody!',
            likes: 36
        },
        {
            id: 3,
            image: avImgThree,
            message: 'OK. And u?',
            likes: 26
        }
    ] as Array<PostType>,
    userProfile: null as UserProfileType | null,
    status: '',
    newPostText: ''
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case ADD_POST:
            let newPost = {
                id: state.postsDt.length + 1,
                message: action.newPostText,
                likes: 0
            }
            return {
                ...state,
                postsDt: [...state.postsDt, newPost],
                newPostText: ''
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                postsDt: state.postsDt.filter(p => p.id !== action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile, 
                    photos: action.photos
                } as UserProfileType
            }
        default:
            return state
    };
}

//dispatch
//export const addPostActionCreator = (newPost) => ({type: ADD_POST, newPost});
export const actions = {
    addPostActionCreator: (text: string) => ({type: ADD_POST, newPostText: text} as const),
    setUserProfile: (userProfile: UserProfileType) => ({type: SET_USER_PROFILE, userProfile} as const),
    setStatus: (status: string) => ({type: SET_STATUS, status} as const),
    deletePost: (postId: number) => ({type: DELETE_POST, postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: SAVE_PHOTO_SUCCESS, photos})
}

//thunk
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: UserProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (userId !== null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error('userId cannot be null')
        }
    } else {
        dispatch(stopSubmit('editProfile', {
            _error: data.messages[0]
        }))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>