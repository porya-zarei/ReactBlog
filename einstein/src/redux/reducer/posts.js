export const postsReducer = (state = [], action) => {
    switch (action.type) {
        case "INIT_POSTS":
            return [...action.payload];
        case "ADD_POST":
            return [...action.payload];
        case "DELETE_POST":
            return [...action.payload];
        case "UPDATE_POST":
            return [...action.payload];
        default:
            return state;
    }
};
