import React, { FC } from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostContainer'
import { UserProfileType } from '../../types/types'

type ProfilePropsType = {
    isOwner: boolean
    userProfile: UserProfileType | null
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: UserProfileType) => Promise<any>
}

const Profile: FC<ProfilePropsType> = (props) => {
    return (
        <div>
            <ProfileInfo 
                isOwner={props.isOwner}
                profile={props.userProfile} 
                status={props.status} 
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile