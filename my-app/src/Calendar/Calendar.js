import React from 'react'
import DeleteIcon from '../Images/delete-icon.png'

const TableRow = ({row}) => (
    <tr>
      <td key={row.name}>{row.name}</td>
      <td key={row.id}>{row.id}</td>
    </tr>
  )

const TableRoomColumn = ({roomColumn}) => (
        <td key={roomColumn.name}>{roomColumn.name}</td>
)
  
//   const Table = ({cleaners, rooms}) => (
//     <table>
//         {/* {rooms.map(row => {
//             <TableRow row={row} />
//         })},  
//         {cleaners.map(row => {
//             <TableRow row={row} />
//         })} */}
//     </table>
//  ) 

const Calendar = ({cleaners, deleteCleaner, rooms, deleteRoom}) => {
    const Table = ({cleaners, rooms}) => (
        <table>
            {rooms.map(roomColumn => {
                return (
                    <TableRoomColumn roomColumn={roomColumn} />
                )
            })} 
            {cleaners.map(row => {
                return (
                console.log("row: ", row),
                <TableRow row={row} />
                )
            })}
        </table>)
    return (
        <div className="calendar">
            <h3>Calendar:</h3>
            <Table cleaners={cleaners} rooms={rooms}/>
        </div>
    )
}

export default Calendar