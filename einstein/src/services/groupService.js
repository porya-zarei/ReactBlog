import http from "./httpService";
import config from "./config.json";

export const newGroup = (group,token) => {
    return http.post(`${config.groups}`, group, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export const getGroups = () => {
    return http.get(`${config.groups}`);
}

export const deleteGroup = (id,token) => {
    return http.delete(`${config.groups}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export const updateGroup = (id, group,token) => {
    return http.put(`${config.groups}/${id}`, group, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}