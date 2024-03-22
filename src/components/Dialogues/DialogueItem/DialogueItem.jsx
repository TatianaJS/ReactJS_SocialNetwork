import React from 'react';
import classes from '../../../css/Dialogues/DialogueItem/DialogueItem.module.css';
import {NavLink} from 'react-router-dom';

const DialogueItem = (props) => {
    return (
        <div className={classes.dialogue}>
            <NavLink to={'/messages/' + props.id}>
                <img src={'/img/' + props.image} alt='' />
                {props.name}
            </NavLink>
        </div>
    );
}

export default DialogueItem;