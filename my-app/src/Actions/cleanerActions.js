/**
 * Pre-defines accepted action types
 * @function actionTypes
 * @returns {object} - accepted action types
 */
export const actionTypes = {
    ADD_CLEANER : "ADD_CLEANER",
    DELETE_CLEANER : "DELETE_CLEANER",
    ADD_CLEANER_TO_EXCLUSION_LIST : "ADD_CLEANER_TO_EXCLUSION_LIST"
}

/**
 * @function addCleaner
 * @returns {object} - action object of type "ADD_CLEANER" 
 */
export function addCleaner(name) {
    return {
        type : actionTypes.ADD_CLEANER, 
        name
    }
}

/**
 * @function deleteCleaner
 * @returns {object} - action object of type "DELETE_CLEANER" 
 */
export function deleteCleaner(id) {
    return {
        type : actionTypes.DELETE_CLEANER, 
        id
    }
}

/**
 * @function addCleanerToExclusionList
 * @returns {object} - action object of type "ADD_CLEANER_TO_EXCLUSION_LIST" 
 */
export function addCleanerToExclusionList(name) {
    return {
        type: actionTypes.ADD_CLEANER_TO_EXCLUSION_LIST, 
        name
    }
}