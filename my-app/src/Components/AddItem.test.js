import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, storeFactory } from '../../test/testUtils'
import AddItem from './AddItem'

/**
 * Set-up function to create shallow wrapper for AddItem component
 * @function setup
 * @param {object} initialState
 * @returns {ShallowWrapper}     
 */
const setup = (initialState={}) => {
    const store = storeFactory(initialState)
    const wrapper = shallow(<AddItem store={store} />).dive().dive()
}

describe('cleaners', () => {
    test('section renders without error', () => {

    })
    test('header renders without error', () => {

    })
    describe('form', () => {
        test('renders without error', () => {

        })
        test('input box renders without error', () => {
    
        })
        test('button renders without error', () => {
    
        })
    })
    describe('update state', () => {

    })
})

describe('rooms', () => {

})