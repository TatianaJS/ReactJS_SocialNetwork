import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { 
    follow, 
    setCurrentPage, 
    unfollow, 
    toggleFollowingProgress, 
    setIsFetching, 
    requestUsers } from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/AuthRedirect';
import { 
    getCurPage, 
    getFollowingInProgress, 
    getIsFetching, 
    getPageSize, 
    getTotalItemsCount,
    getUsers } from '../../redux/usersSelectors';

class UsersContainer extends React.Component {
    componentDidMount() {
        let {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }
    
    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber);
    }

    render() { 
        return <>
            { this.props.isFetching ? <Preloader /> : null }
            <Users 
                totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress} />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        currentPage: getCurPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};

export default compose(
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toggleFollowingProgress, setIsFetching, requestUsers})
)(UsersContainer);