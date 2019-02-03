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
        exclusionListRoom : "",
        columnIndex : 0
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

        const checkExclusionList = (currentRoom, cleanerIndex, cleanerToReturn, skipFlag, tableRowIndex, columnCount) => {
            //Ensure that cleaners within the excluded cleaners array are excluded from the calendar.
            if (cleanerToReturn === undefined) cleanerToReturn = {name: ""}; //Fixes bug that occurs when no cleaners are present.
            var cleanerIndexExclusionList = cleanerIndex;
            let cleanerCounter = 0;
            
            //Return current room index to determine if it is the exclusion list. Segment exclusion list into smaller components to make it easier to search/understand the code.
            let roomsIndex = this.props.exclusionList.findIndex(p => p.room === currentRoom.name)
            let exclusionList = this.props.exclusionList;
            let exclusionListItem = {...exclusionList[roomsIndex]};
            let excludedCleanerList = exclusionListItem.cleaner;
            
            //Check if returned cleaner is in the current rooms exclusion list and if true, then increment to next cleaner.
            while (roomsIndex >= 0 && cleanerCounter++ < this.props.cleaners.length && excludedCleanerList.includes(cleanerToReturn.name)) {    
                if (++cleanerIndexExclusionList >= this.props.cleaners.length) cleanerIndexExclusionList = 0;
                cleanerToReturn = AddCleanerToArray(skipFlag, this.props.cleaners, cleanerIndexExclusionList, tableRowIndex, columnCount);
                
                //If all cleaners have been excluded for current room, then return ""
                if (cleanerCounter >= this.props.cleaners.length) cleanerToReturn = "";
            }

            return cleanerToReturn;
        }
        
        const DefineTableArray = () => {
            var calendarDateList = CalendarDates();
            var paddedCleanersArray = [
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    []  
                ];//TODO: properly define
            
            var skipFlag;
            var cleanerToReturn;
            let skipCount = 0;
            
            // let tableRowIndex = 0;

            // if(tableRowIndex === 0){
            //     this.setState({
            //         columnIndex : 1
            //     })  
            // }

            //loop through each column/room
            //cycle through each row within that column and assign a cleaner
            //return and cycle through this array column then row item at a time to suite the table format
            
            //cleaner/room assignment calculation
            for (let columnIndex = 0; columnIndex < this.props.rooms.length; columnIndex++) {
                let cleanerIncrementor = 0;
                var cleanerIndex = 0;
                console.log("=====================column "+ columnIndex + "=========================")
                for (let tableRowIndex = 0; tableRowIndex < CalendarLength().length; tableRowIndex++) {
                    if(cleanerIndex >= this.props.cleaners.length){
                        cleanerIndex = 0;
                    }
                    var dateIndex = tableRowIndex;
                    var weekIndex = tableRowIndex + 1;
                    var currentRoom = this.props.rooms[columnIndex];
                    // console.log(currentRoom)
                    var currentRoomFrequency = currentRoom.frequency;

                    if((currentRoomFrequency === "fortnightly" && (weekIndex === 2 || weekIndex === 4)) || (currentRoomFrequency === "thrice-monthly" && weekIndex === 4) || (currentRoomFrequency === "monthly" && weekIndex !== 1)){
                        skipFlag = true;
                        // skipCount++;
                        // console.log("skipCount: " +skipCount)
                        // console.log("this.state.columnIndex: "+this.state.columnIndex)
                    }
                    else {
                        skipFlag = false;
                    }

                    //Ensure that cleaners index tracks dateIndex. This ensures that cleaner index incremenets each week.
                    // if(columnCount === 0) {
                    // if (cleanerIndex >= cleaners.length) cleanerIndex = 0;    
                    cleanerIndex = cleanerIncrementor + columnIndex;
                    if (cleanerIndex >= this.props.cleaners.length) cleanerIndex = 0;
                    cleanerToReturn = AddCleanerToArray(skipFlag, cleanerIndex);
                    if (cleanerToReturn !== "") cleanerIncrementor++;
                    // } else {
                    //     cleanerToReturn = AddCleanerToArray(skipFlag, cleaners, cleanerIndex, tableRowIndex, columnCount);
                    // }
                    
                    // cleanerToReturn = checkExclusionList(currentRoom, cleanerIndex, cleanerToReturn, skipFlag, tableRowIndex, columnCount);

                    // console.log("cleanerToReturn : " +cleanerToReturn.name)
                    this.state.paddedCleanersArray.push(cleanerToReturn);
                    console.log("columnIndex: "+columnIndex)
                    console.log("tableRowIndex: "+tableRowIndex)
                    console.log("cleanerToReturn: "+cleanerToReturn.name)
                    paddedCleanersArray[columnIndex].push(cleanerToReturn);
                    console.log(paddedCleanersArray[columnIndex]);

                    // if(!((currentRoomFrequency === "fortnightly" && (weekIndex === 2 || weekIndex === 4)) || (currentRoomFrequency === "thrice-monthly" && weekIndex === 4) || (currentRoomFrequency === "monthly" && weekIndex !== 1))){
                    //     cleanerIndex++;
                    // }
                    if(skipFlag !== true){
                        cleanerIndex++;
                    }
                }
            }

            // paddedCleanersArray.slice(0,CalendarDates().length).map(cleaner => {
            //     return (
            //         console.log("cleaner : "+cleaner.name)
            //     )
            // })
            // let paddedCleanersArraySliced = paddedCleanersArray.slice(0,CalendarDates().length);
            // paddedCleanersArraySliced.forEach(cleaner => {
            //     console.log("paddedCleanersArraySliced : "+cleaner.name);
            // })
            
            //tr column, td row

            return (
                paddedCleanersArray
                )
            // for (let tableRowIndex = 0; tableRowIndex < CalendarLength().length; tableRowIndex++) {
            //     for (let columnIndex = 0; columnIndex < this.props.rooms.length; columnIndex++) {
            //                 console.log("columnIndex : "+columnIndex)
            //                 var paddedCleanersArrayColumn = paddedCleanersArray[columnIndex][tableRowIndex];
            //                 console.log("paddedCleanersArrayColumn : " +paddedCleanersArrayColumn.name)
            //                 // paddedCleanersArrayColumn.map(cleaner => {
            //                 //     return (
            //                 //         console.log("paddedCleanersArrayColumn : "+cleaner.name)
            //                 //     )
            //                 // })
                            
            //                 // var concertPrice = parseFloat(concertArray[0].value);
            //                 // var concertImage = concertArray[0].image;
            //                 return (
            //                     // {<td>
            //                     //     {calendarDateList[dateIndex]}
            //                     // </td>}
            //                     // paddedCleanersArraySliced.map(cleaner => {
            //                     //     return (
            //                     //         <td key={Math.random()}>{cleaner.name}</td>
            //                     //     )
            //                     // })
            //                     paddedCleanersArrayColumn.map(cleaner => {
            //                             return (
            //                                 <td key={Math.random()}>{paddedCleanersArrayColumn.name}</td>
            //                             )
            //                         })
            //             )
            //         }  
            //     } 
            }

        const AddCleanerToArray = (skipFlag, cleanerIndex) => {
            var _cleanerIndex = cleanerIndex;
            var cleanerToReturn;
            
            if (skipFlag === true){
                cleanerToReturn = "";
            }
            else {
                this.props.cleaners.slice(_cleanerIndex, _cleanerIndex + 1).map(cleaner => {
                    return (
                        cleanerToReturn = cleaner
                    )
                })
            }

            // if (skipFlag === true){
            //     cleanerToReturn = "";
            // }
            return (
                cleanerToReturn
            )
        }

        const Table = ({cleaners, rooms}) => {
            let roomsIndex = 0;
            let rowIndex = 0;
            let tableArray = DefineTableArray();
            let tableLength = CalendarDates();
            console.log("tableLength: "+tableLength.length)
            return (
                <table>
                    <thead>
                        <tr>
                            {/* <th>{DATES_CONST}</th> */}
                            {rooms.map(room => {
                                return (
                                    <TableHeaders room={room} />
                                )
                            })} 
                        </tr>
                    </thead>
                    <tbody>
                        {tableLength.map(() => {
                            return (
                                <tr>
                                    {this.props.rooms.map((room) => {//tr is row 
                                        console.log("roomsIndex : "+roomsIndex)
                                        console.log("rowIndex : "+rowIndex)
                                        if (roomsIndex === this.props.rooms.length) rowIndex++;
                                        if (roomsIndex >= this.props.rooms.length) roomsIndex = 0;
                                        
                                        var cleanerName = tableArray[roomsIndex++][rowIndex];
                                        if (cleanerName === undefined) cleanerName = "";
                                        
                                        console.log("cleanerName : " + cleanerName.name)
                                        console.log("ROOOOOOOOOOOM--------- " +room.name)
                                        {/* tableArray[roomsIndex - 1].map(cleaner => {
                                            return (
                                                console.log("tableArray[roomsIndex] : "+cleaner.name)
                                            )
                                        }) */}
                                        
                                        
                                        return (
                                            <td>
                                                {cleanerName.name}
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
        //<TableRow cleaners={cleaners} rooms={rooms} _roomsIndex={roomsIndex++} /*//TODO: How to solve the issue where padded cleaners have the same key. I will need to have the same key in order to remove the correct cleaner from db.*/ />
          
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