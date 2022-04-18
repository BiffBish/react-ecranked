import { SET_USER } from "../actions/types";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        oculus_id: action.payload.oculus_id,
        oculus_name: action.payload.oculus_name,
        moderator: action.payload.moderator,
        // currentUser: action.payload.currentUser,
        isLoading: false,
      };
    default:
      return state;
  }
};
export default userReducer;
