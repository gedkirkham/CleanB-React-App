import React from 'react'
import DeleteIcon from '../Images/delete-icon.png'
import {CLEANERS_CONST, NO_CLEANERS_CONST, DELETE_ICON_ALT_CONST} from '../Constants'

const Cleaners = ({cleaners, deleteCleaner}) => {
    const cleanerList = cleaners.length ? (
        cleaners.map(cleaner => {
            return (
                <div className="cleaner collection-item row" key={cleaner.id}>
                    <img className="left" src={DeleteIcon} onClick={() => {deleteCleaner(cleaner.id)}} alt={DELETE_ICON_ALT_CONST}></img>
                    <div className="left">{cleaner.name}</div>
                </div>
            )   
        })
    ) : (
        <p>{NO_CLEANERS_CONST}</p>
    )
    return (
        <div className="cleaner-list row">
            <h5>{CLEANERS_CONST}</h5>
            {cleanerList}
        </div>
    )
}

export default Cleaners