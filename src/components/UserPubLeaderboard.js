import styled, { keyframes } from "styled-components";
import React, { useEffect, useState } from "react";

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
  flex-grow: 1;
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
const LeaderboardList = ({ userList, username }) => {
  const [replayList, setReplayList] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    setReplayList([]);
    console.log("LOADING ANIMATION");
    console.log(userList);
    var index = 1;
    async function loadInReplayAnimation() {
      if (userList !== null) {
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
      <ContainerTitle> Pub Leaderboard</ContainerTitle>
      {replayList.map((user) => {
        const OnGameClick = () => {
          LeaderboardListClick(user["oculus_name"]);
        };
        return (
          <LeaderboardListContainer key={user.oculus_name}>
            <LeaderboardListStyle
              onClick={OnGameClick}
              style={{
                opacity: 1,
                backgroundColor:
                  username === user.oculus_name ? "#0f05" : "#0000",
              }}
            >
              <p style={{ margin: "0", float: "left" }}>
                {user.position + ".   " + user["oculus_name"]}
              </p>

              <p style={{ margin: "0 0 0 auto" }}>{user.total_games}</p>
            </LeaderboardListStyle>
          </LeaderboardListContainer>
        );
      })}
    </LeaderboardListsStyle>
  );
};
export default function UserPubLeaderboard({ oculus_name }) {
  const [apiData, setApiData] = React.useState(null);
  const [displayData, setDisplayData] = React.useState(null);

  useEffect(() => {
    fetch("https://ecranked.ddns.net/pubs", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 404) {
          console.error("Error!");
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
  }, [setApiData]);

  useEffect(() => {
    if (apiData == null) {
      return;
    }
    var LeaderboardPosition = 0;
    for (let index = 0; index < apiData.length; index++) {
      const element = apiData[index];
      if (element.oculus_name === oculus_name) {
        LeaderboardPosition = index - 5;
      }
    }
    if (LeaderboardPosition < 0) {
      LeaderboardPosition = 0;
    }
    setDisplayData(
      apiData.slice(LeaderboardPosition, LeaderboardPosition + 10)
    );
  }, [apiData, oculus_name]);
  console.log("LEADERBOARD", apiData);
  return (
    <LeaderboardList userList={displayData} username={oculus_name} />
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
