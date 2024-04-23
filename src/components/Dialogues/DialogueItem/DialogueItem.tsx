import React, { FC } from 'react'
import classes from '../../../css/Dialogues/DialogueItem/DialogueItem.module.css'
import {NavLink} from 'react-router-dom'

type DialogueItemPropsType = {
    id: number
    image: string | undefined
    name: string
}

const DialogueItem: FC<DialogueItemPropsType> = (props) => {
    return (
        <div className={classes.dialogue}>
            <NavLink to={'/messages/' + props.id}>
                <img src={props.image} alt='' />
                {props.name}
            </NavLink>
        </div>
    )
}

export default DialogueItem