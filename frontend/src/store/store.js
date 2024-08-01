import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/userSlice";
import allUsersReducer from "../store/allUsersSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUsersReducer,
  },
});

export default store;
