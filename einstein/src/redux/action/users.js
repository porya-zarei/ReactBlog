import { adminUpdateUser, getUsers, registerUser, removeUser, updateUser } from "../../services/userServices";
import localForage from "localforage";
import { toast } from "react-toastify";
import { decodeToken } from "../../utils/decodeToken";


export const getAllUsers = (token) => {
    return (async (dispatch,getState) => {
        try {
            const { data } = await getUsers(token);
            console.log("dddd in users", data);
            await dispatch({ type: "INIT_USERS", payload: data });
            localForage.setItem("users", data);
        } catch (error) {
            await dispatch({ type: "INIT_USERS", payload: getState().users });
            localForage.setItem("users", getState().users);
        }
    });
}

export const getAllUsersAsync = async (token) => {
    return (async (dispatch, getState) => {
        try {
            const { data } = await getUsers(token);
            console.log("dddd in users", data);
            await dispatch({ type: "INIT_USERS", payload: data });
            localForage.setItem("users", data);
        } catch (error) {
            await dispatch({ type: "INIT_USERS", payload: getState().users });
            localForage.setItem("users", getState().users);
        }
    });
}


export const updateCurrentUser = (user, token) => {
    console.log("user in uppp => ", user);
    return async (dispatch) => {
        const {data, status} = await updateUser(user, token);
        console.log("data in uppppppp =>", data, status);
        if (status === 200) {
            if (localStorage.getItem("token")) {
                localStorage.setItem("token", String(data));
            }
            console.log("dddd in update user", data);
            const dec = decodeToken(data).payload;
            const upUser = {
                Identity: dec.Identity,
                FullName: dec.FullName,
                Email: dec.Email,
                Password: dec.Password,
                Role: dec.Role,
                Token: data,
            };
            await dispatch({type: "UPDATE_USER", payload: upUser});
            await dispatch({type: "SET_USER", payload: upUser});

            console.log("finish update");
        }
    };
};

export const updateUserForAdmin = (user,token) => {

    console.log("user in uppp => ", user);

    return (async dispatch => {

        const {data, status} = await adminUpdateUser(user, token);

        console.log("data in uppppppp =>", data, status);
        if (status === 200) {

            console.log("dddd in users", data);
            await dispatch({ type: "INIT_USERS", payload: data });
            localForage.setItem("users", data);

            console.log("finish update");
        }
    });
}

export const deleteUser = (id, token) => {
    return async (dispatch, getState) => {
        const {data} = await removeUser(id, token);
        const users = [...getState().users].filter((u) => u.userID !== id);
        console.log("data in remove user => ", data, users);
        await dispatch({type: "DELETE_USER", payload: [...users]});
    };
};

export const registering = (user, history, setFullName, setEmail, setPassword, autoLogin) => {
    return async (dispatch, getState) => {
        try {
            const { data, status } = await registerUser(user);
            console.log(data, "in register");
            console.log(" status code in register => ", status);
            if (status === 200) {
                toast.success
                    (
                        " خوش اومدی عزیزم 😍", { position: "bottom-right", closeOnClick: true }
                    );
                const dec = decodeToken(data).payload;

                if (autoLogin) {
                    localStorage.setItem("token", String(data));
                    console.log("token added => ", localStorage.getItem("token"));
                }

                const regUser = {
                    Identity: dec.Identity,
                    FullName: dec.FullName,
                    Email: dec.Email,
                    Password: dec.Password,
                    Role: dec.Role,
                    Token: data
                };

                console.log("token added in register => ", localStorage.getItem("token"));
                await dispatch({ type: "SET_USER", payload: regUser });
                const users = getState().users;
                const newUsers = [...users, regUser];
                console.log("new users => ", newUsers);
                await dispatch({ type: "INIT_USERS", payload: newUsers });
                setFullName("");
                setEmail("");
                setPassword("");
                history.replace("/");
            }
            else if (status === 400) {
                toast.error
                    (
                        " ایمیل شما موجود است", { position: "bottom-right", closeOnClick: true }
                    );
            } else {
                toast.error
                    (
                        "مشکلی از سمت سرور رخ داده", { position: "bottom-right", closeOnClick: true }
                    );
            }
        } catch (error) {
            console.log("error in register => ", error);
            toast.error
                (
                    "مشکلی از سمت سرور رخ داده", { position: "bottom-right", closeOnClick: true }
                );
        }

    }
}