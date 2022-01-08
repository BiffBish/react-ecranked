import styled from "styled-components";
import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { FailedSearchBar } from "../components/FailedSearch";
import { AboutMe } from "../components/AboutMe";
import { Statistics } from "../components/Statistics";
import { RecentGames } from "../components/RecentGames";

const UserBody = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  height: 100%;
  overflow: hidden;
  transition-duration: 1s;
  opacity: 100%
  transition-property: height margin opacity;
`;

export default function User({ username, setBannerCallback, subDomain }) {
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
  const [apiData, setApiData] = React.useState(null);
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
            console.log(data);
            setBannerCallback(data["oculus_name"], iconSrc);
            setApiData(data);
          }
        }
      })
      .catch((error) => {
        setUserNotFound(true);
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    FetchUserData();
    // eslint-disable-next-line
  }, [username]);

  function WhatApiRequest() {
    console.log("APIDATA");

    if (userNotFound) {
      return EMPTYREQUEST;
    }
    if (apiData) {
      return apiData;
    }

    return EMPTYREQUEST;
  }

  console.log("userNotFound", userNotFound);
  return (
    <>
      <FailedSearchBar shown={userNotFound} onFormSubmit={whenSearchSubmit} />
      <UserBody
        style={
          userNotFound ? { height: "0px", margin: "0px", opacity: "0%" } : {}
        }
      >
        <MetaTags>
          <title>{username}'s Page!</title>
          <meta name="description" content={"Visit " + username + "'s Page!"} />
          <meta property="og:title" content="MyApp" />
          <meta property="og:image" content="path/to/image.jpg" />
        </MetaTags>
        <RecentGames replays={WhatApiRequest()["recent_games"]} />
        <Statistics userData={WhatApiRequest()} />
        <AboutMe userData={WhatApiRequest()} />
      </UserBody>
    </>
  );
}
