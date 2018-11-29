import React from 'react'
import DeleteIcon from '../Images/delete-icon.png'

const TableRoomColumn = ({roomColumn}) => (
    <th key={roomColumn.name}>{roomColumn.name}</th>
)

const CleanerRow = ({cleaners}) => {
    return (
        <tr>
            {cleaners.map(cleaner => {
                return(
                    <td key={cleaner.name}>{cleaner.name}</td>
                )
            })}
        </tr>
    )
}

const DaysUntilSaturday = () => {
    var currentDayOfTheWeekAsNum = new Date().getDay();
    var saturdayAsNum = 6;
    if(currentDayOfTheWeekAsNum !== saturdayAsNum){
        var daysUntilSaturday = saturdayAsNum - currentDayOfTheWeekAsNum;
    }
    return (
        daysUntilSaturday
    )
}

const CreateCalendarDates = () => {
    var cleaningDateList = [];
    var cleaningDateList = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() + DaysUntilSaturday()).toLocaleDateString();
    return (
        cleaningDateList
    )
}

const Calendar = ({cleaners, deleteCleaner, rooms, deleteRoom}) => {
    var rows = [1,2,3,4];
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
                    {rows.map(row => {
                        return (
                            <CleanerRow cleaners={cleaners} key={row} />
                        )
                    })}
            </tbody>
            <tbody>
                {<CreateCalendarDates/>}
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