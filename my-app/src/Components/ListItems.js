import React from 'react';
import PropTypes from 'prop-types';
import isRequiredIf from 'react-proptype-conditional-require';

import DeleteIcon from '../Images/delete-icon.png';
import { CLEANERS_CONST, NO_CLEANERS_CONST, NO_ROOMS_CONST, ROOMS_CONST, DELETE_ICON_ALT_CONST } from '../Constants'

/**
 * Functional react component to list cleaner and room list
 * @function
 * @param {object} props.items - Items prop list.
 * @param {object} props.deleteItem - deleteItem() callback function.
 * @returns {JSX.Element} - Renders items list, or displays a warning message if no items are present.
 */
const ListItems = (props) => {
    let warningText;
    let headerText;
    if (props.itemsToList === CLEANERS_CONST) {
        warningText = NO_CLEANERS_CONST
        headerText = CLEANERS_CONST
    } else {
        warningText = NO_ROOMS_CONST
        headerText = ROOMS_CONST
    }
    const itemList = props.items.length ? (
        props.items.map(item => {
            return (
                <div className="item collection-item row" key={item.id}>
                    <img    
                        dataTest="delete-icon"
                        className="left" 
                        src={DeleteIcon} 
                        onClick={() => {props.deleteItem({ itemType : headerText, itemId : item.id })}} 
                        alt={DELETE_ICON_ALT_CONST}>
                    </img>
                    <p dataTest="items-name" className="left">{item.name}</p>
                </div>
            )   
        })
    ) : (
        <p dataTest="no-items-present-text">{warningText}</p>
    )
    return (
        <section dataTest="component-list-items" className="items-list row">
            <h5 dataTest="list-items-header">{headerText}</h5>
            {itemList}
        </section>
    )
}

ListItems.propTypes = {
    items : PropTypes.arrayOf(
        PropTypes.shape({
            name:  PropTypes.string.isRequired,
            id : isRequiredIf(PropTypes.number),
            frequency : isRequiredIf(PropTypes.string),
    })).isRequired,
    deleteItem : PropTypes.func.isRequired,
}

export default ListItems