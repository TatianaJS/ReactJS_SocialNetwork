import React, { ComponentType, FC } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { AppStateType } from '../redux/redux-store'

let mapStateToPropsAuthRedirect = (state: AppStateType) => {
    return {
        isAuthorized: state.auth.isAuthorized
    }
}

type MapPropsType = {
    isAuthorized: boolean
}

export function withAuthRedirect<WCP extends object> (WrappedComponent: ComponentType<WCP>) {
    const RedirectComponent: FC<MapPropsType> = (props) => {
        let {isAuthorized, ...restProps} = props
        if (!isAuthorized) return <Navigate to='/auth' />
        return <WrappedComponent {...restProps as WCP} />
    }
    
    let ConnectedAuthRedirectComponent = connect<MapPropsType, {}, WCP, AppStateType>(mapStateToPropsAuthRedirect, {})(RedirectComponent)

    return ConnectedAuthRedirectComponent
}