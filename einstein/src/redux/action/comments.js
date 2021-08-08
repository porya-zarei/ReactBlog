import {toast} from "react-toastify";
import {addComment, getComments} from "../../services/commentServices";

export const getPostComments = (postId) => {
    return async (dispatch) => {
        const {data} = await getComments(postId);

        console.log("dddd in Comments", data);
        await dispatch({type: "INIT_COMMENTS", payload: data});
    };
};

export const createNewComment = (comment) => {
    console.log(comment, "in createNewComments");
    let data, status;
    addComment(comment)
        .then((r) => r)
        .then((res) => {
            data = res.data;
            status = res.status;
        });
    try {
        console.log("in try");
        return async (dispatch, getState) => {
            // const comments = [...getState().comments];

            if (status === 201) {
                console.log("comments add =>");
                toast.success("کامنت با موفقیت افزوده شد", {
                    position: "top-right",
                    closeButton: false,
                });
                dispatch({
                    type: "ADD_COMMENT",
                    payload: [...getState().comments, comment],
                });
            }
        };
    } catch (ex) {
        console.log(ex, "error in createnewcomments");
    }
};
