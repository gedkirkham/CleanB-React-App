import { actionTypes } from "../Actions/cleanerActions";

export const initState = {
    cleaners : [
        { name : 'Ged', id : 1 }
    ],
    exclusionList : []
}

/**
 * Cleaners reducer that sets the cleaners redux state
 * @function cleanerReducer
 * @param {*} state  - new state
 * @param {*} action - action to apply to new state
 */
export default (state = initState, action) => {
    switch(action.type){
        case actionTypes.ADD_CLEANER:
            return {
                ...state,
                cleaners: [...state.cleaners, action.cleaner]
            }
        case actionTypes.DELETE_CLEANER:
            let newCleanerList = state.cleaners.filter(cleaners => {
                return action.id !== cleaners.id
            });
            return {
                ...state,
                cleaners: newCleanerList
            }
        case actionTypes.ADD_CLEANER_TO_EXCLUSION_LIST:
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
        return state;
    }
}