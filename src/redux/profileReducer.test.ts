import React from 'react'
import profileReducer, { actions } from './profileReducer'
import avImgOne from '../assets/img/avatar_1.png'
import avImgTwo from '../assets/img/avatar_5.jpg'
import avImgThree from '../assets/img/avatar_3.jpg'
import { UserProfileType } from '../types/types'

let state = {
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
    userProfile: null as UserProfileType | null,
    status: '',
    newPostText: ''
}

it('length of posts should be incremented', () => {
    // 1. test data
    let action = actions.addPostActionCreator('IT')

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.postsDt.length).toBe(5)
})

it('message of new post should be correct', () => {
    // 1. test data
    let action = actions.addPostActionCreator('IT new samurai')

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectaion
    expect(newState.postsDt[4].message).toBe('IT new samurai')
})

it('after deleting length of message should be decrement', () => {
    // 1. test data
    let action = actions.deletePost(1)

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectaion
    expect(newState.postsDt.length).toBe(3)
})

it('after deleting length should not be decrement if id is incorrect', () => {
    // 1. test data
    let action = actions.deletePost(1000)

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectaion
    expect(newState.postsDt.length).toBe(4)
})