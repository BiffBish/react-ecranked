import React, { useEffect, useState } from "react";

export default function UserButton({ username, oculus_id, className }) {
  const [verifiedName, setVerifiedName] = useState(null);

  useEffect(() => {
    if (username === undefined && oculus_id !== undefined) {
      fetch("https://ecranked.ddns.net/api/v1/user/" + oculus_id, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const data = await response.json();
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
    }
  }, [username, oculus_id]);

  let shownName = "Loading...";
  if (username) {
    shownName = username;
  }
  if (verifiedName) {
    shownName = verifiedName;
  }
  return (
    <div className={"rounded button"} to={"/user/" + shownName + "/stats"}>
      {shownName}
    </div>
  );
}
