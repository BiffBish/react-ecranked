import { useEffect, useRef } from "react";
import { makeApiCall } from "../../helpers/api";

export function DiscordOAuthCallback({ callbackCode, onFinish }) {
  const hasFetchedData = useRef(false);
  const getAuthToken = () => {
    if (!hasFetchedData.current) {
      hasFetchedData.current = true;
      console.log("Callback");
      console.log(callbackCode);

      makeApiCall("v2/auth/login", "POST", {
        access_token: callbackCode,
      }).then(({ token }) => {
        if (token === undefined) {
          alert(
            "Your discord has not been linked yet to ECRanked. Join the discord server from the navigation bar and contact a moderator to link your account."
          );
          return;
        }
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
