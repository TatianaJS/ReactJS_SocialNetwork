import React from 'react';
import Nav from './Navbar/Nav';
import FriendsContainer from './Friends/FriendsContainer';
import classes from '../../css/Sidebar/Sidebar.module.css';

const Sidebar = (props) => {
    return (
        <div className={classes.sidebar}>
            <Nav />
            <FriendsContainer friends={props.friends} />
        </div>
    );
}

export default Sidebar;