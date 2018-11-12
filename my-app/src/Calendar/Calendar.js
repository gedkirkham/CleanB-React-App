import React from 'react'
import DeleteIcon from '../Images/delete-icon.png'

const Calendar = ({cleaners, deleteCleaner, rooms, deleteRoom}) => {
    const calendar = cleaners.length ? (
        cleaners.map(cleaner => {
            return (
                <div className="calendar collection-item" key={cleaner.id}>
                    <table>
                        <tr>
                            <th>Dates</th>
                            <th>{rooms.name}</th>
                        </tr>
                        <tr>{cleaner.name}</tr>
                    </table>
                </div>
            )   
        })
    ) : (
        <p>You have no calendar to display. Add some cleaners and rooms!</p>
    )
    return (
        <div className="calenda">
            <h3>Calendar:</h3>
            {calendar}
        </div>
    )
}

export default Calendar