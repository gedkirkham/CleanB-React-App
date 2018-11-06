import React from 'react';
import DeleteIcon from '../Images/delete-icon.png'

const Rooms = ({rooms, deleteRoom}) => {
    const roomList = rooms.map(room => {
        return (
            <div className="room" key={room.id}>
                <div>{room.name}</div>
                <img src={DeleteIcon} onClick={() => {deleteRoom(room.id)}} alt="Delete Icon"></img>
            </div>
        )   
    })
    return (
        <div className="rooms-list">
            <h3>Rooms:</h3>
            {/* //TODO: When no rooms exist, add a message */}
            {roomList}
        </div>
    )
}

export default Rooms