import { actionTypes, addCleaner } from './cleanerActions';

describe("addCleaner", () => {
    test('returns an action of type "ADD_CLEANER"', () => {
        const action = addCleaner();
        expect(action).toEqual({ type : actionTypes.ADD_CLEANER })
    })
})