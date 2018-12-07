import React from 'react'
import DeleteIcon from '../Images/delete-icon.png'

const TableHeaders = ({room}) => (
    <th key={room.name}>{room.name}</th>
)

const TableRow = ({cleaners, rooms, tableRowIndex}) => {
    var calendarDateList = CalendarDates();
    var paddedCleanersArray = [];
    var flag = false;
    var cleanerIndex = 0;
    
    //cleaner/room assignment calculation
    for(var columnCount = 0; columnCount < rooms.length; columnCount++){
        if(cleanerIndex + tableRowIndex >= cleaners.length){
            cleanerIndex = 0;
            tableRowIndex = 0;
            flag = true;
        }

        if(flag === false){
            cleaners.slice(cleanerIndex + tableRowIndex, cleanerIndex + tableRowIndex + 1).map(cleaner => {
                paddedCleanersArray.push(cleaner);
            })
        }
        else if(flag === true){
            cleaners.slice(0,1).map(cleaner => {
                paddedCleanersArray.push(cleaner);
            })
            flag = false;
        }
        cleanerIndex++;
    }
    return (
        <tr>
            <td>
                {calendarDateList[tableRowIndex]}
            </td>   
            {paddedCleanersArray.slice(0,rooms.length).map(cleaner => {
                return(
                    <td key={Math.random()}>{cleaner.name}</td>
                )
            })}
        </tr>
    )
}

const DaysUntilSaturday = () => {
    var currentDayOfTheWeekAsNum = new Date().getDay();
    var saturdayAsNum = 6;
    var daysUntilSaturday = 0;
    if(currentDayOfTheWeekAsNum !== saturdayAsNum){
        daysUntilSaturday = saturdayAsNum - currentDayOfTheWeekAsNum;
    }
    return (
        daysUntilSaturday
    )
}

const CalendarDates = () => {
    var cleaningDateList = [];
    var weekLengthAsNumber = 0;
    for (var i = 0; i < CalenderLength().length; i++){
        cleaningDateList[i] = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() + DaysUntilSaturday() + weekLengthAsNumber).toLocaleDateString();
        var weekLengthAsNumber = weekLengthAsNumber + 7;
    }
    return (
        cleaningDateList
    )
}

const CalenderLength = () => {
    var tableRowArray = [0,1,2,3];
    return (
        tableRowArray
    )
}

const Table = ({cleaners, rooms}) => (
    <table>
        <thead>
            <tr>
                <th>Dates:</th>
                {rooms.map(room => {
                    return (
                        <TableHeaders room={room} key={room.name} />
                    )
                })} 
            </tr>
        </thead>
        <tbody>
            {CalenderLength().map(tableRowIndex => {
                return (
                    <TableRow cleaners={cleaners} rooms={rooms} tableRowIndex={tableRowIndex} key={tableRowIndex} />//TODO: How to solve the issue where padded cleaners have the same key. I will need to have the same key in order to remove the correct cleaner from db.
                )
            })}
        </tbody>
    </table>
)

const DownloadCalendar = ({cleaners, rooms}) => {
    return (
        <form id="download-calendar" onClick={ConvertTableToCsv} cleaners={cleaners} rooms={rooms}>
            <button>Download</button>
        </form>
)}

const ConvertTableToCsv = (event) => {
    event.preventDefault();
    console.log("convert to csv and download calendar");
}

const Calendar = ({cleaners, deleteCleaner, rooms, deleteRoom}) => {
    return (
        <div className="calendar">
            <h3>Calendar:</h3>
            <Table cleaners={cleaners} rooms={rooms}/>
            
            <h3>Download calendar:</h3>
            <DownloadCalendar cleaners={cleaners} rooms={rooms}/>
        </div>
    )
}

export default Calendar