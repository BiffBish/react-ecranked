import styled, { keyframes } from "styled-components";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useHistory } from "react-router-dom";
import { makeApiCall } from "../helpers/api/index";

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
const LeaderboardListContainer = styled.div`
  display: flex;
  align-items: center;
  // background-color: #333;
  // padding: 10px;
  margin: 10px 0px;

  cursor: pointer;
  gap: 10px;
  animation: ${LeaderboardListFadeIN} 0.2s;
`;
const LeaderboardListStyle = styled.div`
  display: flex;
  align-items: center;
  background-color: #333;
  padding: 10px;
  // margin: 10px 0px;
  text-decoration: none;
  border: 1px solid rgb(70, 70, 70);
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
  flex-grow: 1;
`;
const LeaderboardListsStyle = styled.div`
  padding: 10px 10px 0px;
  // margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
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
//   border: 1px solid rgb(70, 70, 70);
//   border-radius: 10px;
// `;

const LoadoutBoxStyle = styled(NavLink)`
  justify-content: center;
  padding: 10px 10px 10px;
  // margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
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
    "repair_matrix.png",
    "threat_scanner.png",
    "energy_barrier.png",
    "phaseshift.png",
  ];
  const ordinanceMap = [
    "detonator.png",
    "stun_field.png",
    "arcmine.png",
    "instant_repair.png",
  ];
  const weaponMap = ["pulsar.png", "nova.png", "comet.png", "meteor.png"];
  // if (displayNumber === 100) {
  //   displayNumber = 99.999;
  // }
  return (
    <LoadoutBoxStyle to={"/leaderboard/loadout/" + number}>
      <img
        src={"/images/icons/" + weaponMap[weaponNumber]}
        alt={"weapon"}
        style={{ width: "60px", height: "60px" }}
      />
      <img
        src={"/images/icons/" + ordinanceMap[grenadeNumber]}
        alt={"weapon"}
        style={{ width: "60px", height: "60px" }}
      />
      <img
        src={"/images/icons/" + tacModMap[tacNumber]}
        alt={"tacMod"}
        style={{ width: "60px", height: "60px" }}
      />
      <LoadoutBoxItemStyle
        style={{ fontSize: "20px", fontWeight: "900" }}
      ></LoadoutBoxItemStyle>
    </LoadoutBoxStyle>
  );
};
// function ordinal_suffix_of(i) {
//   var j = i % 10,
//     k = i % 100;
//   if (j === 1 && k !== 11) {
//     return i + "st";
//   }
//   if (j === 2 && k !== 12) {
//     return i + "nd";
//   }
//   if (j === 3 && k !== 13) {
//     return i + "rd";
//   }
//   return i + "th";
// }
const LeaderboardList = ({ userList }) => {
  const [replayList, setReplayList] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    console.log("LOADING ANIMATION");
    console.log(userList);
    var index = 1;
    async function loadInReplayAnimation() {
      if (userList !== undefined) {
        for (const user of userList) {
          user.index = index;
          index++;
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
          <LeaderboardListContainer>
            {/* <LeaderboardListRankingBox rank={user.index} /> */}
            <LeaderboardListStyle
              key={user["oculus_name"]}
              onClick={OnGameClick}
              style={
                // eslint-disable-next-line
                localStorage.getItem("OCULUS_ID") == user.oculus_id
                  ? {
                      opacity: 1,
                      backgroundColor: "#151",
                    }
                  : {}
              }
            >
              <p style={{ margin: "0" }}>
                {user.index + ".  " + user["oculus_name"]}
              </p>
              <p style={{ margin: "0 0 0 auto" }}>
                {Math.round((user["frames_used"] / (30 * 60 * 60)) * 100) /
                  100 + //+
                  "h"}
              </p>
            </LeaderboardListStyle>
          </LeaderboardListContainer>
        );
      })}
    </LeaderboardListsStyle>
  );
};
const TotalLeaderboardList = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  min-width: 400px;
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
  const [randomLoadout, setRandomLoadout] = React.useState(null);

  if (
    leaderboardStatistic === "loadout" &&
    subDomain === "random" &&
    randomLoadout === null
  ) {
    var randomLoadoutNumber = Math.round(Math.random() * 64);
    setRandomLoadout(randomLoadoutNumber);
    subDomain = randomLoadout;
  }

  if (randomLoadout != null) {
    subDomain = randomLoadout;
  }
  useEffect(() => {
    makeApiCall(
      "v1/leaderboard/" + leaderboardStatistic + "/" + subDomain + "/global"
    )
      .then(async (response) => {
        const data = await response.json;
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
