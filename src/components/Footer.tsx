import React, { FC } from 'react'
import classes from '../css/Footer.module.css'

const Footer: FC = () => {
    return (
        <div className={classes.footer}>
            Social Network Drevo ©{new Date().getFullYear()} Created by TatiJ
        </div>
    )
}

export default Footer