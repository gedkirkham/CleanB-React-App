import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../../test/testUtils';
import Home from './Home';

/**
 * Factory function to create a ShallowWrapper for the Home component
 * @function setup
 * @param {object} initialState - Initial state for the setup
 * @returns {ShallowWrapper}
 */
const setup = (initialState={}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(<Home store={store} />).dive().dive();
    return wrapper;
}

describe('render', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    })
    test('renders home component without errors', () => {
        const component = findByTestAttr(wrapper, 'component-home')
        expect(component.length).toBe(1)
    })
    test('renders addCleaner component without errors', () => {
        const component = findByTestAttr(wrapper, 'component-addCleaner')
        expect(component.length).toBe(1)
    })
    test('renders cleaner list component without errors', () => {
        const component = findByTestAttr(wrapper, 'component-cleaner-list')
        expect(component.length).toBe(1)
    })
    test('renders addRoom component without errors', () => {
        const component = findByTestAttr(wrapper, 'component-addRoom')
        expect(component.length).toBe(1)
    })
    test('renders room list component without errors', () => {
        const component = findByTestAttr(wrapper, 'component-room-list')
        expect(component.length).toBe(1)
    })
    test('renders calendar component without errors', () => {
        const component = findByTestAttr(wrapper, 'component-calendar')
        expect(component.length).toBe(1)
    })
    test('renders calendar component without errors', () => {
        const component = findByTestAttr(wrapper, 'component-calendar')
        expect(component.length).toBe(1)
    })
})