import React from 'react';
import PropTypes from 'prop-types';

import DeleteIcon from '../Images/delete-icon.png'
import { ROOMS_CONST, DELETE_ICON_ALT_CONST } from '../Constants'

const Rooms = ({rooms, deleteRoom}) => {
    const roomList = rooms.length ? (
        rooms.map(room => {
            return (
                <div className="room collection-item row" key={room.name}>
                    <img dataTest="delete-icon" className="left" src={DeleteIcon} onClick={() => {deleteRoom(room.id)}} alt={DELETE_ICON_ALT_CONST}></img>
                    <div dataTest="room-name" className="left">{room.name}</div>
                </div>
            )   
        })
    ) : (
        <p dataTest="no-rooms-present-text">You have no rooms :/</p>
    )
    return (
        <section dataTest="component-rooms" className="rooms-list row">
            <h5 dataTest="rooms-header">{ROOMS_CONST}</h5>
            {roomList}
        </section>
    )
}

Rooms.propTypes = {
    rooms : PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            frequency : PropTypes.string.isRequired
    })).isRequired,
    deleteRoom : PropTypes.func.isRequired
}

export default Rooms