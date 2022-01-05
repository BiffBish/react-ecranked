import styled, { keyframes } from "styled-components";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useHistory } from "react-router-dom";
// import AutoComplete from "../components/AutoComplete";
// import moment from "moment-timezone";

const LeaderboardListFadeIN = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;
const LeaderboardListStyle = styled.div`
  display: flex;
  align-items: center;
  background-color: #333;
  padding: 10px;
  margin: 10px 0px;
  text-decoration: none;
  border: 1px solid white;
  border-radius: 10px;
  line-height: 0;
  font-size: 15px;
  line-height: 1.5;
  &:hover {
    background-color: #555;
    color: #000;
  }
  cursor: pointer;
  animation: ${LeaderboardListFadeIN} 0.2s;
`;
const LeaderboardListsStyle = styled.div`
  padding: 10px 10px 0px;
  // margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid white;
  border-radius: 10px;
  flex: 200px 2;
`;

const ContainerTitle = styled.div`
  font-size: 36px;
  font-weight: 400;
  margin: 10px 0px;
  text-align: center;
  flex: 0 0 100%;
  color: #fff;
  flex-grow: 0;
`;
// const LoadoutStyle = styled.div`
//   flex-wrap: wrap;

//   display: flex;
//   padding: 10px 10px 10px;
//   margin: 20px 10px 20px;
//   background-color: #222;
//   color: white;
//   float: left;
//   border: 1px solid white;
//   border-radius: 10px;
// `;

const LoadoutBoxStyle = styled(NavLink)`
  justify-content: center;
  padding: 10px 10px 10px;
  // margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid white;
  border-radius: 10px;
  flex: 60px 1;
  font-size: 11px;
  text-align: center;
  flex-direction: column;
  min-width: 60px;
`;
const LoadoutBoxItemStyle = styled.div`
  flex-grow: 1;
`;
const LoadoutBox = ({ number, frequency }) => {
  const tacNumber = number % 4;
  const grenadeNumber = ((number - tacNumber) % 16) / 4;
  const weaponNumber = ((number - (tacNumber + grenadeNumber * 4)) % 64) / 16;

  const tacModMap = [
    "/images/repair_matrix.png",
    "/images/threat_scanner.png",
    "/images/energy_barrier.png",
    "/images/phaseshift.png",
  ];
  const ordinanceMap = [
    "/images/detonator.png",
    "/images/stun_field.png",
    "/images/arcmine.png",
    "/images/instant_repair.png",
  ];
  const weaponMap = [
    "/images/pulsar.png",
    "/images/nova.png",
    "/images/comet.png",
    "/images/meteor.png",
  ];
  // if (displayNumber === 100) {
  //   displayNumber = 99.999;
  // }
  return (
    <LoadoutBoxStyle to={"/leaderboard/loadout/" + number}>
      <img
        src={weaponMap[weaponNumber]}
        alt={"weapon"}
        style={{ width: "60px", height: "60px" }}
      />
      <img
        src={ordinanceMap[grenadeNumber]}
        alt={"weapon"}
        style={{ width: "60px", height: "60px" }}
      />
      <img
        src={tacModMap[tacNumber]}
        alt={"tacMod"}
        style={{ width: "60px", height: "60px" }}
      />
      <LoadoutBoxItemStyle
        style={{ fontSize: "20px", fontWeight: "900" }}
      ></LoadoutBoxItemStyle>
    </LoadoutBoxStyle>
  );
};

const LeaderboardList = ({ userList }) => {
  const [replayList, setReplayList] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    console.log("LOADING ANIMATION");
    console.log(userList);
    async function loadInReplayAnimation() {
      if (userList !== undefined) {
        for (const user of userList) {
          setReplayList((prev) => [...prev, user]);
          await delay(20);
        }
      }
    }
    loadInReplayAnimation();
  }, [userList]);

  let history = useHistory();
  function LeaderboardListClick(session_id) {
    history.push("/user/" + session_id + "/stats");
  }

  return (
    <LeaderboardListsStyle>
      <ContainerTitle></ContainerTitle>
      {replayList.map((user) => {
        const OnGameClick = () => {
          LeaderboardListClick(user["oculus_name"]);
        };
        return (
          <LeaderboardListStyle
            key={user["oculus_name"]}
            onClick={OnGameClick}
            style={{ opacity: 1 }}
          >
            <p style={{ margin: 0 }}>
              {user["oculus_name"] +
                " [" +
                Math.round((user["frames_used"] / (30 * 60 * 60)) * 100) / 100 + //+
                " h]"}
            </p>
          </LeaderboardListStyle>
        );
      })}
    </LeaderboardListsStyle>
  );
};
const TotalLeaderboardList = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: 10px;
  margin: 10px auto;
`;
export default function Leaderboard({
  leaderboardStatistic,
  setBannerCallback,
  subDomain,
}) {
  const [apiData, setApiData] = React.useState(null);
  if (subDomain === undefined) {
    subDomain = "global";
  }
  setBannerCallback("Loadout Leaderboard");

  useEffect(() => {
    fetch(
      "https://ecranked.ddns.net/api/v1/leaderboard/" +
        leaderboardStatistic +
        "/" +
        subDomain +
        "/global",
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        console.log(response);
        const data = await response.json();
        console.log("code:" + response.statusCode);
        if (response.status === 404) {
          console.error("User not found!");
        } else {
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          setApiData(data);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [leaderboardStatistic, subDomain]);

  return (
    <TotalLeaderboardList>
      <LoadoutBox number={subDomain} />
      <LeaderboardList userList={apiData?.slice(0, 200)} />
    </TotalLeaderboardList>
    // <>
    //   {/* <FailedSearchBar  onFormSubmit={whenSearchSubmit} /> */}
    //   <UserBody
    //     style={
    //       userNotFound ? { height: "0px", margin: "0px", opacity: "0%" } : {}
    //     }
    //   >
    //     <LeaderboardLists replays={WhatApiRequest()["recent_games"]} />
    //     <CenterColumn userData={WhatApiRequest()} />
    //     <AboutMe userData={WhatApiRequest()} />
    //   </UserBody>
    // </>
  );
}
