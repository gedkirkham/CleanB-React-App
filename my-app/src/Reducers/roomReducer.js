import { actionTypes } from "../Actions/roomActions";

export const initState = {
    rooms: [
        { name : "Kitchen", frequency : "weekly", id : 1 }
    ]
}

/**
 * Room reducer that sets the redux state
 * @function roomReducer
 * @param {*} state  - new state
 * @param {*} action - action to apply to new state
 */
export default (state = initState, action) => {
    switch(action.type){
        case actionTypes.ADD_ROOM:
            return {
                ...state,
                rooms: [...state.rooms, action.room]
            }
        case actionTypes.DELETE_ROOM:
            let newRoomList = state.rooms.filter(rooms => {
                return action.id !== rooms.id
            });
            return {
                ...state,
                rooms: newRoomList
            }
        default:
    }
    return state;
}