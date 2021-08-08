import { getPosts, updatePost, deletePost, newPost } from "../../services/postService"
import { toast } from "react-toastify";
import localForage from "localforage";

export const getAllPosts = () => {
    return (async (dispatch, getState) => {
        try {
            const { data } = await getPosts();
            console.log("dddd in posts", data);
            await dispatch({ type: "INIT_POSTS", payload: data });
            localForage.setItem("posts", data);
            return data;
        } catch (error) {
            console.log("dddd in posts", error);
            if (getState().posts !== null) {
                await dispatch({ type: "INIT_POSTS", payload: getState().posts });
            } else {
                await dispatch({ type: "INIT_POSTS", payload: await localForage.getItem("posts") });
            }
            return error;
        }
    });
}

// export const createNewPost = (post) => {

//     console.log("in createNewPost data => ", post);


//     return (dispatch, getState) => {

//         try {
//             newPost(post).then(res => res).then(res => {

//                 const { status, data } = res;
//                 console.log("status in create new post => ", status, data);

//                 if (status === 201) {
//                     console.log("status in create new post => ", status, data);
//                     toast.success("پست با موفقیت ساخته شد", { position: "top-right", closeButton: false });
//                     dispatch({
//                         type: "ADD_POST",
//                         payload: [...getState().posts, data]
//                     });
//                 };
//                 localForage.setItem("posts", getState().posts);
//             });


//         } catch (ex) {
//             console.log(ex, "error in createnewpost");
//         }
//     }

// }

export const createNewPost = (post,token) => {

    console.log("in createNewPost data => ", post);


    return async (dispatch, getState) => {

        try {
            const { data, status } = await newPost(post,token)

            console.log("status in create new post => ", status, data);

            if (status === 201) {
                console.log("status in create new post => ", status, data);
                toast.success("پست با موفقیت ساخته شد", { position: "top-right", closeButton: false });
                dispatch({
                    type: "ADD_POST",
                    payload: [...getState().posts, data]
                });
                localForage.setItem("posts", getState().posts);
            } else {
                dispatch({
                    type: "ADD_POST",
                    payload: [...getState().posts]
                });
                localForage.setItem("posts", getState().posts);
            }

        } catch (ex) {
            console.log(ex, "error in createnewpost");
            dispatch({
                type: "ADD_POST",
                payload: [...getState().posts]
            });
            localForage.setItem("posts", getState().posts);
        }
    }

}


export const handlePostUpdate = async (postId, updatedPost,token) => {

    return async (dispatch, getState) => {

        console.log("start update", postId, updatedPost);

        const posts = [...getState().posts];

        const filteredPosts = posts.filter(post => post.PostID !== Number(postId));

        console.log("ffffff=>", filteredPosts);

        try {

            const { data, status } = await updatePost(postId, updatedPost,token)

            console.log("data in update =>", data);
            console.log("filtered posts in update =>", filteredPosts);

            if (status === 200) {
                await dispatch({
                    type: "UPDATE_POST",
                    payload: [...filteredPosts, updatedPost]
                });
                await dispatch({
                    type: "GET_POST",
                    payload: { ...updatedPost }
                });
                localForage.setItem("posts", [...filteredPosts, updatedPost]);
                toast.success("دوره با موفقیت ویرایش شد.", { position: "top-right" });
            }
        } catch (ex) {
            console.log("error in update => ", ex);
            dispatch({ type: "UPDATE_POST", payload: [...posts] });
            localForage.setItem("posts", getState().posts);
        }
    };
};

export const handlePostDelete = (postId,token) => {
    return async (dispatch, getState) => {
        const posts = [...getState().posts];
        const filteredPosts = posts.filter(
            (post) => post.postID !== postId
        );

        try {
            const { status } = await deletePost(postId,token);

            if (status === 200) {
                await dispatch({
                    type: "DELETE_POST",
                    payload: [...filteredPosts],
                });
                localForage.setItem("posts", filteredPosts);
                toast.success("پست با موفقیت پاک شد.", { position: "top-right" });
            }
        } catch (ex) {
            await dispatch({ type: "DELETE_POST", payload: [...posts] });
        }
    };
};