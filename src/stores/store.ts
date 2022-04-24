import { configureStore } from "@reduxjs/toolkit";
import bannerReducer, { bannerState } from "./banner";
import userReducer, { userState } from "./user";

export type State = {
  user: userState;
  banner: bannerState;
};

export default configureStore({
  reducer: {
    user: userReducer,
    banner: bannerReducer,
  },
});
