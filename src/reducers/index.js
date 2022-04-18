import { combineReducers } from "redux";
// import * as actionTypes from "../actions/types";

import userReducer from "./user";

const rootReducer = combineReducers({
  user: userReducer,
});
export default rootReducer;
