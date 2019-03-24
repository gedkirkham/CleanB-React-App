import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../../test/testUtils';
import ListItems from '../Cleaners/ListItems';
import { CLEANERS_CONST, ROOMS_CONST } from '../Constants'

const deleteItem = () => {}

/**
 * Function to set default props
 * @function defaultProps
 * @return {object}
 */
const defaultProps = (cleanerOrRoom) => {
    if (cleanerOrRoom === ROOMS_CONST) return defaultRoomProps;
    else return defaultCleanerProps;
}

/**
 * Function to set default cleaner props
 * @function defaultCleanerProps
 * @return {object}
 */
const defaultCleanerProps = {
    itemsToList : CLEANERS_CONST,
    items: [
        {name: "Ged", id: 1},
        {name: "Razvan", id: 2},
        {name: "Peter", id: 3}
    ],
    deleteItem
}

/**
 * Function to set default room props
 * @function defaultRoomProps
 * @return {object}
 */
const defaultRoomProps = {
    itemsToList : ROOMS_CONST,
    items: [
        {name: "Bedroom", frequency: "weekly"},
        {name: "Kitchen", frequency: "twice-monthly"},
        {name: "Lounge", frequency: "thrice-monthly"},
        {name: "Garage", frequency: "monthly"}
    ],
    deleteItem
}

/**
 * Factory function to create a ShallowWrapper for the ListItem component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @return {ShallowWrapper}
 */
const setup = (props={}) => {
    const setupProps = { ...defaultProps(), ...props };
    return shallow(<ListItems { ...setupProps } />);
}

test('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-list-items");
    expect(component.length).toBe(1);
});
test('header contains text', () => {
    const wrapper = setup();
    const cleanersHeader = findByTestAttr(wrapper, "list-items-header");
    expect(cleanersHeader.text().length).not.toBe(0);
});
test('does not throw warning with expected cleaner props', () => {
    const expectedProps = defaultProps(CLEANERS_CONST);
    checkProps(ListItems, expectedProps);
});
test('does not throw warning with expected room props', () => {
    const expectedProps = defaultProps(ROOMS_CONST);
    checkProps(ListItems, expectedProps);
}); 

describe('items have been added so', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    })
    test('correct number of items are displayed', () => {
        const items = findByTestAttr(wrapper, "items-name");
        expect(items.length).toBe(defaultProps().items.length);
    })
    test('items names are displayed in the correct order', () => {
        const items = findByTestAttr(wrapper, "items-name");
        expect(items.at(0).text()).toBe(defaultProps().items[0].name);
        expect(items.at(1).text()).toBe(defaultProps().items[1].name);
        expect(items.at(2).text()).toBe(defaultProps().items[2].name);
    })
    test('correct number of delete icons are displayed', () => {
        const deleteIcons = findByTestAttr(wrapper, "delete-icon")
        expect(deleteIcons.length).toBe(defaultProps().items.length);
    })
    test('items can be removed', () => {
        //TODO: complete
    })
})

describe('no items have been added so', () => {
    test('warning text is displayed', () => {
        const wrapper = setup({items: []});
        const noItemsPresent = findByTestAttr(wrapper, "no-items-present-text")
        expect(noItemsPresent.text().length).not.toBe(0);
    })
})