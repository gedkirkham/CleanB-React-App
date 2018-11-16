import React from 'react'
import DeleteIcon from '../Images/delete-icon.png'

const TableRow = ({row}) => (
    <tr>
      <td key={row.name}>{row.name}</td>
      <td key={row.id}>{row.id}</td>
    </tr>
  )
  
  const Table = ({cleaners}) => (
    <table>
      {cleaners.map(row => {
          console.log("row: ", row);
        <TableRow row={row} />
      })}
    </table>
 )

const Calendar = ({cleaners, deleteCleaner, rooms, deleteRoom}) => {
    const Table = ({cleaners}) => (
        <table>
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
            <Table cleaners={cleaners}/>
        </div>
    )
}

export default Calendar