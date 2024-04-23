import React from 'react'
import { actions } from '../../../redux/profileReducer'
import MyPosts, { MyPostsDispatchPropsType, MyPostsMapPropsType } from './MyPost'
import { connect } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store'

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.pageProfile.postsDt
    }
}

const MyPostsContainer = connect<MyPostsMapPropsType, MyPostsDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator
})(MyPosts)

export default MyPostsContainer