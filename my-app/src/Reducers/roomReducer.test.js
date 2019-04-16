import { actionTypes } from '../Actions/roomActions'
import RoomReducer, { initState } from './roomReducer';

const roomId = 2;
const roomToAdd = { name : "Bedroom", frequency : "weekly", id : roomId }
const roomToAddAction = {
    type : actionTypes.ADD_ROOM,
    room : roomToAdd
}

test('returns initial state when no actions have been passed', () => {
    const newState = RoomReducer(undefined, {});
    expect(newState).toBe(initState);
})
test('returns updated room list when "ADD_ROOM" action is passed', () => {
    const initialState = RoomReducer(undefined, {});
    const newState = RoomReducer(undefined, roomToAddAction);
    expect(newState.rooms).toEqual({...initialState, rooms : [...initialState.rooms, roomToAdd]}.rooms)
})
test('returns updated room list when "DELETE_ROOM" action is passed', () => {
    const initialState = RoomReducer(undefined, {});
    
    //Add room
    RoomReducer(undefined, roomToAddAction);
    
    const roomToDeleteAction = {
        type : actionTypes.DELETE_ROOM,
        id : roomId
    }

    //Delete room
    const newState = RoomReducer(undefined, roomToDeleteAction);
    expect(newState.rooms).toEqual(initialState.rooms)
})