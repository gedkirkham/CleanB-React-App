import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCleanerToExclusionList } from '../Actions/cleanerActions'
import {EXCLUDE_CLEANER_FROM_ROOM_CONST, EXCLUDE_CONST} from '../Constants'

class ExcludeCleaner extends Component {
    state = {
        exclusionList : [],
        exclusionListCleaner : null,
        exclusionListRoom : null
    }

    shouldComponentUpdate(nextProps){
        console.log('ExcludeCleaner.js - should component update');

        if(this.props.cleaners === nextProps.cleaners && this.props.rooms === nextProps.rooms){
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
            }}, function() { //function() waits until the states have been updated
                //The below null check prevents form from being submitted unless both states contain a value
                if (this.state.exclusionList.cleaner === null || this.state.exclusionList.room === null) {
                    alert("A cleaner and room need to be selected");//TODO: Add better error handling.
                    return false;
                }
                else {
                    if (this.props.exclusionList.some(({room}) => room.includes(this.state.exclusionList.room))) {
                        let roomsIndex = this.props.exclusionList.findIndex(p => p.room === this.state.exclusionList.room)
                        let exclusionListItem = this.props.exclusionList[roomsIndex];
                        let cleaners = exclusionListItem.cleaner;
                        
                        if (cleaners.includes(this.state.exclusionList.cleaner)){
                            alert("Cleaner has already been excluded from cleaning this room.")//TODO: add better error handling
                        }
                        else {
                            this.props.addCleanerToExclusionList(this.state.exclusionList);
                        }
                    }
                    else {
                        this.props.addCleanerToExclusionList(this.state.exclusionList);
                    }
                }
        });
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
            var option;
            
            if(rooms != null){
                listItems = rooms;
                name = "excluded-room";
                option = "room";
            }
            else if (cleaners != null) {
                listItems = cleaners;
                name = "cleaner";
                option = name;
            }
            
            return (
                <select defaultValue={option} name={name} className="row browser-default" onChange={this.handleChange}>  
                    <option value={option} disabled>Choose your {option}</option>
                    {listItems.map(listItem => {
                        return (
                            <option id={name} key={listItem.name} value={listItem.name}>{listItem.name}</option>
                        )
                    })}
                </select>
            )
        }
        
        return (
            <section className="exclude-cleaner row">
                <h3>{EXCLUDE_CLEANER_FROM_ROOM_CONST}</h3>

                <form className="row input-field" onSubmit={this.handleExclusionSubmit}>
                    <ListAsOption rooms={this.props.rooms} />
                    <ListAsOption cleaners={this.props.cleaners} />
                    <button className="btn grey">{EXCLUDE_CONST}</button>
                </form>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cleaners : state.cleanerReducer.cleaners,
        rooms : state.roomReducer.rooms ,
        exclusionList : state.cleanerReducer.exclusionList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCleanerToExclusionList: (name) => { dispatch(addCleanerToExclusionList(name))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExcludeCleaner);