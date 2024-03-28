import { stopSubmit } from 'redux-form';
import { profileAPI } from '../api/api';
import avImgOne from '../assets/img/avatar_1.png';
import avImgTwo from '../assets/img/avatar_5.jpg';
import avImgThree from '../assets/img/avatar_3.jpg';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

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
    ],
    userProfile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
            /*return {
                ...state,
                postsDt: [...state.postsDt, {
                    id: state.postsDt.length + 1,
                    message: action.newPost,
                    likes: 0
                }]
            };*/
            let newPost = {
                id: state.postsDt.length + 1,
                message: action.newPostText,
                likes: 0
            }
            return {
                ...state,
                postsDt: [...state.postsDt, newPost],
                newPostText: ''
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile, 
                    photos: action.photos
                }
            }
        default:
            return state;
    };
};

//dispatch
//export const addPostActionCreator = (newPost) => ({type: ADD_POST, newPost});
export const addPostActionCreator = (text) => ({type: ADD_POST, newPostText: text});
export const setUserProfile = (userProfile) => ({type: SET_USER_PROFILE, userProfile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});

//thunk
export const getUserProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getUserStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}

export const updateUserStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('editProfile', {
            _error: response.data.messages[0]
        }));
        return Promise.reject(response.data.messages[0]);
    }
}

export default profileReducer;