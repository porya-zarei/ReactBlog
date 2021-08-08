import { getUser } from "../../services/userServices";


export const getSingleUser = (UserId,token) => {

    return async dispatch => {
        const { data } = await getUser(UserId,token);
        console.log("data in user => ", data);
        await dispatch({ type: "SET_USER", payload: data });
    }
}

export const addUser = user => {
    return async (dispatch) => {
        await dispatch({ type: "SET_USER", payload: user });
    }
}

export const clearUser = () => {
    return async dispatch => {
        await dispatch({ type: "CLEAR_USER", payload: {} });
    }
}