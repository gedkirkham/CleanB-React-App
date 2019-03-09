import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../test/testUtils';
import Cleaners from './Cleaners';

/**
 * Factory function to create a ShallowWrapper for the Cleaners component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @return {ShallowWrapper}
 */
const setup = (props={}) => {
    return shallow(<Cleaners {...props} />);
}

test('renders without error', () => {
    const wrapper = setup({cleaners: [{name: 'Ged', id: 1}]});
    const component = findByTestAttr(wrapper, "component-cleaners");
    expect(component.length).toBe(1);
});
test('header contains text', () => {
    const wrapper = setup({cleaners: [{name: 'Ged', id: 1}]});
    const cleanersHeader = findByTestAttr(wrapper, "cleaners-header");
    expect(cleanersHeader.text().length).not.toBe(0);
});

describe('cleaners have been added so', () => {
    test('cleaners are displayed', () => {
        const wrapper = setup({cleaners: [
            {name: 'Ged', id: 1},
            {name: 'Razvan', id: 2},
            {name: 'Peter', id: 3}
        ]});
        const cleaners = findByTestAttr(wrapper, "cleaners-name");
        expect(cleaners.length).toBe(3);
    })
})

describe('no cleaners have been added so', () => {
    test('information text is displayed', () => {
        const wrapper = setup({cleaners: []});
        const noCleanersPresent = findByTestAttr(wrapper, "no-cleaners-present-text")
        expect(noCleanersPresent.text().length).not.toBe(0);
    })
})