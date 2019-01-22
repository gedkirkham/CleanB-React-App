export const addCleaner = (name) => {
    return {
        type: 'ADD_CLEANER', 
        name
    }
}

export const deleteCleaner = (id) => {
    return {
        type: 'DELETE_CLEANER', 
        id
    }
}

export const addCleanerToExclusionList = (name) => {
    return {
        type: 'ADD_CLEANER_TO_EXCLUSION_LIST', 
        name
    }
}