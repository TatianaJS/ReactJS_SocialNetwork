import React, { FC } from 'react'
import classes from '../../css/Header/Header.module.css'
import Drevo from '../../assets/img/drevo_w.png'
import { NavLink } from 'react-router-dom'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUserLogin, selectIsAuthorized } from '../../redux/authSelectors'
import { AppDispatch } from '../../redux/redux-store'
import { logingOut } from '../../redux/authReducer'

export type HeaderMapPropsType = {}
const Header: FC<HeaderMapPropsType> = (props) => {
    const isAuthorized = useSelector(selectIsAuthorized)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch:AppDispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logingOut())
    }

    return (
        <header className={classes.header}>
            <img 
                src={Drevo} 
                alt='Social Network Drevo' />
            <div className={classes.auth_block}>
                {isAuthorized ? 
                    <div>
                        <div className={classes.authInfo}>
                            <Avatar 
                                style={{backgroundColor: '#87d068'}} 
                                icon={<UserOutlined />} />
                            {login}
                        </div>
                        <button 
                            className={classes.signout_btn}
                            onClick={logoutCallback}>
                                Выйти
                            </button>
                        </div>
                : <NavLink to={'/auth'}>Авторизация</NavLink>
                }
            </div>
        </header>
    )
}

export default Header