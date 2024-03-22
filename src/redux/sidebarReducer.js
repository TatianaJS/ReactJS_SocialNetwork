let initialState = {
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
};

const sidebarReducer = (state = initialState, action) => {
    return state;
};

export default sidebarReducer;