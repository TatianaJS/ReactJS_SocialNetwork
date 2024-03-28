import React from 'react';
import classes from '../../../css/Profile/MyPosts/Post.module.css';
import likeImg from '../../../assets/img/like__heart.png';

const Post = (props) => {
    return (
        <div className={classes.posts}>
            <div className={classes.item}>
                <img 
                    src={props.image} 
                    alt='' />
                {props.message}
                <span className={classes.like}>
                    <img 
                        alt='likes'
                        src={likeImg}/>
                    {props.likes}
                </span>
            </div>
        </div>
    );
}

export default Post;