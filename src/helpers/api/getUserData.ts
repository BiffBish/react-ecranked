import makeApiCall from "./makeApiCall";

export default async function getUserData(oculus_id: string) {
  let response = (await makeApiCall("v1/user/" + oculus_id, "GET")) as any;
  return response.json;
}
