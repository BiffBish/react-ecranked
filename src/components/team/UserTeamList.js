/* eslint-disable */

import styled, { keyframes } from "styled-components";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment-timezone";
import UserButton from "../UserButton";
import makeApiCall from "../../helpers/makeApiCall";
const ContainerTitle = styled.div`
  font-size: 36px;
  font-weight: 400;
  margin: 10px 0px;
  text-align: center;
  // flex: 0 0 100%;
  color: #fff;
  // flex-grow: 0;
  // height: 20px;
  align-items: stretch;
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
  animation: ${RecentGameFadeIN} 0.2s;
`;
const RecentGameStyleGrow = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  background-color: #333;
  padding: 10px;
  margin: 10px 0px;
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
  animation: ${RecentGameFadeIN} 0.2s;
`;
const RecentGamesStyle = styled.div`
  padding: 10px 10px 0px;
  // margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  flex: 200px 2;
  display: flex;
  flex-direction: column;
`;
const UserContainer = styled.div`
  background-color: #222;
  color: white;
  float: left;
  display: flex;
  // flex: 200px 2;
  flex-wrap: wrap;
  gap: 10px;
  align-items: stretch;
  // height: 20px;
  // height: 52px;
`;
export const UserTeamList = ({ teamData }) => {
  let userList = teamData.users;
  let requestedList = teamData.requested_users;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [usersAnimationID, setUsersAnimationID] = useState(0);
  const [requestedAnimationID, setRequestedAnimationID] = useState(0);

  useEffect(() => {
    console.log("LOADING ANIMATION");
    console.log(userList);
    async function loadInReplayAnimation() {
      if (userList !== undefined) {
        for (const user of userList) {
          setUsersAnimationID((prev) => prev + 1);
          await delay(20);
        }
      }
    }
    loadInReplayAnimation();
  }, [userList]);

  useEffect(() => {
    console.log("LOADING ANIMATION");
    console.log(requestedList);
    async function loadInReplayAnimation() {
      if (requestedList !== undefined) {
        for (const user of requestedList) {
          setRequestedAnimationID((prev) => prev + 1);
          await delay(20);
        }
      }
    }
    loadInReplayAnimation();
  }, [requestedList]);

  let history = useHistory();
  function recentGameClick(session_id) {
    history.push("/user/" + session_id + "/stats");
  }
  if (requestedList !== undefined) {
    return (
      <>
        <RecentGamesStyle>
          <ContainerTitle>Leader</ContainerTitle>
          <UserButton oculus_id={teamData.admin_id} />
          <ContainerTitle>Members</ContainerTitle>
          {userList.slice(0, usersAnimationID).map((replay) => {
            if (replay.oculus_id == teamData.admin_id) return null;
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
          <ContainerTitle>Users requesting to join</ContainerTitle>
          {requestedList.slice(0, requestedAnimationID).map((user) => {
            const OnGameClick = () => {
              recentGameClick(replay.oculus_name);
            };
            return (
              <UserContainer>
                <RecentGameStyleGrow
                  to={"/user/" + user.oculus_name + "/stats"}
                >
                  {" "}
                  {user.oculus_name}
                </RecentGameStyleGrow>
                <RecentGameStyle
                  onClickCapture={() => {
                    makeApiCall(
                      "v1/team/" + teamData.team_id + "/accept_join",
                      "POST",
                      { user_id: user.oculus_id }
                    ).then((_) => {
                      console.log("Accepted");
                      window.location.reload(false);
                    });
                  }}
                >
                  Accept
                </RecentGameStyle>
                <RecentGameStyle
                  onClickCapture={() => {
                    makeApiCall(
                      "v1/team/" + teamData.team_id + "/deny_join",
                      "POST",
                      { user_id: user.oculus_id }
                    ).then((_) => {
                      console.log("denied");
                      window.location.reload(false);
                    });
                  }}
                >
                  Deny
                </RecentGameStyle>
              </UserContainer>
            );
          })}
        </RecentGamesStyle>
      </>
    );
  }
  return (
    <>
      <RecentGamesStyle>
        <ContainerTitle>Members</ContainerTitle>
        {userList.slice(0, usersAnimationID).map((replay) => {
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
