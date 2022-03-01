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
                    // RemoveUser(user.oculus_name);
                    const requestOptions = {
                      method: "POST",
                      headers: {
                        Authorization: localStorage.getItem(
                          "AUTHORIZATION_TOKEN"
                        ),
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ user_id: user.oculus_id }),
                    };

                    fetch(
                      "https://ecranked.ddns.net/api/v1/team/" +
                        teamData.name +
                        "/accept_join",
                      requestOptions
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(data);
                        window.location.reload(false);
                      });
                  }}
                >
                  Accept Request
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
