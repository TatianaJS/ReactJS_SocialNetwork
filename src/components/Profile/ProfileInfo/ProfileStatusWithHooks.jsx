import React, { useEffect, useState } from 'react';
import classes from '../../../css/Profile/ProfileInfo/ProfileStatus.module.css';

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const onEditMode = () => {
        setEditMode(true);
    }

    const offEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            { !editMode &&
                <div className={classes.profile_status}>
                    <span onDoubleClick={onEditMode}>
                        <b>Статус:</b> {props.status || '–'}
                    </span>
                </div>
            }
            { editMode &&
                <div className={classes.profile_status__input}>
                    <input 
                        autoFocus={true}
                        onBlur={offEditMode}
                        onChange={onStatusChange}
                        value={status} />
                </div>
            }
        </div>
    );
};

export default ProfileStatusWithHooks;