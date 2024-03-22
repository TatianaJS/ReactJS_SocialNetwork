import React from 'react';
import classes from '../../../css/Profile/MyPosts/Post.module.css';

const Post = (props) => {
    return (
        <div className={classes.posts}>
            <div className={classes.item}>
                <img src="./img/avatar_1.png" alt='' />
                {props.message}
                <span className={classes.like}>
                    {props.likes}
                </span>
            </div>
        </div>
    );
}

export default Post;