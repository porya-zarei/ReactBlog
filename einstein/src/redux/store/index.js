import { createStore, compose, applyMiddleware } from "redux";
import { reducers } from "../reducer";
import thunk from "redux-thunk";
import { getAllPosts } from "../action/posts";
import { getAllGroups } from "../action/groups";

// import {loadingBarMiddleware} from "reacr-redux-loading-bar";

// const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(reducers, compose(applyMiddleware(thunk)));

//in
store.dispatch(getAllGroups());
store.dispatch(getAllPosts());

//SUB 
console.log("in store =>>>>>>>>");
// store.subscribe(() => { console.log(store.getState()) });
