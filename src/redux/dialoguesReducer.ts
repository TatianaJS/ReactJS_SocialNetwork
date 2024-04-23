import avImgOne from '../assets/img/avatar_1.png'
import avImgTwo from '../assets/img/avatar_2.jpg'
import avImgThree from '../assets/img/avatar_3.jpg'
import avImgFour from '../assets/img/avatar_4.jpg'
import avImgFive from '../assets/img/avatar_5.jpg'
import { InferActionsTypes } from './redux-store'

type DialogueType = {
    id: number
    name: string
    image?: string 
}
type MessageType = {
    id: number
    message: string
    sender: string 
}

let initialState = {
    dialoguesDt: [
        {
            id: 1,
            name: 'Мария',
            image: avImgOne
        },
        {
            id: 2,
            name: 'Антон',
            image: avImgTwo
        },
        {
            id: 3,
            name: 'Мартин',
            image: avImgThree
        },
        {
            id: 4,
            name: 'Алексей',
            image: avImgFour
        },
        {
            id: 5,
            name: 'Евгения',
            image: avImgFive
        }
    ] as Array<DialogueType>,
    messagesDt: [
        {
            id: 1,
            message: 'Hi!',
            sender: 'friend'
        },
        {
            id: 2,
            message: 'How r u?',
            sender: 'friend'
        },
        {
            id: 3,
            message: 'OK. And you?',
            sender: 'im'
        },
        {
            id: 4,
            message: 'Awesome!',
            sender: 'friend'
        }
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

const dialoguesReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'SN/Dialogues/ADD-MSG':
            let newMsg = action.newMessage
            return {
                ...state,
                messagesDt: [...state.messagesDt, {
                    id: state.messagesDt.length + 1,
                    message: newMsg,
                    sender: 'im'
                }]
            }
        default:
            return state
    };
}

export const actions = {
    addMsg: (newMessage: string) => ({type: 'SN/Dialogues/ADD-MSG', newMessage} as const)
}

export default dialoguesReducer