import { actionTypes, addRoom, deleteRoom } from './roomActions';

describe("addRoom", () => {
    test('returns an action of type "ADD_ROOM" with inputted "name"', () => {
        const roomToAdd = "Lounge";
        const action = addRoom(roomToAdd);
        expect(action).toEqual({ type : actionTypes.ADD_ROOM, name : roomToAdd })
    })
})

describe("deleteRoom", () => {
    test('returns an action of type "DELETE_ROOM" with inputted "id"', () => {
        const roomsId = 1;
        const action = deleteRoom(roomsId);
        expect(action).toEqual({ type : actionTypes.DELETE_ROOM, id : roomsId })
    })
})