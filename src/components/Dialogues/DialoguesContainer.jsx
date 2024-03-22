import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Dialogues from './Dialogues';
import { addMsgCreator } from '../../redux/dialoguesReducer';
import { withAuthRedirect } from '../../hoc/AuthRedirect';

let mapStateToProps = (state) => {
    return {
        pageDialogues: state.pageDialogues
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        addMsg: (newMessage) => {
            dispatch(addMsgCreator(newMessage));
        }
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogues);