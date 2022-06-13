import api from "@ecranked/api";

api.endpoint =
  process.env.NODE_ENV === "production"
    ? "https://ecranked.ddns.net/api/"
    : "http://localhost:8080/api/";

// api.endpoint = "https://ecranked.ddns.net/api/";
export default api;
// api;
// export const api = new Api(
//   process.env.NODE_ENV === "production"
//     ? "https://ecranked.ddns.net/api/"
//     : "http://localhost:8080/api/"
// );
