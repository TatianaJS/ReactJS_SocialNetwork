import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostContainer';

const Profile = (props) => {
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
    );
}

export default Profile;