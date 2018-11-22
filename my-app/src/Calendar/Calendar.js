import React from 'react'
import DeleteIcon from '../Images/delete-icon.png'

const TableRow = ({cleaner}) => (
        <td key={cleaner.name}>{cleaner.name}</td>
)

const TableRoomColumn = ({roomColumn}) => (
    <th key={roomColumn.name}>{roomColumn.name}</th>
)

const Calendar = ({cleaners, deleteCleaner, rooms, deleteRoom}) => {
    const Table = ({cleaners, rooms}) => (
        <table>
            <thead>
                <tr>
                    {rooms.map(roomColumn => {
                        return (
                            <TableRoomColumn roomColumn={roomColumn} />
                        )
                    })} 
                </tr>
            </thead>
            <tbody>
                <tr>
                    {cleaners.map(cleaner => {
                        return (
                            <TableRow cleaner={cleaner} />
                        )
                    })}
                </tr>
            </tbody>
        </table>)
    return (
        <div className="calendar">
            <h3>Calendar:</h3>
            <Table cleaners={cleaners} rooms={rooms}/>
        </div>
    )
}

export default Calendar