import { useEffect, useRef } from "react";

export function DiscordOAuthCallback({ callbackCode, onFinish }) {
  const hasFetchedData = useRef(false);
  const getAuthToken = () => {
    if (!hasFetchedData.current) {
      hasFetchedData.current = true;
      console.log("Callback");
      console.log(callbackCode);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_token: callbackCode,
        }),
      };
      fetch("https://ecranked.ddns.net/api/v2/auth/login", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data["token"] === undefined) {
            alert(
              "Your discord has not been linked yet to ECRanked. Join the discord server from the navigation bar and contact a moderator to link your account."
            );
            return;
          }
          console.log(data);

          localStorage.setItem("AUTHORIZATION_TOKEN", data["token"]);
          localStorage.setItem("OCULUS_ID", data["oculus_id"]);
          // eslint-disable-next-line
          if (data["moderator"] == 1) {
            localStorage.setItem("MODERATOR", data["moderator"]);
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
