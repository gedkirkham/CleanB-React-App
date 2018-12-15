import React, { Component } from 'react'

class Calendar extends Component {
    state = {
        paddedCleanersArray : [],
        paddedCleanersArrayAsCsv : []
    }

    render() {
        const handleSubmit = (event) => {
            event.preventDefault();

            ConvertTableToCsv();

            var element = document.createElement("a");
            var file = new Blob(this.state.paddedCleanersArrayAsCsv, {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "myFile.csv";
            element.click();

            this.setState({
                paddedCleanersArray : [],
                paddedCleanersArrayAsCsv : []
            })
        }
        
        const ConvertTableToCsv = (rooms) => {
            var counter = 0;
            this.state.paddedCleanersArray.map(cleaner => {
                this.state.paddedCleanersArrayAsCsv.push(cleaner.name)
                
                if(counter === this.props.rooms.length - 1){
                    this.state.paddedCleanersArrayAsCsv.push("\n")
                    counter = 0;
                }
                else {
                    this.state.paddedCleanersArrayAsCsv.push(",")
                   counter++
                }
            })
        }
    
        const DownloadCalendar = ({cleaners, rooms}) => {
            return (
                <form id="download-calendar">
                    <button>Download</button>
                </form>
        )}
        
        const CalendarDates = () => {
            var cleaningDateList = [];
            var weekLengthAsNumber = 0;
            for (var i = 0; i < CalendarLength().length; i++){
                cleaningDateList[i] = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() + DaysUntilSaturday() + weekLengthAsNumber).toLocaleDateString();
                var weekLengthAsNumber = weekLengthAsNumber + 7;
            }
            return (
                cleaningDateList
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
        
        const CalendarLength = () => {
            var tableRowArray = [0,1,2,3];
            return (
                tableRowArray
            )
        }
        
        const TableHeaders = ({room}) => {
            return (
                <th key={room.name}>{room.name}</th>
            )
        }
        
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
                        return (
                            this.state.paddedCleanersArray.push(cleaner),
                            paddedCleanersArray.push(cleaner)
                        )
                    })
                }
                else if(flag === true){
                    cleaners.slice(0,1).map(cleaner => {
                        return (
                            this.state.paddedCleanersArray.push(cleaner),
                            paddedCleanersArray.push(cleaner)
                        )
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
                        return (
                            <td key={Math.random()}>{cleaner.name}</td>
                        )
                    })} 
                </tr>
            )
        }

        const Table = ({cleaners, rooms}) => {
            return (
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
                        {CalendarLength().map(tableRowIndex => {
                            return (
                                <TableRow cleaners={cleaners} rooms={rooms} tableRowIndex={tableRowIndex} key={tableRowIndex} />//TODO: How to solve the issue where padded cleaners have the same key. I will need to have the same key in order to remove the correct cleaner from db.
                            )
                        })}
                    </tbody>
            </table>
            )
        }
          
        return (
            <div className="calendar">
                <h3>Calendar:</h3>
                <Table cleaners={this.props.cleaners} rooms={this.props.rooms}/>
                
                <h3>Download calendar:</h3>
                <button id="myInput" onClick={handleSubmit} cleaners={this.props.cleaners} rooms={this.props.rooms}>Download</button>
            </div>
        )
    }
}



export default Calendar;