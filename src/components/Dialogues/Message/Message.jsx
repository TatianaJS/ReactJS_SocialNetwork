import React from 'react';
import classes from '../../../css/Dialogues/Message/Message.module.css';

const Message = (props) => {
    return (
        <div className={`${classes.item} msg_${props.sendFrom}`}>
            {props.message}
        </div>
    );
}

export default Message;