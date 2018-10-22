import React from 'react';

const Rooms = ({rooms, deleteRoom}) => {
    const roomList = rooms.map(room => {
        return (
            <div className="room" key={room.id}>
                <div>Name: {room.name}</div>
                <button onClick={() => {deleteRoom(room.id)}}>Remove</button>
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