import React from 'react'
import { Navigate, RouteProps, useLocation, useNavigate, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Profile from './Profile'
import { 
    getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile 
} from '../../redux/profileReducer'
import { AppStateType } from '../../redux/redux-store'
import { UserProfileType } from '../../types/types'

type MapToProps = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: UserProfileType) => Promise<any>
    router: any
    profile: any
}

type PathParamsType = {
    userId: string
}

type ProfileContainerPropsType = MapToProps & DispatchPropsType

/*export function withRouter(Children: any) {
    return(props: MapToProps) => {
        const match = { params: useParams() }
        return <Children {...props} match={match} />
    }
}*/

class ProfileContainer extends React.Component<ProfileContainerPropsType & RouteProps> {
    constructor(props: ProfileContainerPropsType) {
        super(props)
    }

    reloadProfile() {
        let userId: number | null = +this.props.router.params.userId
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
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.reloadProfile()
        }
    }

    render() {
        if (!this.props.isAuthorized && !this.props.router.params.userId) {
            return <Navigate to={'/login'} />
         }
        return (
            <div>
                <Profile 
                    { ...this.props } 
                    isOwner={!this.props.router.params.userId}
                    userProfile={this.props.userProfile} 
                    status={this.props.status} 
                    updateStatus={this.props.updateUserStatus}
                    savePhoto={this.props.savePhoto}
                    saveProfile={this.props.saveProfile} />
            </div>
        )
    }
}

function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
       let location = useLocation()
       let navigate = useNavigate()
       let params = useParams()
 
       return <Component
          {...props}
          router={{location, navigate, params}} />
    }
 
    return ComponentWithRouterProp
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