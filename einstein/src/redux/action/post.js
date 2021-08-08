import { getPost } from "../../services/postService";
import localForage from "localforage";

export const getSinglePost = (postId) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await getPost(postId);
            console.log("data in => ", data);
            await dispatch({ type: "GET_POST", payload: data });
            return data;
        } catch (err) {
            console.log("error in disp => ", err);
            if (getState().posts !== null) {
                let post = await getState().posts.find(p => Number(p.PostID) === Number(postId));
                console.log("post when post not found", getState().posts, post);
                await dispatch({ type: "GET_POST", payload: post });
            }
            if (localForage.getItem("posts")) {
                let savedPosts = await localForage.getItem("posts");
                var post = savedPosts.find(p => Number(p.PostID) === Number(postId));
                await dispatch({ type: "INIT_POSTS", payload: savedPosts });
                await dispatch({ type: "GET_POST", payload: post });
            }
            await dispatch({ type: "GET_POST", payload: getState().post });
            return err;
        }

    }
}