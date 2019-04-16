/**
 * Pre-defines accepted action types
 * @function actionTypes
 * @returns {object} - accepted action types
 */
export const actionTypes = {
    ADD_ROOM : "ADD_ROOM",
    DELETE_ROOM : "DELETE_ROOM",
}

/**
 * @function addRoom
 * @returns {object} - action object of type "ADD_ROOM" 
 */
export function addRoom(room) {
    return {
        type : actionTypes.ADD_ROOM, 
        room
    }
}

/**
 * @function deleteRoom
 * @returns {object} - action object of type "DELETE_ROOM" 
 */
export const deleteRoom = (id) => {
    return {
        type : actionTypes.DELETE_ROOM, 
        id
    }
}