const initState = {
    cleaners: [
        {name: 'Ged', id: 1},
        {name: 'Tom', id: 2},
        {name: 'Peter', id: 3}
    ],
    rooms: [ 
        {name: 'Room 1', frequency: 'weekly', id: 1},
        {name: 'Room 2', frequency: 'fortnightly', id: 2},
        {name: 'Room 3', frequency: 'weekly', id: 3},
        {name: 'Room 4', frequency: 'weekly', id: 4}
    ]
}

const rootReducer = (state = initState, action) => {
    switch(action.type){
        case 'ADD_CLEANER':
            return {
                ...state,
                cleaners: [...state.cleaners, action.name]
            }
        case 'DELETE_CLEANER':
            let newCleanerList = state.cleaners.filter(cleaners => {
                return action.id !== cleaners.id
            });
            return {
                ...state,
                cleaners: newCleanerList
            }
        case 'ADD_ROOM':
            return {
                ...state,
                rooms: [...state.rooms, action.name]
            }
        case 'DELETE_ROOM':
            let newRoomList = state.rooms.filter(rooms => {
                return action.id !== rooms.id
            });
            return {
                ...state,
                rooms: newRoomList
            }
    }
    return state;
}

export default rootReducer;