import { useContext, useEffect } from "react";
import GlobalUserState from "../contexts/GlobalUserState";

var authToken = null;
export const ApiCallHelper = () => {
  const [globalUserState] = useContext(GlobalUserState);
  useEffect(() => {
    authToken = globalUserState.authorization_token;
  }, [globalUserState.authorization_token]);
  return null;
};

export default function makeApiCall(
  url,
  method = "GET",
  body = {},
  formData = null
) {
  var promise = new Promise((resolve, reject) => {
    let requestOptions = {
      method: method,
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    };

    if (!(method === "HEAD" || method === "GET")) {
      requestOptions.body = JSON.stringify(body);
    }

    if (formData) {
      requestOptions.body = formData;
    }
    fetch("https://ecranked.ddns.net/api/" + url, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        console.log(response);
        var returnData = {
          status: response.status,
          json: data,
          ok: response.ok,
        };
        resolve(returnData);
      })
      .catch((error) => {
        alert(
          "There was an error. Please contact a moderator immediately. #MakeApiCall36"
        );
        console.error("There was an error!", error);
        reject(error);
        return;
      });
  });

  return promise;
}
