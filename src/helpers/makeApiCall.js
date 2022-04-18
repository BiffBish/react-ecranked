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

/**
 *
 * @example
 * makeApiCall("v1/user/" + oculus_id , "PUT", {
      description: "Value",
    }).then((response) => {
      console.log(response.json);
    });
 * @param {String} url The url of the api call. Including the version number.
 * @param {String} method The method of the api call. GET, POST, PUT, DELETE
 * @param {Object} body The body of the api call.
 * @param {FormData} formData The form data of the api call.
 * @returns {Promise} A promise that resolves to the response of the api call.
 * @description Makes an api call to the specified url.
 
 */
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
        Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
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
