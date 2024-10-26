import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import sidebarReducer from "./sidebarSlice";
import filterReducer from "./filterSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    sidebar: sidebarReducer,
    filter: filterReducer,
  },
});

export default store;
