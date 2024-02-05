import { combineReducers } from "redux";
import authReducer from "./slices/auth";
import userReducer from "./slices/users";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});
