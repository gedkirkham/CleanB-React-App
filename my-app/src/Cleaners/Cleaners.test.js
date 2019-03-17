import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';

import { findByTestAttr, checkProps } from '../../test/testUtils';
import Cleaners from './Cleaners';

const deleteCleaner = () => {}

/**
 * Function to set default props
 * @function defaultProps
 * @return {object}
 */
const defaultProps = {
    deleteCleaner,
    cleaners: [
        {name: 'Ged', id: 1},
        {name: 'Razvan', id: 2},
        {name: 'Peter', id: 3}
    ]
}

/**
 * Factory function to create a ShallowWrapper for the Cleaners component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @return {ShallowWrapper}
 */
const setup = (props={}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Cleaners { ...setupProps } />);
}

test('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-cleaners");
    expect(component.length).toBe(1);
});
test('header contains text', () => {
    const wrapper = setup();
    const cleanersHeader = findByTestAttr(wrapper, "cleaners-header");
    expect(cleanersHeader.text().length).not.toBe(0);
});
test('does not throw warning with expected props', () => {
    const expectedProps = {
        deleteCleaner,
        cleaners : [{
            name : "Ged",
            id : 1
        }]
    }
    checkProps(Cleaners, expectedProps);
});

describe('cleaners have been added so', () => {
    test('correct number of cleaners are displayed', () => {
        const wrapper = setup(defaultProps);
        const cleaners = findByTestAttr(wrapper, "cleaners-name");
        expect(cleaners.length).toBe(3);
    })
    test('cleaners names are displayed in the correct order', () => {
        const wrapper = setup(defaultProps);
        const cleaners = findByTestAttr(wrapper, "cleaners-name");
        expect(cleaners.at(0).text()).toBe(defaultProps.cleaners[0].name);
        expect(cleaners.at(1).text()).toBe(defaultProps.cleaners[1].name);
        expect(cleaners.at(2).text()).toBe(defaultProps.cleaners[2].name);
    })
})

describe('no cleaners have been added so', () => {
    test('warning text is displayed', () => {
        const wrapper = setup({cleaners: []});
        const noCleanersPresent = findByTestAttr(wrapper, "no-cleaners-present-text")
        expect(noCleanersPresent.text().length).not.toBe(0);
    })
})