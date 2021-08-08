import http from "./httpService";
import config from "./config.json";

export const getPosts = () => {
    return http.get(`${config.api}/Posts`);
};
export const getPost = (postId) => {
    console.log("post id in service => ", postId);
    return http.get(`${config.api}/Posts/${postId}`);
};
export const newPost = (data, token) => {
    return http.post(`${config.api}/Posts`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deletePost = (postId, token) => {
    return http.delete(`${config.api}/Posts/${postId}`, {
        headers: {Authorization: `Bearer ${token}`},
    });
};

export const updatePost = async (postId, data, token) => {
    return http.put(`${config.api}/Posts/${postId}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const contactMe = (data) => {
    return http.post(`${config.contactme}`, data);
};

export const uploadingImage = async (data) => {
    return await http.post(`${config.uploadImage}`, data, {
        headers: {
            accept: "multipart/form-data",
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateForVisit = async (ID) => {
    return await http.put(`${config.api}/Posts/Visit?PostIDVisit=${ID}`);
};

export const updateForLike = async (ID) => {
    return await http.put(`${config.api}/Posts/Like?PostIDLike=${ID}`);
};
