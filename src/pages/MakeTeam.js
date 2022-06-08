/* eslint-disable */

import styled from "styled-components";
import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useState } from "react";

const MakeTeamBoxStyle = styled.div`
  margin: 100px;
  flex: 200px 1;
`;

export default function MakeTeam() {
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("OCULUS_ID") === null) {
      alert("Please log in before attempting to create a team");
      // history.push("/");
      return;
    }
    makeApiCall("v1/user/" + localStorage.getItem("OCULUS_ID"))
      .then(async (response) => {
        const data = response.json;
        console.log("code:" + response.statusCode);
        if (response.status === 404) {
          console.error("User not found!");
          alert(
            "There was an error. Please contact a moderator immediately. #EPMT134"
          );
          history.push("/");
          return;
        } else {
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          if (data.team_id !== null) {
            alert(
              "You are already part of a team. You cannot create a new team without leaving your current one"
            );
            history.push("/");
            return;
          }
          if (data.requested_team_id !== null) {
            alert(
              "You are already requesting to join a team. You cannot create a new team without canceling your request"
            );
            history.push("/");
            return;
          }
        }
      })
      .catch((error) => {
        alert(
          "There was an error. Please contact a moderator immediately. #EPMT167"
        );
        console.error("There was an error!", error);
        return;
      });
  }, []);

  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");

  const onClickSubmit = () => {
    if (titleText.length > 25) {
      alert("The title cannot be longer then 25 characters");
      return;
    }

    if (titleText.length < 3) {
      alert("The title cannot be shorter then 3 characters");
      return;
    }

    if (descriptionText.length > 1000) {
      alert("The title cannot be longer then 1000 characters");
      return;
    }

    const authToken = localStorage.getItem("AUTHORIZATION_TOKEN");

    const requestOptions = {
      method: "POST",
      headers: { Authorization: authToken, "Content-Type": "application/json" },
      body: JSON.stringify({ name: titleText, description: descriptionText }),
    };

    fetch("https://ecranked.ddns.net/api/v1/team/new", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        history.push("/team/" + titleText + "/overview");
        window.location.reload(false);
      });
  };
  // console.log("teamNotFound", teamNotFound);
  return (
    <>
      {" "}
      <p style={{ color: "white", fontSize: "15px" }}>
        {" "}
        This page is in early beta. There may be issues and the layout might
        change. Currently your not able to change your teams name or description
        after creation.
      </p>
      {/* <TeamBody style={{ height: "0px", margin: "0px", opacity: "0%" }}> */}
      <MakeTeamBoxStyle className="padded list">
        <p style={{ color: "white" }}>Team name: (5-20 characters)</p>
        <textarea
          style={{
            backgroundColor: "transparent",
            // border: "none",
            outline: "none",
            color: "#fff",
            fontSize: "18px",
            padding: "8px",
            fontFamily: "Montserrat",
            // flexGrow: 1,
            minWidth: "120px",
            // f: "Montserrat", sans-serif,
          }}
          type="textarea"
          name="userName"
          value={titleText}
          onChange={(e) => setTitleText(e.target.value)}
        />
        <p style={{ color: "white" }}>Team Description:</p>

        <textarea
          style={{
            backgroundColor: "transparent",
            // border: "none",
            outline: "none",
            color: "#fff",
            fontSize: "18px",
            padding: "8px",
            fontFamily: "Montserrat",
            // flexGrow: 1,
            minWidth: "120px",
            // f: "Montserrat", sans-serif,
          }}
          type="textarea"
          name="userName"
          value={descriptionText}
          onChange={(e) => setDescriptionText(e.target.value)}
          // onBlur={updateIsEdit}
        />
        <div className="rounded button" onClick={onClickSubmit}>
          Create Team!
        </div>
      </MakeTeamBoxStyle>
      {/* <MetaTags>
        <title>Create a team!</title>
        {/* <meta name="description" content={"Visit " + teamname + "'s Page!"} />
          <meta property="og:title" content="MyApp" />
          <meta property="og:image" content="path/to/image.jpg" /> * / }
      </MetaTags> */}
      {/* </TeamBody> */}
    </>
  );
}
