import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

let mapStateToPropsAuthRedirect = (state) => {
    return {
        isAuthorized: state.auth.isAuthorized
    }
}

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuthorized) return <Navigate to='/auth' />
            return <Component {...this.props} />
        }
    }
    
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsAuthRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
};