import React, { FC, useState } from 'react'
import Preloader from '../../Preloader/Preloader'
import MyData from './MyData'
import MyDataForm from './MyDataForm'
import { UserProfileType } from '../../../types/types'

type ProfileInfoType = {
    profile: UserProfileType | null
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    saveProfile: (profile: UserProfileType) => Promise<any>
    savePhoto: (file: File) => void
}

const ProfileInfo: FC<ProfileInfoType> = ({profile, status, updateStatus, isOwner, saveProfile, savePhoto}) => {
    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader />
    }

    const onSubmit = async(formData: UserProfileType) => {
        saveProfile(formData)
            .then(() => {
                setEditMode(false)
            })
    }
    
    return <div>
        {editMode 
            ? <MyDataForm 
                initialValues={profile}
                profile={profile} 
                onSubmit={onSubmit} /> 
            : <MyData 
                profile={profile} 
                isOwner={isOwner}
                savePhoto={savePhoto}
                onEditMode={ () => {setEditMode(true)} }
                status={status}
                updateStatus={updateStatus} />
        }
    </div>
}

export default ProfileInfo