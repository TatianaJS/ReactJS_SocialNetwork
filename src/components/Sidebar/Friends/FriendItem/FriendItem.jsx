import React from 'react';
import classes from '../../../../css/Sidebar/Friends/FriendItem/FriendItem.module.css';
import {NavLink} from 'react-router-dom';

const FriendItem = (props) => {
    return (
        <div className={classes.friend}>
            <NavLink to={'/friends/' + props.id}>
                <img src={props.image} alt='' />
                {props.name}
            </NavLink>
        </div>
    );
}

export default FriendItem;