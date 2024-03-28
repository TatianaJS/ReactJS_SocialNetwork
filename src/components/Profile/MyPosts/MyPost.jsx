import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Post from '../MyPosts/Post';
import classes from '../../../css/Profile/MyPosts/MyPost.module.css';
import { Textarea } from '../../../utils/FormControls/FormControls';
import { requiredField, maxLengthCreator } from '../../../utils/Validators/Validators';

const MyPosts = React.memo(props => {
    let postsEls = props.posts.map(msg => <Post message={msg.message} likes={msg.likes} key={msg.id} image={msg.image} />);

    let addNewPost = (values) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={ classes.entries }>
            <p>My posts</p>
            <AddPostFormReduxForm onSubmit={ addNewPost } />
            { postsEls }
        </div>
    );
});

const maxLength10 = maxLengthCreator(10);

const AddPostForm = (props) => {
    return (
        <div>
            <form onSubmit={ props.handleSubmit }>
                <Field 
                    component={Textarea}
                    name='newPost'
                    placeholder='Введите сообщение'
                    validate={[requiredField, maxLength10]} />
                <button type='submit'>
                    Отправить
                </button>
            </form>
        </div>
    )
}

const AddPostFormReduxForm = reduxForm({form: 'addPost'})(AddPostForm)

export default MyPosts;