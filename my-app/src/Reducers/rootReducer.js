const initState = {
    cleaners: [
        {name: 'Ged', id: 1},
        {name: 'Tom', id: 2},
        {name: 'Peter', id: 3},
        {name: 'Bob', id: 4}
    ],
    rooms: [ 
        {name: 'Room 1', frequency: 'weekly', id: 1},
        {name: 'Fortnightly room', frequency: 'fortnightly', id: 2},
        {name: 'Room 3', frequency: 'weekly', id: 3},
        {name: 'thrice-monthly', frequency: 'thrice-monthly', id: 4},
        {name: 'monthly', frequency: 'monthly', id: 5},
        {name: 'Garage', frequency: 'weekly', id: 6}
    ],
    exclusionList: []
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
        case 'ADD_CLEANER_TO_EXCLUSION_LIST':
            if (!state.exclusionList.includes(action.name)){
                if (action.name !== null && action.name !== undefined){
                    return {
                        ...state,
                        exclusionList: [...state.exclusionList, action.name]
                    }
                } else {
                    console.log(action.name + " can not be added to list.")    
                }
            } else {
                console.log(action.name + " already exists.")
            }
            break;
        default:
            if (!action.type.includes("@@redux")) console.log("No switch statment found within rootReducer.")//TODO: error catch.
    }
    return state;
}

export default rootReducer;