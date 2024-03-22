const ADD_MSG = 'ADD-MSG';

let initialState = {
    dialoguesDt: [
        {
            id: 1,
            name: 'Мария',
            image: 'avatar_1.png'
        },
        {
            id: 2,
            name: 'Антон',
            image: 'avatar_2.jpg'
        },
        {
            id: 3,
            name: 'Мартин',
            image: 'avatar_5.jpg'
        },
        {
            id: 4,
            name: 'Алексей',
            image: 'avatar_4.jpg'
        },
        {
            id: 5,
            name: 'Евгения',
            image: 'avatar_3.jpg'
        }
    ],
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
    ]
};

const dialoguesReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_MSG:
            let newMsg = action.newMessage;
            return {
                ...state,
                messagesDt: [...state.messagesDt, {
                    id: state.messagesDt.length + 1,
                    message: newMsg,
                    sender: 'im'
                }]
            };
        default:
            return state;
    };
};

export const addMsgCreator = (newMessage) => ({type: ADD_MSG, newMessage});

export default dialoguesReducer;