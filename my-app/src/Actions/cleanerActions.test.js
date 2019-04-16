import { actionTypes, addCleaner, deleteCleaner } from './cleanerActions';

describe("addCleaner", () => {
    test('returns an action of type "ADD_CLEANER"', () => {
        const cleanerToAdd = "Ged";
        const action = addCleaner(cleanerToAdd);
        expect(action).toEqual({ type : actionTypes.ADD_CLEANER, cleaner : cleanerToAdd })
    })
})

describe("deleteCleaner", () => {
    test('returns an action of type "DELETE_CLEANER"', () => {
        const cleanersId = 1;
        const action = deleteCleaner(cleanersId);
        expect(action).toEqual({ type : actionTypes.DELETE_CLEANER, id : cleanersId })
    })
})