import avImgOne from '../assets/img/avatar_1.png'
import avImgTwo from '../assets/img/avatar_2.jpg'
import avImgThree from '../assets/img/avatar_3.jpg'
import avImgFour from '../assets/img/avatar_4.jpg'
import avImgFive from '../assets/img/avatar_5.jpg'

type FriendType = {
    id: number
    name: string
    image?: string 
}

let initialState = {
    friends: [
        {
            id: 1,
            name: 'Мария Кононова',
            image: avImgOne 
        },
        {
            id: 2,
            name: 'Антон Роднинский',
            image: avImgTwo
        },
        {
            id: 3,
            name: 'Мартин Чан',
            image: avImgThree
        },
        {
            id: 4,
            name: 'Алексей Малик',
            image: avImgFour
        },
        {
            id: 5,
            name: 'Евгения Русланова',
            image: avImgFive
        }
    ] as Array<FriendType>
}

export type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    return state
}

export default sidebarReducer