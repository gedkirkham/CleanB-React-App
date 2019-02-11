import React from 'react';
import DeleteIcon from '../Images/delete-icon.png'
import {ROOMS_CONST, DELETE_ICON_ALT_CONST} from '../Constants'

const Rooms = ({rooms, deleteRoom}) => {
    const roomList = rooms.length ? (
        rooms.map(room => {
            return (
                <div className="room collection-item row" key={room.name}>
                    <img className="left" src={DeleteIcon} onClick={() => {deleteRoom(room.id)}} alt={DELETE_ICON_ALT_CONST}></img>
                    <div className="left">{room.name}</div>
                </div>
            )   
        })
    ) : (
        <p>You have no rooms :/</p>
    )
    return (
        <div className="rooms-list row">
            <h5>{ROOMS_CONST}</h5>
            {roomList}
        </div>
    )
}

export default Rooms