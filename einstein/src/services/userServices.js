import http from "./httpService";
import config from "./config.json";

export const registerUser = (user) => {
    return http.post(`${config.register}`, user);
};

export const loginUser = (user) => {
    return http.post(`${config.login}`, user);
};

export const getUsers = (token) => {
    return http.get(`${config.api}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getUser = (userId, token) => {
    return http.get(`${config.api}/users`,String(userId), {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateUser = (user, token) => {
    console.log("update user in service =>", user);
    return http.put(`${config.api}/users/update`, user, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const adminUpdateUser = (user,token) => {
    console.log("update user in service by admin =>", user);
    return http.put(`${config.api}/users/updatebyadmin`, user,{
        headers: {
            Authorization: `Bearer ${token}`,
        }});
};

export const removeUser = (userId,token) => {
    return http.delete(`${config.api}/users/${String(userId)}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        }});
};
