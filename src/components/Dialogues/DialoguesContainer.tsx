import React, { ComponentType } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Dialogues from './Dialogues'
import { actions } from '../../redux/dialoguesReducer'
import { withAuthRedirect } from '../../hoc/AuthRedirect'
import { AppStateType } from '../../redux/redux-store'

let mapStateToProps = (state: AppStateType) => {
    return {
        pageDialogues: state.pageDialogues
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {...actions }),
    withAuthRedirect
)(Dialogues)