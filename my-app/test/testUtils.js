import checkPropTypes from 'check-prop-types';
import { createStore } from 'redux';

import rootReducer from '../src/Reducers';

/**
 * Creates a testig store with imported reducers, middleware, and initial state.
 * @function storeFactory
 * @param {object} initialState - Initial state
 * @returns {Store} - Redux store
 */
export const storeFactory = (initialState) => {
    return createStore(rootReducer, initialState);
}

/**
 * Returns node(s) with given data-set attribute
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param {String} val - Value of data-set attribute for search
 * @return {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
    return wrapper.find({ dataTest: val });
}

/**
 * Checks components prop types against expected.
 * @param {ShallowWrapper} component
 * @param {props} conformingProps - expected prop types
 */
export const checkProps = (component, conformingProps) => {
    const propError = checkPropTypes(
        component.propTypes, 
        conformingProps,
        "prop",
        component.name)
    expect(propError).toBeUndefined();
}