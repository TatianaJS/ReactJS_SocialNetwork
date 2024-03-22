import React from 'react';
import FriendItem from './FriendItem/FriendItem';
import classes from '../../../css/Sidebar/Friends/Friends.module.css';

const Friends = (props) => {
    let state = props.friends;
    let friendsEls = state.friends.map(friend => <FriendItem key={friend.id} id={friend.id} name={friend.name} image={friend.image} />);

    return (
        <div className={classes.friends}>
            <h3>
                Друзья
            </h3>
            <div className={classes.list}>
                {friendsEls}
            </div>
        </div>
    );
}

export default Friends;