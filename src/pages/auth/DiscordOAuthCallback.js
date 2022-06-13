import { useEffect, useRef } from "react";
import api from "../../api";

export function DiscordOAuthCallback({ callbackCode, onFinish }) {
  const hasFetchedData = useRef(false);
  const getAuthToken = () => {
    if (!hasFetchedData.current) {
      hasFetchedData.current = true;
      console.log("Callback");
      console.log(callbackCode);
      api
        .login(callbackCode)
        .then(() => {
          onFinish();
        })
        .catch(() => {
          alert(
            "Your discord has not been linked yet to ECRanked. Join the discord server from the navigation bar and contact a moderator to link your account."
          );
          onFinish();
        });
    }
  };
  useEffect(() => {
    getAuthToken();
    // eslint-disable-next-line
  }, []);

  return null;
}
