import React, { Component } from 'react'
import M from 'materialize-css';
import { connect } from 'react-redux'
import { addCleanerToExclusionList } from '../Actions/cleanerActions'
import {EXCLUDE_CLEANER_FROM_ROOM_CONST, EXCLUDE_CONST} from '../Constants'

class ExcludeCleaner extends Component {
    state = {
        paddedCleanersArray : [],
        paddedCleanersArrayAsCsv : [],
        exclusionList : [],
        exclusionListCleaner : null,
        exclusionListRoom : null
    }

    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function() {
            M.FormSelect.init(document.querySelectorAll('select'), document.querySelectorAll('option'));
          });
    }

    shouldComponentUpdate(nextProps,nextState){
        console.log('should component update');
        
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
            }
        })

        this.props.addCleanerToExclusionList(this.state.exclusionList.cleaner);
        
        console.log("this.props.exclusionList.name: " + this.props.exclusionList);
        console.log("this.state.exclusionList.cleaner: " + this.state.exclusionList.cleaner);
        console.log("this.state.exclusionList.room: " + this.state.exclusionList.room);
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
            <div className="exclude-cleaner row">
                <h3>{EXCLUDE_CLEANER_FROM_ROOM_CONST}</h3>

                <form className="row input-field" onSubmit={this.handleExclusionSubmit}>
                    <ListAsOption cleaners={this.props.cleaners} />
                    <ListAsOption rooms={this.props.rooms} />
                    <button className="btn grey">{EXCLUDE_CONST}</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cleaners : state.cleaners,
        rooms : state.rooms ,
        exclusionList : state.exclusionList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCleanerToExclusionList: (name) => { dispatch(addCleanerToExclusionList(name))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExcludeCleaner);