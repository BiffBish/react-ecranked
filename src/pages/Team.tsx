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
import { useTeam } from "@ecranked/api"
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

interface TeamProps {
  teamname: string;
  setBannerCallback: (username: string, iconSRC: string) => void

}

export default function Team({ teamname, setBannerCallback }: TeamProps) {
  // teamname = "";
  let history = useHistory();



  const [teamNotFound, setTeamNotFound] = React.useState(false);

  const { team } = useTeam(teamname);

  useEffect(() => {
    if (team) {
      setBannerCallback(team["name"], "");

    }
  }
    , [team]);

  useEffect(() => {
    if (teamname === "random") {
      return;
    }
    if (teamname === "random_async") {
      return;
    }

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
      <FailedSearchBar shown={teamNotFound} />
      <TeamBody
        style={
          teamNotFound ? { height: "0px", margin: "0px", opacity: "0%" } : {}
        }
      >
        {/* <MetaTags> */}
        {/* <title>{teamname}'s Page!</title> */}
        {/* <meta name="description" content={"Visit " + teamname + "'s Page!"} /> */}
        {/* <meta property="og:title" content="MyApp" /> */}
        {/* <meta property="og:image" content="path/to/image.jpg" /> */}
        {/* </MetaTags> */}
        <AboutTeam team={team} />
        <UserTeamList teamData={team} />
      </TeamBody>
    </>
  );
}
