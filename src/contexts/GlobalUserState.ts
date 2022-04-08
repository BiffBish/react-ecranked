import React from "react";

//typescript context that allows setting a state for the whole app that has a string
export interface GlobalUserStateInterface {
  oculus_id?: string;
  moderator?: boolean;
  authorization_token?: string;
}

const GlobalUserState = React.createContext<{
  globalUserState: GlobalUserStateInterface;
  setGlobalUserState: React.Dispatch<React.SetStateAction<GlobalUserStateInterface>>;
}>({
  globalUserState: {},
  setGlobalUserState: () => {},
});
export default GlobalUserState;
