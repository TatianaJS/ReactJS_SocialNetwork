import React from 'react';
import classes from '../../css/Header/Header.module.css';
import Drevo from '../../assets/img/drevo_w.png';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={classes.header}>
            <img src={Drevo} alt='' />
            <div className={classes.auth_block}>
                {props.isAuthorized 
                ? <div>{props.login} <button className={classes.signout_btn} onClick={props.logingOut}>Выйти</button></div>
                : <NavLink to={'/auth'}>Авторизация</NavLink>
                }
            </div>
        </header>
    );
}

export default Header;