import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, storeFactory } from '../../test/testUtils'
import AddItem from './AddItem'
import { CLEANERS_CONST, ROOMS_CONST } from '../Constants';

/**
 * Set-up function to create shallow wrapper for AddItem component
 * @function setup
 * @param {object} initialState
 * @returns {ShallowWrapper}     
 */
const setup = (initialState={}, cleanerOrRoom) => {
    const store = storeFactory(initialState)
    const wrapper = shallow(<AddItem itemToAdd={cleanerOrRoom} store={store} />).dive().dive()
    return wrapper
}

describe('cleaners', () => {
    let wrapper
    beforeEach(() => {
        const initialState = {}
        wrapper = setup(initialState, CLEANERS_CONST)
    })
    test('section renders without error', () => {
        const component = findByTestAttr(wrapper, 'cleaners-component')
        expect(component.length).toBe(1)
    })
    test('header renders without error', () => {
        const component = findByTestAttr(wrapper, 'cleaners-header')
        expect(component.length).toBe(1)
    })
    describe('form', () => {
        test('renders without error', () => {
            const component = findByTestAttr(wrapper, 'cleaners-form')
            expect(component.length).toBe(1)
        })
        test('input box renders without error', () => {
            const component = findByTestAttr(wrapper, 'cleaners-form-input-box')
            expect(component.length).toBe(1)
        })
        test('button renders without error', () => {
            const component = findByTestAttr(wrapper, 'cleaners-form-button')
            expect(component.length).toBe(1)
        })
    })
    describe('negative test', () => {
        test('rooms section does not render', () => {
            const component = findByTestAttr(wrapper, 'rooms-component')
            expect(component.length).toBe(0)
        })
    })
    describe('update state', () => {

    })
})

describe('rooms', () => {
    let wrapper
    beforeEach(() => {
        const initialState = {}
        wrapper = setup(initialState, ROOMS_CONST)
    })
    test('section renders without error', () => {
        const component = findByTestAttr(wrapper, 'rooms-component')
        expect(component.length).toBe(1)
    })
    test('header renders without error', () => {
        const component = findByTestAttr(wrapper, 'rooms-header')
        expect(component.length).toBe(1)
    })
    describe('form', () => {
        test('renders without error', () => {
            const component = findByTestAttr(wrapper, 'rooms-form')
            expect(component.length).toBe(1)
        })
        test('input box renders without error', () => {
            const component = findByTestAttr(wrapper, 'rooms-form-input-box')
            expect(component.length).toBe(1)
        })
        test('frequency header renders without error', () => {
            const component = findByTestAttr(wrapper, 'rooms-frequency-header')
            expect(component.length).toBe(1)
        })
        test('select box renders without error', () => {
            const component = findByTestAttr(wrapper, 'rooms-form-select-box')
            expect(component.length).toBe(1)
        })
        test('select option renders without error', () => {
            const component = findByTestAttr(wrapper, 'rooms-form-select-option')
            expect(component.length).toBe(4)
        })
        test('button renders without error', () => {
            const component = findByTestAttr(wrapper, 'rooms-form-button')
            expect(component.length).toBe(1)
        })
    })
    describe('negative test', () => {
        test('cleaners section does not render', () => {
            const component = findByTestAttr(wrapper, 'cleaners-component')
            expect(component.length).toBe(0)
        })
    })
    describe('update state', () => {

    })
})