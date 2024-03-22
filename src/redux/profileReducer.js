import { profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    postsDt: [
        {
            id: 1,
            message: 'Hi, how are u?',
            likes: 12
        },
        {
            id: 2,
            message: 'Hi, everybody!',
            likes: 36
        },
        {
            id: 3,
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
        default:
            return state;
    };
};

//dispatch
//export const addPostActionCreator = (newPost) => ({type: ADD_POST, newPost});
export const addPostActionCreator = (text) => ({type: ADD_POST, newPostText: text});
export const setUserProfile = (userProfile) => ({type: SET_USER_PROFILE, userProfile});
export const setStatus = (status) => ({type: SET_STATUS, status});

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

export default profileReducer;