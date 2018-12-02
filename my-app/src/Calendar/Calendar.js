import React from 'react'
import DeleteIcon from '../Images/delete-icon.png'

const TableHeaders = ({room}) => (
    <th key={room.name}>{room.name}</th>
)

const TableRow = ({cleaners, rooms, index}) => {
    var cleaningDateList = CreateCalendarDates();
    var newCleanersArray = [];
    var flag = false;
    if(cleaners.length < rooms.length) {
        var y = 0;
        for(var i = 0; i <= rooms.length; i++){
            if(y === cleaners.length){
                y = 0;
                flag = true;
            }

            if(flag === false){
                cleaners.slice(y,y+1).map(cleaner => {
                    newCleanersArray.push(cleaner);
                })
            }
            else if(flag === true){
                cleaners.slice(0,1).map(cleaner => {
                    newCleanersArray.push(cleaner);
                })
                flag = false;
            }
            y++;
        }
    }
    return (
        <tr>
            <td>
                {cleaningDateList[index]}
            </td>   
            {newCleanersArray.slice(0,rooms.length).map(cleaner => {
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

const CreateCalendarDates = () => {
    var cleaningDateList = [];
    var weekLengthAsNumber = 0;
    for (var i = 0; i < 8; i++){
        cleaningDateList[i] = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() + DaysUntilSaturday() + weekLengthAsNumber).toLocaleDateString();
        var weekLengthAsNumber = weekLengthAsNumber + 7;
    }
    return (
        cleaningDateList
    )
}

const CalenderLength = () => {
    var rows = [0,1,2,3];
    return (
        rows
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
            {CalenderLength().map(row => {
                return (
                    <TableRow cleaners={cleaners} rooms={rooms} index={row} key={row} />
                )
            })}
        </tbody>
    </table>
)

const Calendar = ({cleaners, deleteCleaner, rooms, deleteRoom}) => {
    return (
        <div className="calendar">
            <h3>Calendar:</h3>
            <Table cleaners={cleaners} rooms={rooms}/>
        </div>
    )
}

export default Calendar