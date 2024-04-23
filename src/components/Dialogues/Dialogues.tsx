import React, { FC } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import classes from '../../css/Dialogues/Dialogues.module.css'
import DialogueItem from './DialogueItem/DialogueItem'
import Message from './Message/Message'
import { Textarea, createField } from '../../utils/FormControls/FormControls'
import { requiredField, maxLengthCreator } from '../../utils/Validators/Validators'
import { InitialStateType } from '../../redux/dialoguesReducer'

type PropsType = {
    pageDialogues: InitialStateType
    addMsg: (messageText: string) => void
}

export type NewMsgFormType = {
    newMessage: string
}

type NewMsgFormTypeValuesTypeKeys = Extract<keyof NewMsgFormType, string>

type OwnPropsType = {}

const Dialogues: FC<PropsType> = (props) => {
    let state = props.pageDialogues

    let dialoguesEls = state.dialoguesDt.map(chat => <DialogueItem name={chat.name} id={chat.id} key={chat.id} image={chat.image} />)

    let messagesEls = state.messagesDt.map(msg => <Message message={msg.message} sendFrom={msg.sender} key={msg.id} />)

    let addMsgNew = (values: NewMsgFormType) => {
        props.addMsg(values.newMessage)
    }

    return (
        <div className={classes.dialogues}>
            <div className={classes.dialogues_items}>
                {dialoguesEls}
            </div>
            <div className={classes.messages}>
                {messagesEls}
                <AddMessageReduxForm onSubmit={addMsgNew} />
            </div>
        </div>
    )
}

const maxLength50 = maxLengthCreator(50)

const AddMessageForm: FC<InjectedFormProps<NewMsgFormType, OwnPropsType> & OwnPropsType> = (props) => {
    return (
        <div>
            <form 
                className={classes.form}
                onSubmit={props.handleSubmit}>
                    {createField<NewMsgFormTypeValuesTypeKeys>(Textarea, 'newMessage', 'Введите сообщение', '', [requiredField, maxLength50], '')}
                    <button type='submit'>
                        Отправить
                    </button>
            </form>
        </div>
    )
}

const AddMessageReduxForm = reduxForm<NewMsgFormType, OwnPropsType>({form: 'addMessage'})(AddMessageForm)

export default Dialogues