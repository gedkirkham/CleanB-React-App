import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../../test/testUtils';
import Rooms from './Rooms';

const deleteRoom = () => {}

/**
 * Function to set default props
 * @function defaultProps
 * @return {object}
 */
const defaultProps = {
    rooms: [
        {name: 'Lounge', frequency: 'weekly'},
        {name: 'Kitchen', frequency: 'fortnightly'},
        {name: 'Bedroom', frequency: 'thrice-monthly'},
        {name: 'Garage', frequency: 'monthly'}
    ],
    deleteRoom
}

/**
 * Factory function to create a ShallowWrapper for the Rooms component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @return {ShallowWrapper}
 */
const setup = (props={}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Rooms { ...setupProps } />);
}

test('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-rooms");
    expect(component.length).toBe(1);
});
test('header contains text', () => {
    const wrapper = setup();
    const roomsHeader = findByTestAttr(wrapper, "rooms-header");
    expect(roomsHeader.text().length).not.toBe(0);
});
test('does not throw warning with expected props', () => {
    const expectedProps = defaultProps;
    checkProps(Rooms, expectedProps);
});

describe('rooms have been added so', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    })
    test('correct number of rooms are displayed', () => {
        const rooms = findByTestAttr(wrapper, "room-name");
        expect(rooms.length).toBe(defaultProps.rooms.length);
    })
    test('room names are displayed in the correct order', () => {
        const rooms = findByTestAttr(wrapper, "room-name");
        expect(rooms.at(0).text()).toBe(defaultProps.rooms[0].name);
        expect(rooms.at(1).text()).toBe(defaultProps.rooms[1].name);
        expect(rooms.at(2).text()).toBe(defaultProps.rooms[2].name);
    })
    test('correct number of delete icons are displayed', () => {
        const deleteIcons = findByTestAttr(wrapper, "delete-icon")
        expect(deleteIcons.length).toBe(defaultProps.rooms.length);
    })
    test('rooms can be removed', () => {
        //TODO: complete
    })
})

describe('no rooms have been added so', () => {
    test('warning text is displayed', () => {
        const wrapper = setup({rooms: []});
        const noRoomsPresent = findByTestAttr(wrapper, "no-rooms-present-text")
        expect(noRoomsPresent.text().length).not.toBe(0);
    })
})