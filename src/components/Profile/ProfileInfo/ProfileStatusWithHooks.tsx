import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import classes from '../../../css/Profile/ProfileInfo/ProfileStatus.module.css'

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: FC<ProfileStatusPropsType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return <div>
            { !editMode &&
                <div className={classes.profile_status}>
                    <span onDoubleClick={onEditMode}>
                        <b>Статус:</b> {props.status || '–'}
                    </span>
                </div>
            }
            {editMode &&
                <div className={classes.profile_status__input}>
                    <input 
                        autoFocus={true}
                        onBlur={offEditMode}
                        onChange={onStatusChange}
                        value={status} />
                </div>
            }
        </div>
}

export default ProfileStatusWithHooks