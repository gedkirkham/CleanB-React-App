const initState = {
    cleaners: [
        {name: 'Ged', id: 1},
        {name: 'Tom', id: 2}
    ],
    rooms: [ ]
}

const rootReducer = (state = initState, action) => {
    console.log(action);
    if(action.type === 'DELETE_CLEANER') {
        let newCleanerList = state.cleaners.filter(cleaners => {
            return action.id !== cleaners.id
        });
        return {
            ...state,
            cleaners: newCleanerList
        }
    }
    if(action.type === 'ADD_CLEANER') {
        return {
            ...state,
            cleaners: [...state.cleaners, action.name]
        }
    }
    return state;
}

export default rootReducer;