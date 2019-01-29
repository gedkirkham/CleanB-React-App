import React, { Component } from 'react'
import ExcludeCleaner from '../Cleaners/ExcludeCleaner'
import { connect } from 'react-redux'
import {DOWNLOAD_CALENDAR_CONST, CALENDAR_CONST, DATES_CONST, DOWNLOAD_CONST} from '../Constants'

class Calendar extends Component {
    state = {
        paddedCleanersArray : [],
        paddedCleanersArrayAsCsv : [],
        exclusionList : [],
        exclusionListCleaner : "",
        exclusionListRoom : ""
    }

    render() {
        const handleSubmit = (event) => {
            event.preventDefault();
            ConvertTableToCsv();
            GenerateAndDownloadFile();

            this.setState({ 
                paddedCleanersArray : [],
                paddedCleanersArrayAsCsv : []
            })
        }

        const GenerateAndDownloadFile = () => {
            var element = document.createElement("a");
            var file = new Blob(this.state.paddedCleanersArrayAsCsv, {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = new Date() + "_calendar.csv";
            element.click();
        }
        
        const ConvertTableToCsv = (rooms) => {
            var columnCounter = 0;
            var dateIndex = 0;
            var calendarDateList = CalendarDates();

            //headers
            this.state.paddedCleanersArrayAsCsv.push("Dates,")
            this.props.rooms.forEach(room => {
                this.state.paddedCleanersArrayAsCsv.push(room.name + ",")
            })
            this.state.paddedCleanersArrayAsCsv.push("\n")

            //content
            this.state.paddedCleanersArrayAsCsv.push(calendarDateList[dateIndex] + ",")
            this.state.paddedCleanersArray.forEach(cleaner => {
                if(cleaner.name !== undefined){
                    this.state.paddedCleanersArrayAsCsv.push(cleaner.name)    
                }
                else{
                    this.state.paddedCleanersArrayAsCsv.push("")
                }
                
                if(columnCounter === this.props.rooms.length - 1){ //TODO: use room.length rather than this.props.
                    columnCounter = 0;
                    if(dateIndex < calendarDateList.length - 1){
                        this.state.paddedCleanersArrayAsCsv.push("\n")
                        dateIndex++;
                        this.state.paddedCleanersArrayAsCsv.push(calendarDateList[dateIndex] + ",")
                    }
                }
                else {
                    this.state.paddedCleanersArrayAsCsv.push(",")
                    columnCounter++
                }
            })
        }
    
        const DownloadCalendar = () => {//TODO:pass this.props.rooms to this const.
            return (
                <form id="download-calendar">
                    <button className="btn grey" onClick={handleSubmit}>{DOWNLOAD_CONST}</button>
                </form>
        )}
        
        const CalendarDates = () => {
            var cleaningDateList = [];
            var weekLengthAsNumber = 0;
            for (var i = 0; i < CalendarLength().length; i++){
                cleaningDateList[i] = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + DaysUntilSaturday() + weekLengthAsNumber).toLocaleDateString();
                weekLengthAsNumber = weekLengthAsNumber + 7;
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
            var tableRowArray = [0,1,2,3];//TODO: add variable length
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
            var cleanerIndex = 0;
            var dateIndex = tableRowIndex;
            var weekIndex = tableRowIndex + 1;
            var skipFlag;
            var cleanerToReturn;
            
            //cleaner/room assignment calculation
            for(var columnCount = 0; columnCount < rooms.length; columnCount++){
                if(cleanerIndex >= cleaners.length){
                    cleanerIndex = 0;
                }

                var currentRoom = rooms[columnCount];
                var currentRoomFrequency = currentRoom.frequency;
                if((currentRoomFrequency === "fortnightly" && (weekIndex === 2 || weekIndex === 4)) || (currentRoomFrequency === "thrice-monthly" && weekIndex === 4) || (currentRoomFrequency === "monthly" && weekIndex !== 1)){
                    skipFlag = true;
                }
                else {
                    skipFlag = false;
                }

                //Ensure that cleaners index tracks dateIndex. This ensures that cleaner index incremenets each week.
                if(columnCount === 0) {
                    cleanerIndex = dateIndex;
                    if (cleanerIndex >= cleaners.length) cleanerIndex = 0;
                    cleanerToReturn = AddCleanerToArray(skipFlag, cleaners, cleanerIndex, tableRowIndex, columnCount);
                } else {
                    cleanerToReturn = AddCleanerToArray(skipFlag, cleaners, cleanerIndex, tableRowIndex, columnCount);
                }
                
                //Ensure that cleaners within the excluded cleaners array are excluded from the calendar.
                if (cleanerToReturn === undefined) cleanerToReturn = {name: ""}; //Fixes bug that occurs when no cleaners are present.
                var exclusionListCounter = 0;
                var cleanIndexExclusionList = cleanerIndex;
                do { //Loop is required to ensure that exclusionList array is iterated through from start to finish each time.
                    var matchFound = false;
                    var excludeAll = false;
                    
                    this.props.exclusionList.forEach(exclusionListItem => { //Loop through exclusionList
                        if (exclusionListItem.cleaner === cleanerToReturn.name && exclusionListItem.room === currentRoom.name) {
                            matchFound = true;
                            if (++cleanIndexExclusionList >= cleaners.length) cleanIndexExclusionList = 0;
                            cleanerToReturn = AddCleanerToArray(skipFlag, cleaners, cleanIndexExclusionList, tableRowIndex, columnCount);
                        }
                    })

                    if (exclusionListCounter > this.props.exclusionList.length && matchFound === true) excludeAll = true;
                } while (exclusionListCounter++ <= this.props.exclusionList.length)

                if (excludeAll === true) cleanerToReturn = "";
                this.state.paddedCleanersArray.push(cleanerToReturn);
                paddedCleanersArray.push(cleanerToReturn);

                if(!((currentRoomFrequency === "fortnightly" && (weekIndex === 2 || weekIndex === 4)) || (currentRoomFrequency === "thrice-monthly" && weekIndex === 4) || (currentRoomFrequency === "monthly" && weekIndex !== 1))){
                    cleanerIndex++;
                }
            }   
            return (
                <tr>
                    <td>
                        {calendarDateList[dateIndex]}
                    </td>   
                    {paddedCleanersArray.slice(0,rooms.length).map(cleaner => {
                        return (
                            <td key={Math.random()}>{cleaner.name}</td>
                        )
                    })} 
                </tr>
            )
        }

        const AddCleanerToArray = (skipFlag, cleaners, cleanerIndex, _columnCount) => {
            var _cleanerIndex = cleanerIndex;
            var cleanerToReturn;
            
            cleaners.slice(_cleanerIndex, _cleanerIndex + 1).map(cleaner => {
                return (
                    cleanerToReturn = cleaner
                )
            })

            if (skipFlag === true){
                cleanerToReturn = "";
            }
            return (
                cleanerToReturn
            )
        }

        const Table = ({cleaners, rooms}) => {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>{DATES_CONST}</th>
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
            <div className="calendar row">
                <div className="row">
                    <h3>{CALENDAR_CONST}</h3>
                    <Table cleaners={this.props.cleaners} rooms={this.props.rooms}/>
                </div>

                <ExcludeCleaner/>

                <div className="row">
                    <h3>{DOWNLOAD_CALENDAR_CONST}</h3>
                    <DownloadCalendar cleaners={this.props.cleaners} rooms={this.props.rooms}/> 
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cleaners : state.cleaners,
        exclusionList : state.exclusionList
    }
}

export default connect(mapStateToProps)(Calendar);