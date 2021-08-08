export const usersReducer = (state = [], action) => {
    switch (action.type) {
        case "INIT_USERS":
            return [...action.payload];
        case "DELETE_USER":
            return [...action.payload];
        default:
            return state;
    }
};
