/* eslint-disable */

import styled from "styled-components";
import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";
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
export default function Team({ teamname, setBannerCallback, subDomain }) {
  // teamname = "";
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

  const [apiData, setApiData] = React.useState(EMPTYREQUEST);
  const [teamNotFound, setTeamNotFound] = React.useState(false);

  const FetchTeamData = () => {
    makeApiCall("v1/team/" + teamname)
      .then(async (response) => {
        const data = response.json;
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

  // const [nameStyle, setNameStyle] = React.useState({
  //   backgroundColor: "#222",
  //   boarder: "10px solid rgb(255,255,255)",
  //   opacity: "100%",
  // });

  // useEffect(() => {
  //   if (teamname == "Furry Fury") {
  //     setNameStyle({
  //       backgroundColor: "grey",
  //       border: "5px solid rgb(0,255,255)",
  //       opacity: "100%",
  //     });
  //   }
  // }, [teamname]);

  return (
    <>
      {/* <div className="padded">
        <div className="padded rounded" style={nameStyle}>
          <h1>{apiData.name}</h1>
        </div>
      </div> */}
      <div style={{ color: "white", fontSize: "15px" }}>
        This page is in early beta. There may be issues and the layout might
        change. you cannot kick users yet so be careful who you accept
      </div>
      <FailedSearchBar shown={teamNotFound} onFormSubmit={whenSearchSubmit} />
      <TeamBody
        style={
          teamNotFound ? { height: "0px", margin: "0px", opacity: "0%" } : {}
        }
      >
        {/* <MetaTags>
          <title>{teamname}'s Page!</title>
          <meta name="description" content={"Visit " + teamname + "'s Page!"} />
          <meta property="og:title" content="MyApp" />
          <meta property="og:image" content="path/to/image.jpg" />
        </MetaTags> */}
        <AboutTeam teamData={apiData} />
        <UserTeamList teamData={apiData} />
      </TeamBody>
    </>
  );
}
