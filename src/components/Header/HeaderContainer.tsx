import React from 'react'
import { connect } from 'react-redux'
import Header, { HeaderDispatchPropsType, HeaderMapPropsType } from './Header'
import { logingOut } from '../../redux/authReducer'
import { AppStateType } from '../../redux/redux-store'

class HeaderContainer extends React.Component<HeaderMapPropsType & HeaderDispatchPropsType> {
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuthorized: state.auth.isAuthorized,
    login: state.auth.login
})

export default connect<HeaderMapPropsType, HeaderDispatchPropsType, {}, AppStateType>(mapStateToProps, { logingOut })(HeaderContainer)