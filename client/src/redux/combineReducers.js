import { combineReducers } from "redux";
import authReducer from "./slices/auth";

export const rootReducer = combineReducers({
  auth: authReducer,
});
