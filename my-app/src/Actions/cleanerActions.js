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