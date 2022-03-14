import styled from "styled-components";
import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { FailedSearchBar } from "../components/FailedSearch";
import { AboutMe } from "../components/AboutMe";
import { Statistics } from "../components/Statistics";
import { RecentGames } from "../components/RecentGames";
import Achievements from "../components/Achievements";
import UserPubLeaderboard from "../components/UserPubLeaderboard";
// const UserBody = styled.div`
//   display: flex;
//   align-items: stretch;
//   flex-wrap: wrap;
//   height: 100%;
//   overflow: hidden;
//   transition-duration: 1s;
//   opacity: 100%
//   transition-property: height margin opacity;
//   padding:20px;
//   gap:40px;
// `;

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
const LeftSide = ({ username, replays }) => {
  console.log("80 REPLAYS", replays);
  const [selectedOption, setSelectedOption] = React.useState("public_games");
  return (
    <LeftSideStyle>
      <StatChoice
        currentSelected={selectedOption}
        onClick={setSelectedOption}
      ></StatChoice>
      {selectedOption === "public_games" ? (
        <UserPubLeaderboard oculus_name={username} />
      ) : (
        <RecentGames replays={replays} />
      )}
    </LeftSideStyle>
  );
};
export default function User({ username, setBannerCallback, subDomain }) {
  const [randomUsernameOverride, setRandomUsernameOverride] =
    React.useState(null);
  if (
    randomUsernameOverride !== null &&
    (username === "random_async" || username === "random")
  ) {
    username = randomUsernameOverride;
  }
  if (username === "random") {
    setRandomUsernameOverride("random_async");
    username = "random_async";
    fetch("https://ecranked.ddns.net/api/v1/user/@all", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const data = await response.json();
        setRandomUsernameOverride(
          data[Math.floor(Math.random() * data.length)]
        );
      })
      .catch((error) => {
        setUserNotFound(true);
        console.error("There was an error!", error);
      });
  }

  let history = useHistory();
  const whenSearchSubmit = (text) => {
    console.log(text);
    history.push("/user/" + text + "/stats");
    //Change url without reloading: /user/{text}/stats
  };

  const EMPTYREQUEST = {
    discord_name: null,
    discord_pfp: null,
    recent_games: [],
    about_string: null,
    stats: {
      average_speed: 0,
      average_ping: 0,
      percent_stopped: 0,
      percent_upsidedown: 0,
      total_games: 0,
      total_deaths: 0,
      average_deaths: 0,
      top_loadout: [],
    },
    weekly_stats: {
      average_speed: 0,
      average_ping: 0,
      percent_stopped: 0,
      percent_upsidedown: 0,
      total_games: 0,
      total_deaths: 0,
      average_deaths: 0,
      top_speed: 0,
      percent_left: 0,
      percent_right: 0,

      top_loadout: [],
    },
    daily_stats: {
      average_speed: 0,
      average_ping: 0,
      percent_stopped: 0,
      percent_upsidedown: 0,
      total_games: 0,
      total_deaths: 0,
      average_deaths: 0,
      top_speed: 0,
      percent_left: 0,
      percent_right: 0,
      top_loadout: [],
    },
    test: {},
  };
  const [apiData, setApiData] = React.useState(EMPTYREQUEST);
  const [userNotFound, setUserNotFound] = React.useState(false);
  const FetchUserData = () => {
    fetch("https://ecranked.ddns.net/api/v1/user/" + username, {
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
          setUserNotFound(true);
        } else {
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          if ("oculus_name" in data) {
            setUserNotFound(false);
            var iconSrc = null;
            if (data.discord_name !== null) {
              iconSrc = "/images/verified_icon.png";
            }
            if (data.moderator === true) {
              iconSrc = "/images/moderator_icon.png";
            }
            if (data.oculus_name === "BiffBish") {
              iconSrc = "/images/happy_cubesat.png";
            }
            console.log(data);
            setBannerCallback(data["oculus_name"], iconSrc);
            if (username !== data["oculus_name"]) {
              history.push("/user/" + data["oculus_name"] + "/stats");
            } else {
              setApiData(data);
            }
          }
        }
      })
      .catch((error) => {
        setUserNotFound(true);
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    if (username === "random") {
      return;
    }
    if (username === "random_async") {
      return;
    }
    FetchUserData();

    // eslint-disable-next-line
  }, [username]);

  // function WhatApiRequest() {
  //   console.log("APIDATA");

  //   if (userNotFound) {
  //     return EMPTYREQUEST;
  //   }
  //   if (apiData) {
  //     return apiData;
  //   }

  //   return EMPTYREQUEST;
  // }

  console.log("userNotFound", userNotFound);
  return (
    <>
      <FailedSearchBar shown={userNotFound} onFormSubmit={whenSearchSubmit} />

      <div
        className="list padded"
        style={
          userNotFound ? { height: "0px", margin: "0px", opacity: "0%" } : {}
        }
      >
        <h3
          className="conthrax centered"
          style={{
            fontSize: "50px",
            letterSpacing: "20px",
            lineHeight: "10px",
          }}
        >
          --- FLAMINGO CHALLENGE ---
        </h3>
        <Achievements userData={apiData} />
        {/* <div> */}
        <MetaTags>
          <title>{username}'s Page!</title>
          <meta name="description" content={"Visit " + username + "'s Page!"} />
          <meta property="og:title" content="MyApp" />
          <meta property="og:image" content="path/to/image.jpg" />
        </MetaTags>
        <div className="horizontal-container">
          <LeftSide replays={apiData["recent_games"]} username={username} />
          <Statistics userData={apiData} />

          <AboutMe userData={apiData} />
        </div>
      </div>
    </>
  );
}
