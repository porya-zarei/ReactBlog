export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_USER":
            return {...action.payload};
        case "CLEAR_USER":
            return {...action.payload};
        case "ADD_USER":
            return {...action.payload};
        case "UPDATE_USER":
            return {...action.payload};
        default:
            return state;
    }
};
