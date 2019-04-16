import { actionTypes } from '../Actions/cleanerActions'
import CleanerReducer, { initState } from './cleanerReducer';

const cleanerId = 2;
const cleanerToAdd = { name : "Tom", id : cleanerId }
const cleanerToAddAction = {
    type : actionTypes.ADD_CLEANER,
    cleaner : cleanerToAdd
}

test('returns initial state when no actions have been passed', () => {
    const newState = CleanerReducer(undefined, {});
    expect(newState).toBe(initState);
})
test('returns updated cleaners list when "ADD_CLEANER" action is passed', () => {
    const initialState = CleanerReducer(undefined, {});
    const newState = CleanerReducer(undefined, cleanerToAddAction);
    expect(newState.cleaners).toEqual({...initialState, cleaners : [...initialState.cleaners, cleanerToAdd]}.cleaners)
})
test('returns updated cleaners list when "DELETE_CLEANER" action is passed', () => {
    const initialState = CleanerReducer(undefined, {});
    
    //Add cleaner
    CleanerReducer(undefined, cleanerToAddAction);

    const cleanerToDeleteAction = {
        type : actionTypes.DELETE_CLEANER,
        id : cleanerId
    }
    
    //Delete cleaner
    const newState = CleanerReducer(undefined, cleanerToDeleteAction);
    expect(newState.cleaners).toEqual(initialState.cleaners)
})