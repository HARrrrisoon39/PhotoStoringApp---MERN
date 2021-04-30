import { combineReducers } from "redux";
import apiReducers from "./posts";

export default combineReducers({
  posts:apiReducers,
});
