import React from 'react'
import DeleteIcon from '../Images/delete-icon.png'

const Cleaners = ({cleaners, deleteCleaner}) => {
    const cleanerList = cleaners.length ? (
        cleaners.map(cleaner => {
            return (
                <div className="cleaner collection-item" key={cleaner.id}>
                    <div>{cleaner.name}</div>
                    <img src={DeleteIcon} onClick={() => {deleteCleaner(cleaner.id)}} alt="Delete Icon"></img>
                </div>
            )   
        })
    ) : (
        <p>You have no cleaners :/</p>
    )
    return (
        <div className="cleaner-list">
            <h3>Cleaners:</h3>
            {cleanerList}
        </div>
    )
}

export default Cleaners