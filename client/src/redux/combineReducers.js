import { combineReducers } from "redux";
import authReducer from "./slices/auth";
import userReducer from "./slices/users";
import contactReducer from "./slices/contact";
import emailReducer from "./slices/email";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  contact: contactReducer,
  email: emailReducer,
});
