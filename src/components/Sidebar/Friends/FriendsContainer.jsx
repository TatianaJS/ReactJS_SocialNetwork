import Friends from './Friends';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        friends: state.sidebar
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
       
    }
};

const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends);

export default FriendsContainer;