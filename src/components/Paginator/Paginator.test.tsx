import React from 'react'
import { create } from 'react-test-renderer'
import Paginator from './Paginator'

describe('Testing Paginator component', () => {
    test('pages count is 11 but should be showed only 10', () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} sectionAmount={10} />)
        const root = component.root
        let spans = root.findAllByType('span')
        expect(spans.length).toBe(10)
    })

    test('ig pages count is more than 10, button for next page should be showed', () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} sectionAmount={10} />)
        const root = component.root
        let button = root.findAllByType('button')
        expect(button.length).toBe(1)
    })
})