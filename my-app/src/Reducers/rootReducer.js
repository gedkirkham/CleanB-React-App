const initState = {
    cleaners: [
        {name: 'Ged', id: 1},
        {name: 'Razvan', id: 2},
        {name: 'Tom', id: 3},
        {name: 'Peter', id: 4}
    ],
    rooms: [
        {name: "Lounge", frequency: "weekly", id: 1},
        {name: "Kitchen", frequency: "fortnightly", id: 2},
        {name: "Garage", frequency: "monthly", id: 3},
        {name: "Bedroom", frequency: "weekly", id: 4},
        {name: "Garden", frequency: "weekly", id: 5},
        {name: "Hall way 1", frequency: "fortnightly", id: 6},
        {name: "Hall way 2", frequency: "weekly", id: 7},
        {name: "Lounge 2", frequency: "weekly", id: 8},
        {name: "Kitchen 2", frequency: "fortnightly", id: 9},
        {name: "Garage 2", frequency: "monthly", id: 10},
        {name: "Bedroom 2", frequency: "weekly", id: 11},
        {name: "Garden 2", frequency: "weekly", id: 12},
        {name: "Hall way 1 2", frequency: "fortnightly", id: 13},
        {name: "Hall way 2 2", frequency: "weekly", id: 14}
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
            if (!state.exclusionList.includes(action.name.room)){
                if (action.name !== null && action.name !== undefined){
                    if (state.exclusionList.some(({room}) => room.includes(action.name.room))) {    
                        let roomsIndex = state.exclusionList.findIndex(p => p.room === action.name.room)

                        //Amend current index if room exists in array.
                        let exclusionList = [...state.exclusionList];
                        let exclusionListItem = {...exclusionList[roomsIndex]};
                        let oldCleaners = exclusionListItem.cleaner;
                        let newCleaners = [...oldCleaners, action.name.cleaner]
                        exclusionList[roomsIndex] = {room: action.name.room, cleaner: newCleaners};
                        return {
                            ...state,
                            exclusionList: exclusionList
                        }
                    }
                    else {  
                        return {
                            ...state,
                            exclusionList: [...state.exclusionList, {room: action.name.room, cleaner: [action.name.cleaner]}]
                        }
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