import React, { FC } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import Post from './Post'
import classes from '../../../css/Profile/MyPosts/MyPost.module.css'
import { GetStringKeys, Textarea, createField } from '../../../utils/FormControls/FormControls'
import { requiredField, maxLengthCreator } from '../../../utils/Validators/Validators'
import { PostType } from '../../../types/types'

export type AddPostFormValuesType = {
    newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

export type MyPostsMapPropsType = {
    posts: Array<PostType>
}

export type MyPostsDispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: FC<MyPostsMapPropsType & MyPostsDispatchPropsType> = props => {
    let postsEls = props.posts.map(msg => <Post message={msg.message} likes={msg.likes} key={msg.id} image={msg.image} />)

    let addNewPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={classes.entries}>
            <p>My posts</p>
            <AddPostFormReduxForm onSubmit={addNewPost} />
            {postsEls}
        </div>
    )
}

const MyPostsMemorized = React.memo(MyPosts)

type FormPropsType = {}

const maxLength10 = maxLengthCreator(10)

const AddPostForm: FC<InjectedFormProps<AddPostFormValuesType, FormPropsType> & FormPropsType> = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                {createField<AddPostFormValuesTypeKeys>(Textarea, 'newPostText', 'Введите сообщение', '', [requiredField, maxLength10], '')}
                <button type='submit'>
                    Отправить
                </button>
            </form>
        </div>
    )
}

const AddPostFormReduxForm = reduxForm<AddPostFormValuesType, FormPropsType>({form: 'addPost'})(AddPostForm)

export default MyPostsMemorized