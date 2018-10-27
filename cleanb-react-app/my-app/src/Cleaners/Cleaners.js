import React from 'react';

const Cleaners = ({cleaners, deleteCleaner}) => {
    const cleanerList = cleaners.length ? (
        cleaners.map(cleaner => {
            return (
                <div className="cleaner collection-item" key={cleaner.id}>
                    <div>   {cleaner.name}</div>
                    <button onClick={() => {deleteCleaner(cleaner.id)}}>Remove</button>
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