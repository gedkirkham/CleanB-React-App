import React from 'react';
import PropTypes from 'prop-types';

import DeleteIcon from '../Images/delete-icon.png';
import {CLEANERS_CONST, NO_CLEANERS_CONST, DELETE_ICON_ALT_CONST} from '../Constants'

const Cleaners = ({cleaners, deleteCleaner}) => {
    const cleanerList = cleaners.length ? (
        cleaners.map(cleaner => {
            return (
                <div className="cleaner collection-item row" key={cleaner.id}>
                    <img className="left" src={DeleteIcon} onClick={() => {deleteCleaner(cleaner.id)}} alt={DELETE_ICON_ALT_CONST}></img>
                    <p dataTest="cleaners-name" className="left">{cleaner.name}</p>
                </div>
            )   
        })
    ) : (
        <p dataTest="no-cleaners-present-text">{NO_CLEANERS_CONST}</p>
    )
    return (
        <section dataTest="component-cleaners" className="cleaner-list row">
            <h5 dataTest="cleaners-header">{CLEANERS_CONST}</h5>
            {cleanerList}
        </section>
    )
}

export default Cleaners