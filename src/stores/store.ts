import { configureStore } from "@reduxjs/toolkit";
import bannerReducer, { bannerState } from "./banner";

export type State = {
  banner: bannerState;
};

export default configureStore({
  reducer: {
    banner: bannerReducer,
  },
});
