import React, { FC, UIEvent, useEffect, useRef, useState } from 'react'
import classes from '../../css/ChatPage.module.css'
import { ChatMessageType } from '../../api/chatAPI'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chatReducer'
import { AppDispatch, AppStateType } from '../../redux/redux-store'
import noPhoto from '../../assets/img/no-photo.png'

const ChatPage: FC = () => {
    return <>
        <Chat />
    </>
}

const Chat: FC = () => {
    const dispatch:AppDispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])
    
    return <>
        {status === 'error' && <div>Some error occured. Please, refresh this page</div>}
        <Messages />
        <AddMessageForm />
    </>
}

const Messages: FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 400) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }
    
    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }    
    }, [messages])

    return <div className={classes.message_list} onScroll={scrollHandler}>
        {messages.map(m => <Message key={m.id} message={m} />)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

const Message: FC<{message: ChatMessageType}> = React.memo(({message}) => {
    return <div className={classes.message_item}>
        <img 
            src={message.photo !== null ? message.photo : noPhoto} 
            alt='' />
        <div>
            <b>{message.userName}</b>
            <div>
                {message.message}
            </div>
        </div>
    </div>
})

const AddMessageForm: FC = () => {
    const [message, setMessage] = useState('')
    const dispatch: AppDispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMsg = () => {
        if (!message) {
            return
        }

        dispatch(sendMessage(message))
        setMessage('')
    }

    return <>
        <textarea 
            onChange={(e) => setMessage(e.currentTarget.value)} 
            value={message} />
        <button 
            disabled={status !== 'ready'}
            onClick={sendMsg}>
            Отправить
        </button>
    </>
}

export default ChatPage