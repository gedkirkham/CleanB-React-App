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

        const checkExclusionList = (currentRoom, cleanerIndex, cleanerToReturn, skipFlag) => {
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
                cleanerToReturn = AddCleanerToArray(skipFlag, cleanerIndexExclusionList);
                
                //If all cleaners have been excluded for current room, then return ""
                if (cleanerCounter >= this.props.cleaners.length) cleanerToReturn = "";
            }

            return cleanerToReturn;
        }
        
        const BuildTableArray = () => {
            var paddedCleanersArray = [
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
            
            //loop through each column/room
            //cycle through each row within that column and assign a cleaner
            //return and cycle through this array column then row item at a time to suite the table format
            
            //cleaner/room assignment calculation
            for (let columnIndex = 0; columnIndex < this.props.rooms.length; columnIndex++) {
                var currentRoom = this.props.rooms[columnIndex];
                var currentRoomFrequency = currentRoom.frequency;

                let cleanerIncrementor = 0;
                let columnStartIndex = columnIndex;
                var cleanerIndex = 0;
                
                //TODO: looking at a way to improve exclusion list so that the table checks exclusion array upon render.
                let cleaners = this.props.cleaners;
                let roomsIndex = this.props.exclusionList.findIndex(p => p.room === currentRoom.name)
                let exclusionList = this.props.exclusionList;
                let exclusionListItem = {...exclusionList[roomsIndex]};
                let excludedCleanerList = exclusionListItem.cleaner;

                let newCleaners = [];
                this.props.cleaners.map(cleaner => {
                    return (
                        console.log("this.props.cleaners : " +cleaner.name)
                    )
                })

                // cleanerIndex = columnStartIndex + cleanerIncrementor;

                // if (cleanerIndex >= this.props.cleaners.length) {
                //     cleanerIndex = 0;
                //     columnStartIndex = 0;
                //     cleanerIncrementor = 0;
                // }
                
                var counter = 0;
                if (excludedCleanerList !== undefined) {
                    excludedCleanerList.map(cleaner => {
                        return (
                            console.log("excludedCleanerList : " +cleaner)
                        )
                    })
                    
                    
                    excludedCleanerList.map(excludedCleaner => {
                        console.log("counter : " + counter++)
                        this.props.cleaners.map(propCleaner => {
                                if (propCleaner.name !== excludedCleaner) {
                                    console.log("MATCH - "+ propCleaner.name);
                                    newCleaners.push({name: propCleaner.name, id: Math.random()});
                                }
                                else {
                                    console.log("propCleaner "+propCleaner)
                                    console.log("cleaner does not match - "+ excludedCleaner)
                                }
                            }) 
                        })
                } 
                else {
                    newCleaners = this.props.cleaners;
                }

                newCleaners.map(cleaner => {
                    console.log("FINAL -----------newCleaners : " +cleaner.name)
                })
                

                // if (excludedCleanerList !== undefined) {
                //     excludedCleanerList.map(listItem => {
                //         return (
                //             console.log("excludedCleanerList : " +listItem)
                //         )
                //     })

                //     cleaners.filter(x => {
                //         console.log("x : "+x.name)
                //     })
                    
                //     let difference = cleaners.filter(x => !excludedCleanerList.includes(x)).concat(excludedCleanerList.filter(x => !cleaners.name.includes(x)));
                //     // Array.prototype.diff = cleaners.filter(x => excludedCleanerList.includes(x));
                //     difference.map(diffs => {
                //             return (
                //                 console.log("diff item : " + diffs) 
                //             )
                //     })
                // }
                for (let tableRowIndex = 0; tableRowIndex < CalendarLength().length; tableRowIndex++) {
                        var dateIndex = tableRowIndex;
                        var weekIndex = tableRowIndex + 1;
                        

                        if((currentRoomFrequency === "fortnightly" && (weekIndex === 2 || weekIndex === 4)) || (currentRoomFrequency === "thrice-monthly" && weekIndex === 4) || (currentRoomFrequency === "monthly" && weekIndex !== 1)){
                            skipFlag = true;
                        }
                        else {
                            skipFlag = false;
                        }

                        cleanerIndex = columnStartIndex + cleanerIncrementor;

                        if (cleanerIndex >= newCleaners.length) {
                            cleanerIndex = 0;
                            columnStartIndex = 0;
                            cleanerIncrementor = 0;
                        }

                        cleanerToReturn = AddCleanerToArray(skipFlag, cleanerIndex, newCleaners);
                        if (cleanerToReturn !== "") cleanerIncrementor++;
                        
                        // cleanerToReturn = checkExclusionList(currentRoom, cleanerIndex, cleanerToReturn, skipFlag, tableRowIndex);

                        paddedCleanersArray[columnIndex]
                        this.state.paddedCleanersArray.push(cleanerToReturn);
                        paddedCleanersArray[columnIndex].push(cleanerToReturn);
                    }
                }   

            return (
                paddedCleanersArray
                )
            }

        const AddCleanerToArray = (skipFlag, cleanerIndex, newCleaners) => {
            var _cleanerIndex = cleanerIndex;
            var cleanerToReturn;
            
            if (skipFlag === true){
                cleanerToReturn = "";
            }
            else {
                newCleaners.slice(_cleanerIndex, _cleanerIndex + 1).map(cleaner => {
                    return (
                        cleanerToReturn = cleaner
                    )
                })
            }

            return (
                cleanerToReturn
            )
        }

        const Table = () => {
            let roomsIndex = 0;
            let rowIndex = 0;
            let tableArray = BuildTableArray();
            return (
                <table>
                    <thead>
                        <tr>
                            <th>{DATES_CONST}</th>
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
                                        if (roomsIndex === this.props.rooms.length) rowIndex++;
                                        if (roomsIndex >= this.props.rooms.length) roomsIndex = 0;
                                        
                                        var cleanerName = tableArray[roomsIndex++][rowIndex];
                                        if (cleanerName === undefined) cleanerName = "";
                                        
                                        return (
                                            <td key={Math.random() + "," + cleanerName.name}>
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