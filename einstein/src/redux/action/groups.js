import { toast } from "react-toastify";
import { getGroups, newGroup } from "../../services/groupService";



export const getAllGroups = () => {

    return (async dispatch => {
        const {data} = await getGroups();
        
        console.log("data in groups", data);
        await dispatch({ type: "INIT_GROUPS", payload: data });

    });

}


export const createNewGroup = (group) => {
    console.log(group, "in createNewPost");


    try {
       
        return (dispatch, getState) => {

            newGroup(group);
            toast.success("گروه با موفقیت ساخته شد", { position: "top-right", closeButton: false });
            dispatch({
                type: "ADD_GROUP",
                payload: [...getState().groups, group]
            });
        }
    }
    catch (ex) {
        console.log(ex, "error in createnewgroup");
    }
}