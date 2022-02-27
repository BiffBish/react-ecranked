/* eslint-disable */

import styled, { keyframes } from "styled-components";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment-timezone";
const ContainerTitle = styled.div`
  font-size: 36px;
  font-weight: 400;
  margin: 10px 0px;
  text-align: center;
  flex: 0 0 100%;
  color: #fff;
  flex-grow: 0;
`;
const RecentGameFadeIN = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;
const RecentGameStyle = styled.div`
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
  animation: ${RecentGameFadeIN} 0.2s;
`;
const RecentGamesStyle = styled.div`
  padding: 10px 10px 0px;
  // margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid white;
  border-radius: 10px;
  flex: 200px 2;
`;
export const UserTeamList = ({ userList }) => {
  const [replayList, setReplayList] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function loadInReplayAnimation(userList) {
      var AnimationList = [];
      for (const replay of userList) {
        AnimationList.push(replay);
        setReplayList([...AnimationList]);
        await delay(20);
      }
    }
    loadInReplayAnimation(userList);
  }, [userList]);

  let history = useHistory();
  function recentGameClick(session_id) {
    history.push("/user/" + session_id + "/stats");
  }
  return (
    <>
      <RecentGamesStyle>
        <ContainerTitle>Members</ContainerTitle>
        {replayList.map((replay) => {
          const OnGameClick = () => {
            recentGameClick(replay.oculus_name);
          };
          return (
            <RecentGameStyle
              key={replay["oculus_id"]}
              onClick={OnGameClick}
              style={{ opacity: 1 }}
            >
              <p style={{ margin: 0 }}>{replay.oculus_name}</p>
            </RecentGameStyle>
          );
        })}
      </RecentGamesStyle>
    </>
  );
};
