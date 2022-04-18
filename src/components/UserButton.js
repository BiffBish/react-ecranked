import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { makeApiCall } from "../helpers/api/index";

export default function UserButton({ username, oculus_id, className }) {
  const [verifiedName, setVerifiedName] = useState(null);

  useEffect(() => {
    if (!username && !oculus_id) return;
    makeApiCall("v1/user" + oculus_id)
      .then(async (response) => {
        const data = response.json;
        console.log("code:" + response.statusCode);
        if (response.status === 404) {
          console.error("User not found!");
          setVerifiedName("[Error]");
        } else {
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          if ("oculus_name" in data) {
            setVerifiedName(data["oculus_name"]);
          }
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setVerifiedName("[Error]");
      });
  }, [username, oculus_id]);

  let shownName = "Loading...";
  if (username) {
    shownName = username;
  }
  if (verifiedName) {
    shownName = verifiedName;
  }
  return (
    <NavLink className={"rounded button"} to={"/user/" + shownName + "/stats"}>
      {shownName}
    </NavLink>
  );
}
