import checkPropTypes from 'check-prop-types';

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