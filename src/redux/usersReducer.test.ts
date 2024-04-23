import usersReducer, { actions, InitialStateType } from './usersReducer'

let state: InitialStateType

beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: 'Tania 0',
                followed: false,
                photos: {
                    small: null,
                    large: null
                },
                status: 'status 0'
            },
            {
                id: 1,
                name: 'Tania 1',
                followed: false,
                photos: {
                    small: null,
                    large: null
                },
                status: 'status 1'
            },
            {
                id: 2,
                name: 'Tania 2',
                followed: true,
                photos: {
                    small: null,
                    large: null
                },
                status: 'status 2'
            },
            {
                id: 3,
                name: 'Tania 3',
                followed: true,
                photos: {
                    small: null,
                    large: null
                },
                status: 'status 3'
            }
        ],
        pageSize: 10,
        totalItemsCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test('follow success', () => {
    const newState = usersReducer(state, actions.affirmFollow(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {
    const newState = usersReducer(state, actions.affirmUnfollow(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})