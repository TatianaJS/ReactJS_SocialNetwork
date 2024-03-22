import React from 'react';
import {addPostActionCreator} from '../../../redux/profileReducer';
import MyPosts from './MyPost';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        posts: state.pageProfile.postsDt,
        newPostText: state.pageProfile.newPostText
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        /*addPost: (newPost) => {
            dispatch(addPostActionCreator(newPost));
        }*/
        addPost: (text) => {
            dispatch(addPostActionCreator(text));
        }
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;