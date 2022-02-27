/* eslint-disable */

import styled from "styled-components";
import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { FailedSearchBar } from "../components/FailedSearch";
import { RecentGames } from "../components/RecentGames";
import UserPubLeaderboard from "../components/UserPubLeaderboard";
import { AboutTeam } from "../components/team/AboutTeam";
import { UserTeamList } from "../components/team/UserTeamList";
import { useState } from "react";
const TeamBody = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  height: 100%;
  overflow: hidden;
  transition-duration: 1s;
  opacity: 100%
  transition-property: height margin opacity;
  padding:20px;
  gap:40px;
`;
const StatChoiceStyle = styled.div`
  padding: 0px;
  background-color: #222;
  color: white;
  float: left;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 0px 10px;
`;
const StatChoiceButton = styled.div`
  padding: 10px 10px 0px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  gap: 0px 10px;
  flex-grow: 1;
  text-align: center;
  height: 20px;
  &:hover {
    background-color: #555;
    color: #000;
  }
  cursor: pointer;
  line-height: 20px;
`;
const StatChoice = ({ currentSelected, onClick }) => {
  return (
    <StatChoiceStyle>
      <StatChoiceButton
        style={currentSelected === "replays" ? { backgroundColor: "#333" } : {}}
        onClick={() => {
          onClick("replays");
        }}
      >
        Replays
      </StatChoiceButton>
      <StatChoiceButton
        style={
          currentSelected === "public_games" ? { backgroundColor: "#333" } : {}
        }
        onClick={() => {
          onClick("public_games");
        }}
      >
        Monthly Pub Leaderboard
      </StatChoiceButton>
    </StatChoiceStyle>
  );
};
const LeftSideStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 200px 1;
`;
// const LeftSide = ({ teamname, replays }) => {
//   console.log("80 REPLAYS", replays);
//   const [selectedOption, setSelectedOption] = React.useState("public_games");
//   return (
//     <LeftSideStyle>
//       <StatChoice
//         currentSelected={selectedOption}
//         onClick={setSelectedOption}
//       ></StatChoice>
//       {selectedOption === "public_games" ? (
//         <UserPubLeaderboard oculus_name={teamname} />
//       ) : (
//         <RecentGames replays={replays} />
//       )}
//     </LeftSideStyle>
//   );
// };
const EditButtonStyle = styled.div`
  padding: 0px 10px;
  // margin: 20px 10px 20px;
  color: #aaa;
  font-size: 15px;
  cursor: pointer;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  background-color: #222;

  &:hover {
    background-color: #555;
    color: #000;
  }
`;
export default function MakeTeam({ setBannerCallback, subDomain }) {
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("OCULUS_ID") === null) {
      alert("Please log in before attempting to create a team");
      history.push("/");
      return;
    }
    fetch(
      "https://ecranked.ddns.net/api/v1/user/" +
        localStorage.getItem("OCULUS_ID"),
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        const data = await response.json();
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

  // const whenSearchSubmit = (text) => {
  //   console.log(text);
  //   history.push("/team/" + text + "/overview");
  //   //Change url without reloading: /team/{text}/stats
  // };

  // const EMPTYREQUEST = {
  //   id: 1,
  //   name: null,
  //   description: null,
  //   admin_id: null,
  //   users: [],
  //   requested_users: [],
  // };

  // const [apiData, setApiData] = React.useState(null);
  // const [teamNotFound, setTeamNotFound] = React.useState(false);
  // const FetchTeamData = () => {
  //   fetch("https://ecranked.ddns.net/api/v1/team/" + teamname, {
  //     method: "GET",
  //     headers: {
  //       Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then(async (response) => {
  //       const data = await response.json();
  //       console.log(data.name);
  //       console.log("code:" + response.statusCode);
  //       if (response.status === 404) {
  //         console.error("Team not found!");
  //         setTeamNotFound(true);
  //       } else {
  //         if (!response.ok) {
  //           // get error message from body or default to response statusText
  //           const error = (data && data.message) || response.statusText;
  //           return Promise.reject(error);
  //         }
  //         if ("name" in data) {
  //           setTeamNotFound(false);
  //           var iconSrc = null;
  //           // if (data.discord_name !== null) {
  //           //   iconSrc = "/images/verified_icon.png";
  //           // }
  //           // if (data.moderator === true) {
  //           //   iconSrc = "/images/moderator_icon.png";
  //           // }
  //           console.log(data);
  //           setBannerCallback(data["name"], iconSrc);
  //           setApiData(data);
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       setTeamNotFound(true);
  //       console.error("There was an error!", error);
  //     });
  // };

  // useEffect(() => {
  //   if (teamname === "random") {
  //     return;
  //   }
  //   if (teamname === "random_async") {
  //     return;
  //   }
  //   FetchTeamData();

  //   // eslint-disable-next-line
  // }, [teamname]);

  // function WhatApiRequest() {
  //   console.log("APIDATA");

  //   if (teamNotFound) {
  //     return EMPTYREQUEST;
  //   }
  //   if (apiData) {
  //     return apiData;
  //   }

  //   return EMPTYREQUEST;
  // }
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

    // if (descriptionText.length == 0) {
    //   alert("The title cannot be shorter then 1000 characters");
    //   return;
    // }

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
      <MakeTeamBoxStyle>
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
        <EditButtonStyle onClick={onClickSubmit}>Create Team!</EditButtonStyle>
      </MakeTeamBoxStyle>
      <MetaTags>
        <title>Create a team!</title>
        {/* <meta name="description" content={"Visit " + teamname + "'s Page!"} />
          <meta property="og:title" content="MyApp" />
          <meta property="og:image" content="path/to/image.jpg" /> */}
      </MetaTags>
      {/* </TeamBody> */}
    </>
  );
}
const MakeTeamBoxStyle = styled.div`
  margin: 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 200px 1;
`;
