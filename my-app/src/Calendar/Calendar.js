import React, { Component } from 'react'
import ExcludeCleaner from '../Cleaners/ExcludeCleaner'
import { connect } from 'react-redux'
import {DOWNLOAD_CALENDAR_CONST, CALENDAR_CONST, DATES_CONST, DOWNLOAD_CONST} from '../Constants'

class Calendar extends Component {
    state = {
        paddedCleanersArray : [[]],
        paddedCleanersArrayAsCsv : [],
        exclusionList : [],
        exclusionListCleaner : "",
        exclusionListRoom : "",
        columnIndex : 0
    }

    render() {
        const handleSubmit = (event) => {
            event.preventDefault();
            ConvertTableToCsv();
            GenerateAndDownloadFile();
        }

        const GenerateAndDownloadFile = () => {
            var element = document.createElement("a");
            var file = new Blob(this.state.paddedCleanersArrayAsCsv, {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = new Date() + "_calendar.csv";
            element.click();
        }
        
        const ConvertTableToCsv = () => {
            //Add headers
            this.state.paddedCleanersArrayAsCsv.push(DATES_CONST + ",");
            this.props.rooms.forEach(room => {
                this.state.paddedCleanersArrayAsCsv.push(room.name + ",")
            })
            this.state.paddedCleanersArrayAsCsv.push("\n")

            //Add table content
            let rowIndex = 0;
            CalendarDates().forEach((date) => {
                let roomsIndex = 0;
                
                //Add date
                this.state.paddedCleanersArrayAsCsv.push(date + ",");
                
                //Cycle through each column and row and assign a cleaner.
                this.props.rooms.forEach(() => {
                    //Return a cleaner
                    var cleaner = this.state.paddedCleanersArray[roomsIndex++][rowIndex];
                    if (cleaner.name === undefined) {
                        cleaner = "";
                        this.state.paddedCleanersArrayAsCsv.push(cleaner);
                    }
                    else this.state.paddedCleanersArrayAsCsv.push(cleaner.name)
                    this.state.paddedCleanersArrayAsCsv.push(",")
                })
                
                //Create new line for next row.
                this.state.paddedCleanersArrayAsCsv.push("\n");
                rowIndex++;
            })
        }
    
        const DownloadCalendar = () => {
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
            
            return (cleaningDateList)
        }
        
        const DaysUntilSaturday = () => {
            var currentDayOfTheWeekAsNum = new Date().getDay();
            var saturdayAsNum = 6;
            var daysUntilSaturday = 0;
            
            if (currentDayOfTheWeekAsNum !== saturdayAsNum) {
                daysUntilSaturday = saturdayAsNum - currentDayOfTheWeekAsNum;
            }
            
            return (daysUntilSaturday)
        }
        
        const CalendarLength = () => {
            var tableRowArray = [0,1,2,3,4,5,6,7];//TODO: add variable length
            
            return (tableRowArray)
        }
        
        const TableHeaders = ({room}) => {
            return (
                <th key={room.name}>{room.name}</th>
            )
        }

        const ReturnNonExcludedCleaners = (currentRoom) => {
            //Initialise array
            let nonExcludedCleanerList = [];
            
            //Return excluded cleaner list for current room
            let roomsIndex = this.props.exclusionList.findIndex(p => p.room === currentRoom.name)
            let exclusionList = this.props.exclusionList;
            let exclusionListItem = {...exclusionList[roomsIndex]};
            let excludedCleanerList = exclusionListItem.cleaner;
            
            //Check to see if excludedCleanerList contains any cleaners. 
            if (excludedCleanerList !== undefined) {
                //If true, loop through prop cleaners list and check to see if any cleaner is contained within the exclusion cleaner list.
                this.props.cleaners.forEach(propCleaner => {
                        //If the cleaner is not found, then add cleaner to new cleaner list.
                        if (!excludedCleanerList.includes(propCleaner.name)) {
                            nonExcludedCleanerList.push({name: propCleaner.name, id: Math.random()});
                        }
                    }) 
            } 
            else {
                nonExcludedCleanerList = this.props.cleaners;
            }

            return nonExcludedCleanerList;
        }
        
        const BuildTableArray = () => {
            //Initialise multi-dimensional paddedCleanersArray
            for (var i = 0; i < this.props.rooms.length; i++) {
                this.state.paddedCleanersArray[i] = new Array(0);
            }

            let cleanerColumnIndex = 0;
            
            //Cleaner/room assignment calculation
            for (let columnIndex = 0; columnIndex < this.props.rooms.length; columnIndex++) {
                //Initialise values
                var cleanerIndex = 0;
                let weekIndex = 0;
                let offSet = 0;
                let previousCleanerIndex = 0;
                let skipFlag;
                let offSetFlag = false;

                var currentRoom = this.props.rooms[columnIndex];
                var currentRoomFrequency = currentRoom.frequency;
                let nonExcludedCleanerList = ReturnNonExcludedCleaners(currentRoom);

                for (let tableRowIndex = 0; tableRowIndex < CalendarLength().length; tableRowIndex++) {
                        //Ensure that the week counter resets every 4 weeks
                        if (tableRowIndex === 0) weekIndex = tableRowIndex + 1;
                        else if (weekIndex >= 4) weekIndex = 1; 
                        else weekIndex++;

                        //Determine if the current room and week requires that the cleaner is skipped.
                        if ((currentRoomFrequency === "fortnightly" && (weekIndex === 2 || weekIndex === 4)) || 
                            (currentRoomFrequency === "thrice-monthly" && weekIndex === 4) || 
                            (currentRoomFrequency === "monthly" && weekIndex !== 1)) {
                            skipFlag = true;
                        } else skipFlag = false;
                        
                        //Determine cleanerIndex value. 
                        //First week tracks columnIndex but resets to 0 depending on cleaner.length.
                        if (tableRowIndex === 0) cleanerIndex = cleanerColumnIndex;
                        else cleanerIndex = previousCleanerIndex + offSet + 1;

                        //If cleanerIndex is greater than cleaner list, then reset values to 0.
                        if (cleanerIndex >= nonExcludedCleanerList.length) {
                            cleanerIndex = 0;
                            offSet = 0;
                        }

                        //Return cleaner from list.
                        //If no cleaner is returned, modify offSet value so that cleaners are not skipped over.
                        //Use offSetFlag to ensure that offSet value is only decremented once. This is required
                        //for when the frequency of a room requires cleaners to not be assigned for more than
                        //one consecutive week.
                        let cleanerToReturn = AddCleanerToArray(skipFlag, cleanerIndex, nonExcludedCleanerList);
                        if (cleanerToReturn === "" && offSetFlag === false) {
                            offSet--;
                            offSetFlag = true;
                        }
                        else if (cleanerToReturn !== "") {
                            offSet = 0;
                            offSetFlag = false;
                        }

                        //Push cleaner to state and local array for download/calendar display
                        this.state.paddedCleanersArray[columnIndex].push(cleanerToReturn);

                        //Save last cleaners index.
                        previousCleanerIndex = cleanerIndex;
                    }

                    //Reset cleanerColumnIndex if it is greater than or equal to cleaners.length. 
                    //This ensures that for week one for each room, a new cleaner is assigned that follows the calendar's pattern.
                    if (cleanerColumnIndex >= this.props.cleaners.length - 1) cleanerColumnIndex = 0;
                    else cleanerColumnIndex++
                }   

                return (this.state.paddedCleanersArray)
            }

        const AddCleanerToArray = (skipFlag, cleanerIndex, nonExcludedCleanerList) => {
            var _cleanerIndex = cleanerIndex;
            var cleanerToReturn;
            
            if (skipFlag === true){
                cleanerToReturn = "";
            }
            else {
                nonExcludedCleanerList.slice(_cleanerIndex, _cleanerIndex + 1).map(cleaner => {
                    return (
                        cleanerToReturn = cleaner
                    )
                })
            }

            return (cleanerToReturn)
        }

        const Table = () => {
            let roomsIndex = 0;
            let rowIndex = 0;

            //Build table array
            BuildTableArray();

            //Render table to page
            return (
                <table>
                    <thead>
                        <tr>
                            <th>{DATES_CONST}:</th>
                            {this.props.rooms.map(room => {
                                return (
                                    <TableHeaders room={room} key={Math.random() + "," + room} />
                                )
                            })} 
                        </tr>
                    </thead>
                    <tbody>
                        {CalendarDates().map((date) => {
                            return (
                                <tr key={date}>
                                    <td key={date}>{date}</td>
                                    {this.props.rooms.map(() => {
                                        //Cycle through array and assign  a cleaner.
                                        var cleaner = this.state.paddedCleanersArray[roomsIndex++][rowIndex];

                                        //If roomsIndex has reached the maximum, increment the row and reset roomsIndex.
                                        if (roomsIndex === this.props.rooms.length) {
                                            rowIndex++;
                                            roomsIndex = 0;
                                        }
                                        return (
                                            <td key={Math.random() + "," + cleaner.name}>
                                                {cleaner.name}
                                            </td>
                                        )
                                    })} 
                                </tr>
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