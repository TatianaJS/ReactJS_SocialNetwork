import dialoguesReducer from "./dialoguesReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";

let store = {
    //свойства
    _state: {
        pageProfile: {
            postsDt: [
                {
                    id: 1,
                    message: 'Hi, how are u?',
                    likes: 12
                },
                {
                    id: 2,
                    message: 'Hi, everybody!',
                    likes: 36
                },
                {
                    id: 3,
                    message: 'OK. And u?',
                    likes: 26
                }
            ],
            newPostText: 'IT project'
        },
        pageDialogues: {
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
            ],
            newMessageText: 'IT development'
        },
        sidebar: {
            friends: [
                {
                    id: 1,
                    name: 'Мария Кононова',
                    image: 'avatar_1.png' 
                },
                {
                    id: 2,
                    name: 'Антон Роднинский',
                    image: 'avatar_2.jpg'
                },
                {
                    id: 3,
                    name: 'Мартин Чан',
                    image: 'avatar_5.jpg'
                },
                {
                    id: 4,
                    name: 'Алексей Малик',
                    image: 'avatar_4.jpg'
                },
                {
                    id: 5,
                    name: 'Евгения Русланова',
                    image: 'avatar_3.jpg'
                }
            ]
        }
    },
    //методы
    _callSubscriber() {
        console.log('State is changed.');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.pageProfile = profileReducer(this._state.pageProfile, action);
        this._state.pageDialogues = dialoguesReducer(this._state.pageDialogues, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
}

export default store;

window.store = store;