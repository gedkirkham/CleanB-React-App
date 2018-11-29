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
    var firstCleaningDate = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() + DaysUntilSaturday()).toUTCString();
    return (
        firstCleaningDate
    )
}

const Calendar = ({cleaners, deleteCleaner, rooms, deleteRoom}) => {
    var rows = [1,2,3,4];
    var saturdayAsNum = 6;
    var currentDayOfTheWeek = DaysUntilSaturday();//TODO: this value is returning 0 all the time
    const CalendarDate = () => {
        if(currentDayOfTheWeek !== saturdayAsNum){
            var DaysUntilSaturday = currentDayOfTheWeek - saturdayAsNum;
            if(currentDayOfTheWeek < 0) {
                console.log("before *-1: "+currentDayOfTheWeek);
                currentDayOfTheWeek = currentDayOfTheWeek * -1;
                console.log("after *-1: "+currentDayOfTheWeek);
            }
            currentDayOfTheWeek = currentDayOfTheWeek + DaysUntilSaturday;
            console.log("DaysUntilSaturday: "+DaysUntilSaturday);
            console.log("currentDayOfTheWeek: "+currentDayOfTheWeek);
        }
        return ( 
            currentDayOfTheWeek
        )
    }
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