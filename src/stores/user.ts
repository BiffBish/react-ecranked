import { createSlice } from "@reduxjs/toolkit";

export type userState = {
  token: string | null;
  isLoading: boolean;
} & (
  | {
      oculus_id: null;
      oculus_name: null;
      moderator: null;
    }
  | {
      oculus_id: string;
      oculus_name: string;
      moderator: boolean;
    }
) & {
    userData: Api.User | null;
  };

const initialState: userState = {
  oculus_id: null,
  oculus_name: null,
  moderator: null,
  isLoading: false,
  token: null,
  userData: null,
};

type setUserProps = {
  oculus_id: string;
  oculus_name: string;
  moderator: boolean;
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: userState, action: { payload: setUserProps }) => {
      state.oculus_id = action.payload.oculus_id;
      state.oculus_name = action.payload.oculus_name;
      state.moderator = action.payload.moderator;
      state.isLoading = false;
    },
    setToken: (state: userState, action: { payload: string }) => {
      state.token = action.payload;
      state.isLoading = true;
    },
    setUserData: (state: userState, action: { payload: Api.User }) => {
      state.userData = action.payload;
    },
  },
});

export const { setUser, setToken, setUserData } = userSlice.actions;

export default userSlice.reducer;
