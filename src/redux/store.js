import dialoguesReducer from "./dialoguesReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import avImgOne from '../assets/img/avatar_1.png';
import avImgTwo from '../assets/img/avatar_2.jpg';
import avImgThree from '../assets/img/avatar_3.jpg';
import avImgFour from '../assets/img/avatar_4.jpg';
import avImgFive from '../assets/img/avatar_5.jpg';

let store = {
    //свойства
    _state: {
        pageProfile: {
            postsDt: [
                {
                    id: 1,
                    image: avImgOne,
                    message: 'Hi, how are u?',
                    likes: 12
                },
                {
                    id: 2,
                    image: avImgTwo,
                    message: 'Hi, everybody!',
                    likes: 36
                },
                {
                    id: 3,
                    image: avImgThree,
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
                    image: 'https://disk.yandex.ru/i/zd_9XB61xtnjOQ' 
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