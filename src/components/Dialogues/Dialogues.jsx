import React from 'react';
import { Field, reduxForm } from 'redux-form';
import classes from '../../css/Dialogues/Dialogues.module.css';
import DialogueItem from '../Dialogues/DialogueItem/DialogueItem';
import Message from '../Dialogues/Message/Message';
import { Textarea } from '../../utils/FormControls/FormControls';
import { requiredField, maxLengthCreator } from '../../utils/Validators/Validators';

const Dialogues = (props) => {
    let state = props.pageDialogues;

    let dialoguesEls = state.dialoguesDt.map(chat => <DialogueItem name={chat.name} id={chat.id} key={chat.id} image={chat.image} />);

    let messagesEls = state.messagesDt.map(msg => <Message message={msg.message} sendFrom={msg.sender} key={msg.id} />);

    let addMsgNew = (values) => {
        props.addMsg(values.newMessage);
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
    );
}

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
        <div>
            <form 
                className={classes.form}
                onSubmit={ props.handleSubmit }>
                <Field 
                    component={Textarea}
                    name='newMessage'
                    placeholder='Введите сообщение'
                    validate={[requiredField, maxLength50]} />
                <button type='submit'>
                    Отправить
                </button>
            </form>
        </div>
    )
}

const AddMessageReduxForm = reduxForm({form: 'addMessage'})(AddMessageForm)

export default Dialogues;