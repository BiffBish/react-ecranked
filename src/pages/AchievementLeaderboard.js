import styled, { keyframes } from "styled-components";
import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { MasterAchievementBar } from "../components/MasterAchievementBar";
import { Link } from "react-router-dom";
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

const LeaderboardList = ({ userList, compacted }) => {
  const [animationIndex, setAnimationIndex] = useState(0);

  useEffect(() => {
    console.log("LOADING ANIMATION");
    console.log(userList);
    var index = 1;
    async function loadInReplayAnimation() {
      if (userList !== undefined) {
        for (const user of userList) {
          user.index = index;
          index++;
          setAnimationIndex((prev) => prev + 1);
          if (index > 50) {
            index = 50;
            break;
          }
          // await delay(10);
        }
      }
    }
    loadInReplayAnimation();
  }, [userList]);

  let history = useHistory();
  function LeaderboardListClick(session_id) {
    history.push("/user/" + session_id + "/stats");
  }
  if (userList == null) {
    return null;
  }
  return (
    <LeaderboardListsStyle>
      <ContainerTitle></ContainerTitle>
      {userList.slice(0, animationIndex).map((user, index) => {
        const OnGameClick = () => {
          LeaderboardListClick(user["oculus_name"]);
        };

        // user["1"] = user["team_id"] ? 1 : 0;
        // user["2"] = user["discord_name"] !== null ? 1 : 0;
        // user["3"] = user["about_string"] ? 1 : 0;
        // user["4"] = user["avatar"] ? 1 : 0;

        // var total = 0;
        // for (let index = 1; index <= 79; index++) {
        //   total += user[index.toString()];
        // }

        var communityTotal = 0;
        for (let index = 1; index <= 4; index++) {
          communityTotal += user[index.toString()];
        }

        var dailyTotal = 0;
        for (let index = 5; index <= 29; index++) {
          dailyTotal += user[index.toString()];
        }

        var weeklyTotal = 0;
        for (let index = 30; index <= 54; index++) {
          weeklyTotal += user[index.toString()];
        }

        var alltimeTotal = 0;
        for (let index = 55; index <= 79; index++) {
          alltimeTotal += user[index.toString()];
        }
        // communityTotal = 4;
        // dailyTotal = 25;
        // weeklyTotal = 25;
        // alltimeTotal = 25;

        if (index > animationIndex) {
          communityTotal = 0;
          dailyTotal = 0;
          weeklyTotal = 0;
          alltimeTotal = 0;
        }
        if (compacted) {
          return (
            <LeaderboardListContainer onClick={OnGameClick}>
              <div className="grow">
                <p style={{ margin: "0", flexBasis: 0, flexGrow: 0.2 }}>
                  {user.position + 1 + ".  " + user["oculus_name"]}
                </p>
                <MasterAchievementBar
                  CommunityPercent={communityTotal / 79}
                  DailyPercent={dailyTotal / 79}
                  WeeklyPercent={weeklyTotal / 79}
                  SeasonPercent={alltimeTotal / 79}
                  // Percentage={achievementData.values["63"]}
                  Title={""}
                  Height={"50px"}
                  EnableBorder={true}
                />
              </div>
            </LeaderboardListContainer>
          );
        }
        return (
          <LeaderboardListContainer onClick={OnGameClick}>
            <p style={{ margin: "0", flexBasis: 0, flexGrow: 0.2 }}>
              {user.position + 1 + ".  " + user["oculus_name"]}
            </p>
            <MasterAchievementBar
              CommunityPercent={communityTotal / 79}
              DailyPercent={dailyTotal / 79}
              WeeklyPercent={weeklyTotal / 79}
              SeasonPercent={alltimeTotal / 79}
              // Percentage={achievementData.values["63"]}
              Title={""}
              Height={"50px"}
              EnableBorder={true}
            />
          </LeaderboardListContainer>
        );
      })}
    </LeaderboardListsStyle>
  );
};
const TotalLeaderboardList = styled.div`
  display: flex;
  flex-direction: column;
  // width: 80%;
  // min-width: 400px;
  gap: 10px;
  margin: 0px auto;
`;
export default function AchievementLeaderboard({
  leaderboardStatistic,
  setBannerCallback,
  subDomain,
  limit = 200,
  surroundID = null,
  compacted = true,
}) {
  console.log("LOADING ACHIEVEMENT LEADERBOARD");
  const [apiData, setApiData] = React.useState(null);
  const [sortedApiData, setSortedApiData] = React.useState(null);
  if (subDomain === undefined) {
    subDomain = "global";
  }
  setBannerCallback("Challenges Leaderboard");
  const [randomLoadout, setRandomLoadout] = React.useState(null);
  const [startIndex, setStartIndex] = React.useState(0);

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
    fetch("https://ecranked.ddns.net/api/v1/leaderboard/achievement", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
        "Content-Type": "application/json",
      },
    })
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

  useEffect(() => {
    if (!apiData) return;
    apiData.forEach((element) => {
      var total = 0;
      for (let index = 1; index <= 79; index++) {
        const element2 = element[index.toString()];

        total += element2;
      }
      element["80"] = total / 79;
    });

    apiData.sort((a, b) =>
      a["80"] > b["80"] ? -1 : b["80"] > a["80"] ? 1 : 0
    );
    let NewData = [];
    apiData.forEach((element, index) => {
      if (element.oculus_id === surroundID) {
        if (index - 3 < 0) {
          setStartIndex(0);
        } else {
          setStartIndex(index - 3);
        }
      }
      element.position = index;
      NewData.push(element);
    });
    setSortedApiData(NewData);
  }, [apiData, surroundID]);
  return (
    <TotalLeaderboardList>
      <Link
        className="rounded centering padded button"
        to={"/leaderboard/challenges"}
      >
        <img
          src="/images/ECFCS1.png"
          alt="Season 1 banner"
          style={{ width: "100%", maxWidth: "400px" }}
        ></img>
      </Link>

      <LeaderboardList
        userList={sortedApiData?.slice(startIndex, startIndex + limit)}
        compacted={compacted}
      />
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
