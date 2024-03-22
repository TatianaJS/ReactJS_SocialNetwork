import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { logingOut } from '../../redux/authReducer';

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuthorized: state.auth.isAuthorized,
    login: state.auth.login
});

export default connect(mapStateToProps, { logingOut })(HeaderContainer);