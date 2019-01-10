import React, { Component } from 'react'
import { connect } from 'react-redux'
import {EXCLUDE_CLEANER_FROM_ROOM_CONST, EXCLUDE_CONST} from '../Constants'

class ExcludeCleaner extends Component {
    state = {
        paddedCleanersArray : [],
        paddedCleanersArrayAsCsv : [],
        exclusionList : [],
        exclusionListCleaner : "",
        exclusionListRoom : ""
    }

    shouldComponentUpdate(nextProps,nextState){
        console.log('shouldComponentUpdate');
        
        if(nextState.exclusionListCleaner !== this.state.exclusionListCleaner || nextState.exclusionListRoom !== this.state.exclusionListRoom || nextState.exclusionList.cleaner !== this.state.exclusionList.cleaner || nextState.exclusionList.room !== this.state.exclusionList.room){
            return false;
        }
        else {
            return true;
        }
    }
    
    handleExclusionSubmit = (event) => {
        event.preventDefault();

        this.setState({
            exclusionList : {
                cleaner : this.state.exclusionListCleaner, 
                room : this.state.exclusionListRoom
            }
        })
        
        this.setState({
            exclusionListCleaner : '',
            exclusionListRoom : '' //TODO: component is updating and re-rereendering once submit button has been executed three times?
        })

        console.log("this.state.exclusionList.cleaner: " + this.state.exclusionList.cleaner)
        console.log("this.state.exclusionList.room: " + this.state.exclusionList.room)
    }

    handleChange = (event) => {
        if(event.target.name === "cleaner"){
            this.setState({
                exclusionListCleaner : event.target.value
            })
        }
        else if(event.target.name === "excluded-room"){
            this.setState({
                exclusionListRoom : event.target.value
            })
        }
    }

    render() {
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
                <select name={name} size="4" className="row browser-default" onChange={this.handleChange}>  
                    {listItems.map(listItem => {
                        return (
                            <option id={name} key={listItem.name} value={listItem.name}>{listItem.name}</option>
                        )
                    })}
                </select>
            )
        }

        return (
            <div className="exclude-cleaner row">
                <h3>{EXCLUDE_CLEANER_FROM_ROOM_CONST}</h3>

                {/* onSubmit={this.handleSubmit}>
                onClick={() => {deleteCleaner(cleaner.id)}} alt={DELETE_ICON_ALT_CONST}></img> 
                onSubmit={() => {handleExclusionSubmit(this.state.exclusionListCleaner, this.state.exclusionListRoom)}}*/}
                <form className="row input-field" onSubmit={this.handleExclusionSubmit}>
                    <ListAsOption rooms={this.props.rooms} />
                    <ListAsOption cleaners={this.props.cleaners} />
                    <button>{EXCLUDE_CONST}</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cleaners : state.cleaners,
        rooms : state.rooms 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //cleaners
        // addCleaner: (name) => { dispatch(addCleaner(name))},
        // deleteCleaner: (id) => { dispatch(deleteCleaner(id))},

        // //rooms
        // addRoom: (name) => { dispatch(addRoom(name))},
        // deleteRoom: (id) => { dispatch(deleteRoom(id))},
    }
}

// export default ExcludeCleaner
export default connect(mapStateToProps, mapDispatchToProps)(ExcludeCleaner);