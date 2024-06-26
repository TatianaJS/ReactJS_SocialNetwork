import React from 'react'
import { create } from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'

describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status='social network status' />)
        const instance = component.getInstance()
        expect(instance.state.status).toBe('social network status')
    })

    test('after creation span should be displayed', () => {
        const component = create(<ProfileStatus status='social network status' />)
        const root = component.root
        let spanButton = root.findByType('span')
        expect(spanButton).not.toBeNull()
      })

    test('after creation span should not be displayed', () => {
        const component = create(<ProfileStatus status='social network status' />)
        const root = component.root
        expect(() => {
            let input = root.findByType('input')
        }).toThrow()
    })

    test('after creation span should contains correct status', () => {
        const component = create(<ProfileStatus status='social network status' />)
        const root = component.root
        let spanButton = root.findByType('span')
        expect(spanButton.children[0]).toBe('social network status')
    })

    test('input should be displayed in editMode instead of span', () => {
        const component = create(<ProfileStatus status='social network status' />)
        const root = component.root
        let span = root.findByType('span')
        span.props.onDoubleClick()
        let input = root.findByType('input')
        expect(input.props.value).toBe('social network status')
    })

    test('callback should be called', () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status='social network status' updateStatus={mockCallback} />)
        const instance = component.getInstance()
        instance.offEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})