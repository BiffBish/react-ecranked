import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type bannerState = {
  text: string;
  height: number;
  icon?: {
    src: string;
  };
  //   moderator: boolean;
  //   isLoading: boolean;
  //   authorization_token: string;
};

const initialState: bannerState = {
  text: "ECRanked",
  height: 200,
};

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setIconSrc: (state, action: PayloadAction<string>) => {
      state.icon = {
        src: action.payload,
      };
    },
  },
});

export const { setHeight, setText, setIconSrc } = bannerSlice.actions;

export default bannerSlice.reducer;
