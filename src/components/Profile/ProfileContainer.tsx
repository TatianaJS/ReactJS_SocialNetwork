import React from 'react'
import { Navigate, RouteProps, RouterProps, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Profile from './Profile'
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile } from '../../redux/profileReducer'
import { AppStateType } from '../../redux/redux-store'
import { UserProfileType } from '../../types/types'

type MapToProps = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: UserProfileType) => Promise<any>
}

type PathParamsType = {
    userId: string
    children?: React.ReactNode
}

type ProfileContainerPropsType = MapToProps & DispatchPropsType & RouterProps<PathParamsType>

export function withRouter(Children: any) {
    return(props: MapToProps) => {
        const match = { params: useParams() }
        return <Children {...props} match={match} />
    }
}

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    reloadProfile() {
        let userId: number | null = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) return <Navigate to='/auth' />    
        }

        if (!userId) {
            throw new Error('ID should exists in URI params or is state ("authorizedUserId")')
        } else {
            this.props.getUserProfile(userId)
            this.props.getUserStatus(userId)
        }
    }

    componentDidMount() {
        this.reloadProfile()
    }

    componentDidUpdate(prevProps: ProfileContainerPropsType, prevState: ProfileContainerPropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.reloadProfile()
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
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        userProfile: state.pageProfile.userProfile,
        status: state.pageProfile.status,
        authorizedUserId: state.auth.userId,
        isAuthorized: state.auth.isAuthorized
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile }),
    withRouter
)(ProfileContainer)