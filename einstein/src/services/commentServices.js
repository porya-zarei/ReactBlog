import http from "./httpService";
import config from "./config.json";

export const addComment = (comment) => {
    console.log("comment in add => ",comment);
    return (http.post(`${config.comments}`,comment));
}

export const getComments = (postId) => {
    return (http.get(`${config.comments}/${postId}`));
}