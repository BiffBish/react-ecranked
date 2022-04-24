// import { useContext, useEffect } from "react";
// import GlobalUserState from "../../contexts/GlobalUserState";
// var authToken = null;
// export const ApiCallHelper = () => {
//   const [globalUserState] = useContext(GlobalUserState);
//   useEffect(() => {
//     authToken = globalUserState.authorization_token;
//   }, [globalUserState.authorization_token]);
//   return null;
// };
import store from "../../stores/store";

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

type ApiResponse = {
  status: number;
  json: Object;
  ok: boolean;
};
const URI =
  process.env.NODE_ENV === "production"
    ? "https://ecranked.ddns.net/api/"
    : "https://localhost/api/";

export default function makeApiCall(
  url = "",
  method = "GET",
  body = {},
  formData = null
): Promise<ApiResponse> {
  const state = store.getState();
  var promise = new Promise<ApiResponse>((resolve, reject) => {
    let bodyData;

    if (!(method === "HEAD" || method === "GET")) {
      bodyData = JSON.stringify(body);
    }

    if (formData) {
      bodyData = formData;
    }

    fetch(URI + url, {
      method: method,
      headers: {
        Authorization: state?.user?.token ?? "",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: bodyData,
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(response);
        var returnData = {
          status: response.status,
          json: data,
          ok: response.ok,
        } as ApiResponse;
        resolve(returnData);
      })
      .catch((error) => {
        // alert(
        //   "There was an error. Please contact a moderator immediately. #MakeApiCall36"
        // );
        console.error("There was an error!", error);
        reject(error);
        return;
      });
  });

  return promise;
}
