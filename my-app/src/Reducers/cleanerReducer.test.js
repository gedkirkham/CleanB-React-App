import { actionTypes } from '../Actions/cleanerActions'
import CleanerReducer from './cleanerReducer';
import { initState } from './cleanerReducer';

test('returns initial state when no actions have been passed', () => {
    const newState = CleanerReducer(undefined, {});
    expect(newState).toBe(initState);
})
test('returns updated cleaners list when "ADD_CLEANER" action is passed', () => {
    const cleanerToAdd = { name : "Tom", id : 3 }
    const cleanerToAddAction = {
        type : actionTypes.ADD_CLEANER,
        cleaner : cleanerToAdd
    }

    const initialState = CleanerReducer(undefined, {});
    const newState = CleanerReducer(undefined, cleanerToAddAction);
    expect(newState.cleaners).toEqual({...initialState, cleaners : [...initialState.cleaners, cleanerToAdd]}.cleaners)
})
test('returns updated cleaners list when "DELETE_CLEANER" action is passed', () => {
    const cleanerToDeleteAction = {
        type : actionTypes.DELETE_CLEANER,
        id : 1
    }

    const initialState = CleanerReducer(undefined, {});
    const newState = CleanerReducer(undefined, cleanerToDeleteAction);
    expect(newState.cleaners).toEqual(initialState.cleaners)
})