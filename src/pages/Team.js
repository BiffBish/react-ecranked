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
  border: 1px solid white;
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
export default function Team({ name: teamname, setBannerCallback, subDomain }) {
  // const [randomTeamnameOverride, setRandomTeamnameOverride] =
  //   React.useState(null);
  // if (
  //   randomTeamnameOverride !== null &&
  //   (teamname === "random_async" || teamname === "random")
  // ) {
  //   teamname = randomTeamnameOverride;
  // }
  // if (teamname === "random") {
  //   setRandomTeamnameOverride("random_async");
  //   teamname = "random_async";
  //   fetch("https://ecranked.ddns.net/api/v1/team/@all", {
  //     method: "GET",
  //     headers: {
  //       Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then(async (response) => {
  //       const data = await response.json();
  //       setRandomTeamnameOverride(
  //         data[Math.floor(Math.random() * data.length)]
  //       );
  //     })
  //     .catch((error) => {
  //       setTeamNotFound(true);
  //       console.error("There was an error!", error);
  //     });
  // }

  let history = useHistory();
  const whenSearchSubmit = (text) => {
    console.log(text);
    history.push("/team/" + text + "/overview");
    //Change url without reloading: /team/{text}/stats
  };

  const EMPTYREQUEST = {
    id: 1,
    name: null,
    description: null,
    admin_id: null,
    users: [],
    requested_users: [],
  };

  const [apiData, setApiData] = React.useState(null);
  const [teamNotFound, setTeamNotFound] = React.useState(false);
  const FetchTeamData = () => {
    fetch("https://ecranked.ddns.net/api/v1/team/" + teamname, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(data.name);
        console.log("code:" + response.statusCode);
        if (response.status === 404) {
          console.error("Team not found!");
          setTeamNotFound(true);
        } else {
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          if ("name" in data) {
            setTeamNotFound(false);
            var iconSrc = null;
            // if (data.discord_name !== null) {
            //   iconSrc = "/images/verified_icon.png";
            // }
            // if (data.moderator === true) {
            //   iconSrc = "/images/moderator_icon.png";
            // }
            console.log(data);
            setBannerCallback(data["name"], iconSrc);
            setApiData(data);
          }
        }
      })
      .catch((error) => {
        setTeamNotFound(true);
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    if (teamname === "random") {
      return;
    }
    if (teamname === "random_async") {
      return;
    }
    FetchTeamData();

    // eslint-disable-next-line
  }, [teamname]);

  function WhatApiRequest() {
    console.log("APIDATA");

    if (teamNotFound) {
      return EMPTYREQUEST;
    }
    if (apiData) {
      return apiData;
    }

    return EMPTYREQUEST;
  }

  console.log("teamNotFound", teamNotFound);
  return (
    <>
      <FailedSearchBar shown={teamNotFound} onFormSubmit={whenSearchSubmit} />
      <TeamBody
        style={
          teamNotFound ? { height: "0px", margin: "0px", opacity: "0%" } : {}
        }
      >
        {/* <div> */}
        <MetaTags>
          <title>{teamname}'s Page!</title>
          <meta name="description" content={"Visit " + teamname + "'s Page!"} />
          <meta property="og:title" content="MyApp" />
          <meta property="og:image" content="path/to/image.jpg" />
        </MetaTags>
        {/* <LeftSide
          replays={WhatApiRequest()["recent_games"]}
          username={teamname}
        /> */}
        {/* <Statistics teamData={WhatApiRequest()} /> */}
        <AboutTeam teamData={WhatApiRequest()} />
        <UserTeamList userList={WhatApiRequest().users} />
        {/* </div> */}
      </TeamBody>
    </>
  );
}
