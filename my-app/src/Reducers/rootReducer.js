const initState = {
    cleaners: [
        {name: 'Ged', id: 1},
        {name: 'Tom', id: 2}
    ],
    rooms: [ 
        {name: 'Room 1', id: 1},
        {name: 'Room 2', id: 2}
    ]
}

const rootReducer = (state = initState, action) => {
    switch(action.type){
        case 'DELETE_CLEANER':
            let newCleanerList = state.cleaners.filter(cleaners => {
                return action.id !== cleaners.id
            });
            return {
                ...state,
                cleaners: newCleanerList
            }
        break;
        case 'ADD_CLEANER':
            return {
                ...state,
                cleaners: [...state.cleaners, action.name]
            }
        break;
    }
    return state;
}

export default rootReducer;