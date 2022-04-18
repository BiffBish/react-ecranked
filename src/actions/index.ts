import * as actionTypes from "./types";

export const setUser = (user: any) => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user,
    },
  };
};
