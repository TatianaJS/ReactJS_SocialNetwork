import React, { FC } from 'react'
import classes from '../../../css/Dialogues/Message/Message.module.css'

type MessagePropsType = {
    message: string
    sendFrom: string
}

const Message: FC<MessagePropsType> = (props) => {
    return (
        <div className={`${classes.item} msg_${props.sendFrom}`}>
            {props.message}
        </div>
    )
}

export default Message