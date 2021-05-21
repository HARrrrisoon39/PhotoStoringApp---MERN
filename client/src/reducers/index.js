import { combineReducers } from "redux";
import apiReducers from "./posts";
import authReducers from "./auth"

export default combineReducers({
  posts:apiReducers,
  auths:authReducers
});
