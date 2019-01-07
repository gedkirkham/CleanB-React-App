import React, { Component } from 'react'
import {DOWNLOAD_CALENDAR_CONST, CALENDAR_CONST, DATES_CONST, DOWNLOAD_CONST, EXCLUDE_CLEANER_FROM_ROOM_CONST, EXCLUDE_CONST} from '../Constants'

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

        const handleExclusionSubmit = (event) => {
            event.preventDefault();

            if(this.state.exclusionListCleaner !== '') {
                this.setState({
                    exclusionList : {cleaner : this.state.exclusionListCleaner, room : this.state.exclusionListRoom}
                })
                
                this.setState({
                    exclusionListCleaner : '',
                    exclusionListRoom : ''
                })
            }

            console.log("this.state.exclusionList: " + this.state.exclusionList)
        }

        const handleChange = (event) => {
            if(event.target.name === "cleaner"){
                this.state.exclusionListCleaner = event.target.value;
                console.log("this.state.exclusionListCleaner: " +this.state.exclusionListCleaner);
            }
            else if(event.target.name === "excluded-room"){
                this.state.exclusionListRoom = event.target.value;
                console.log("this.state.exclusionListRoom: "+this.state.exclusionListRoom);
            }
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
                    <button onClick={handleSubmit}>{DOWNLOAD_CONST}</button>
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
            var flag = false;
            var cleanerIndex = 0;
            var dateIndex = tableRowIndex;
            var weekIndex = tableRowIndex + 1;
            var skipFlag;

            //cleaner/room assignment calculation
            for(var columnCount = 0; columnCount < rooms.length; columnCount++){
                if(cleanerIndex + tableRowIndex >= cleaners.length){
                    cleanerIndex = 0;
                    tableRowIndex = 0;
                    flag = true;
                }

                var currentRoom = rooms[columnCount];
                var currentRoomFrequency = currentRoom.frequency;
                if((currentRoomFrequency === "fortnightly" && (weekIndex === 2 || weekIndex === 4)) || (currentRoomFrequency === "thrice-monthly" && weekIndex === 4) || (currentRoomFrequency === "monthly" && weekIndex !== 1)){
                    skipFlag = true;
                }
                else {
                    skipFlag = false;
                }

                var cleanerToReturn = AddCleanerToArray(flag, skipFlag, cleaners, cleanerIndex, tableRowIndex);
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

        const AddCleanerToArray = (flag, skipFlag, cleaners, cleanerIndex, tableRowIndex) => {
            var _cleanerIndex = cleanerIndex;
            var _tableRowIndex = tableRowIndex;
            var cleanerToReturn;
            
            if(skipFlag === false){
                cleaners.slice((_cleanerIndex + _tableRowIndex), (_cleanerIndex + _tableRowIndex + 1)).map(cleaner => {
                    return (
                        cleanerToReturn = cleaner
                    )
                })
            }
            else if (skipFlag === true){
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

        const ListAsOption = ({rooms, cleaners}) => {
            var listItems;
            var name;
            
            if(rooms != null){
                listItems = rooms;
                name = "excluded-room"
            }
            else if (cleaners != null) {
                listItems = cleaners;
                name = "cleaner"
            }
            
            return (
                <select name={name} size="4" className="row browser-default" onChange={handleChange}>  
                    {listItems.map(listItem => {
                        return (
                            <option id={name} key={listItem.name} value={listItem.name}>{listItem.name}</option>
                        )
                    })}
                </select>
            )
        }
          
        return (
            <div className="calendar row">
                <div className="row">
                    <h3>{CALENDAR_CONST}</h3>
                    <Table cleaners={this.props.cleaners} rooms={this.props.rooms}/>
                </div>

                <h3>{EXCLUDE_CLEANER_FROM_ROOM_CONST}</h3>

                {/* onSubmit={this.handleSubmit}>
                onClick={() => {deleteCleaner(cleaner.id)}} alt={DELETE_ICON_ALT_CONST}></img> 
                onSubmit={() => {handleExclusionSubmit(this.state.exclusionListCleaner, this.state.exclusionListRoom)}}*/}
                <form className="row input-field" onSubmit={handleExclusionSubmit}>
                    <ListAsOption rooms={this.props.rooms} />
                    <ListAsOption cleaners={this.props.cleaners} />

                    <button>{EXCLUDE_CONST}</button>
                </form>

                {/* const Cleaners = ({cleaners, deleteCleaner}) => {
                    const cleanerList = cleaners.length ? (
                        cleaners.map(cleaner => {
                            return (
                                <div className="cleaner collection-item row" key={cleaner.id}>
                                    <img className="left" src={DeleteIcon} onClick={() => {deleteCleaner(cleaner.id)}} alt={DELETE_ICON_ALT_CONST}></img> */}
                
                <div className="row">
                    <h3>{DOWNLOAD_CALENDAR_CONST}</h3>
                    <DownloadCalendar cleaners={this.props.cleaners} rooms={this.props.rooms}/> 
                </div>
            </div>
        )
    }
}

export default Calendar;