import {combineReducers} from "redux";
import {postsReducer} from "./posts";
import {postReducer} from "./post";
import {userReducer} from "./user";
import {usersReducer} from "./users";
import {groupsReducer} from "./groups";
import {commentsReducer} from "./comments";

export const reducers = combineReducers({
    posts: postsReducer,
    post: postReducer,
    user: userReducer,
    users: usersReducer,
    groups: groupsReducer,
    comments: commentsReducer,
});
