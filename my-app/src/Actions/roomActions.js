export const addRoom = (name) => {
    return {
        type: 'ADD_ROOM', 
        name
    }
}

export const deleteRoom = (id) => {
    return {
        type: 'DELETE_ROOM', 
        id
    }
}