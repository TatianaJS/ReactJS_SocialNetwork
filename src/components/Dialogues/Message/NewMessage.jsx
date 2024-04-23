import React from 'react'
import classes from '../../../css/Dialogues/Message/NewMessage.module.css'

const NewMessage = (props) => {
    let addMsg = () => {
        props.addMsg()
    }

    let onMsgChange = (e) => {
        let msgText = e.target.value
        props.newMsgPost(msgText)
    }

    return (
        <div>
            <form className={classes.form}>
                <textarea onChange={onMsgChange} value={props.newMessageText} />
                <button type='button' onClick={addMsg}>
                    Отправить
                </button>
            </form>
        </div>
    )
}

export default NewMessage