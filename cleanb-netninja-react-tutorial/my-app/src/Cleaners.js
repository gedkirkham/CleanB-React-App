import React from 'react';

const Cleaners = ({cleaners, deleteCleaner}) => {
    const cleanerList = cleaners.map(cleaner => {
        return (
            <div className="cleaner" key={cleaner.id}>
                <div>Name: {cleaner.name}</div>
                <button onClick={() => {deleteCleaner(cleaner.id)}}>Delete cleaner</button>
            </div>
        )   
    })
    return (
        <div className="cleaner-list">
            <h3>Cleaners:</h3>
            {cleanerList}
        </div>
    )
}

export default Cleaners