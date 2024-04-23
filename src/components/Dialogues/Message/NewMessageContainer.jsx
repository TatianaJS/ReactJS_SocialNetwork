import React from 'react'
import {addMsgCreator, newMsgPostCreator} from '../../../redux/dialoguesReducer.js'
import NewMessage from './NewMessage.js'

const NewMessageContainer = (props) => {
    let addMsg = () => {
        props.store.dispatch(addMsgCreator())
    }

    let onMsgChange = (msgText) => {
        props.store.dispatch(newMsgPostCreator(msgText))
    }

    return (
        <NewMessage 
            newMsgPost={onMsgChange} 
            addMsg={addMsg} 
            newMessageText={props.pageDialogues.newMessageText} />
    )
}

export default NewMessageContainer