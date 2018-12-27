import React from 'react'
import DeleteIcon from '../Images/delete-icon.png'

const Cleaners = ({cleaners, deleteCleaner}) => {
    const cleanerList = cleaners.length ? (
        cleaners.map(cleaner => {
            return (
                <div className="cleaner collection-item row" key={cleaner.id}>
                    <img className="left" src={DeleteIcon} onClick={() => {deleteCleaner(cleaner.id)}} alt="Delete Icon"></img>
                    <div className="left">{cleaner.name}</div>
                </div>
            )   
        })
    ) : (
        <p>You have no cleaners :/</p>
    )
    return (
        <div className="cleaner-list row">
            <h3>Cleaners:</h3>
            {cleanerList}
        </div>
    )
}

export default Cleaners