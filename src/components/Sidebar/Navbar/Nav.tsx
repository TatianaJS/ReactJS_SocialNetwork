import React, { FC } from 'react'
import {NavLink} from 'react-router-dom'
import classes from '../../../css/Sidebar/Navbar/Nav.module.css'

const Nav: FC = () => {
    return (
        <nav className={classes.nav}>
            <div className={classes.item}>
                <NavLink 
                    to='/profile' 
                    className={navData => navData.isActive ? classes.active : ''}>
                    Профиль
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink 
                    to='/users' 
                    className={navData => navData.isActive ? classes.active : ''}>
                    Пользователи
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink 
                    to='/chat'
                    className={navData => navData.isActive ? classes.active : ''}>
                    Чат
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink 
                    to='/messages'
                    className={navData => navData.isActive ? classes.active : ''}>
                    Сообщения
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink 
                    to='/news'
                    className={navData => navData.isActive ? classes.active : ''}>
                    Новости
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink 
                    to='/music'
                    className={navData => navData.isActive ? classes.active : ''}>
                    Музыка
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink 
                    to='/settings'
                    className={navData => navData.isActive ? classes.active : ''}>
                    Настройки
                </NavLink>
            </div>
      </nav>
    )
}

export default Nav