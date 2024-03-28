import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Profile from './Profile';
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile } from '../../redux/profileReducer';

export function withRouter(Children) {
    return(props) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}

class ProfileContainer extends React.Component {
    reloadProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) return <Navigate to='/auth' />    
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.reloadProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.reloadProfile();
        }
    }

    render() {
        return (
            <div>
                <Profile 
                    { ...this.props } 
                    isOwner={!this.props.match.params.userId}
                    userProfile={this.props.userProfile} 
                    status={this.props.status} 
                    updateStatus={this.props.updateUserStatus}
                    savePhoto={this.props.savePhoto}
                    saveProfile={this.props.saveProfile} />
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        userProfile: state.pageProfile.userProfile,
        status: state.pageProfile.status,
        authorizedUserId: state.auth.userId,
        isAuthorized: state.auth.isAuthorized
    }
}

export default compose(
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile }),
    withRouter
)(ProfileContainer);