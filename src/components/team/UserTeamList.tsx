/* eslint-disable */

import styled, { keyframes } from "styled-components";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment-timezone";
import UserButton from "../UserButton";
import { Team, Types } from "@ecranked/api";
import AnimatedList from "../AnimatedList";
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
  padding: 10px 10px 10px;
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



interface TeamUserButtonProps {
  data: Types.Team.User | null;
}
const TeamUserButton = ({ data }: TeamUserButtonProps) => {
  return <UserButton username={data?.oculus_name ?? "{error}"} />
}

interface UserTeamListProps {
  teamData: Team | null
}
export const UserTeamList = ({ teamData }: UserTeamListProps) => {
  console.log(teamData?.requesting_users)
  return (
    <>
      <RecentGamesStyle>
        <ContainerTitle>Leader</ContainerTitle>
        <UserButton oculus_id={teamData?.admin_id} />
        <ContainerTitle>Members</ContainerTitle>
        <AnimatedList listData={teamData?.users ?? []}>
          <TeamUserButton data={null} />
        </AnimatedList>
        {(teamData?.requesting_users.length ?? []) > 0 ?
          (
            <>
              <ContainerTitle>Users requesting to join</ContainerTitle>
              <AnimatedList listData={teamData?.requesting_users ?? []}>
                <TeamUserButton data={null} />
              </AnimatedList>
            </>
          ) : null
        }
      </RecentGamesStyle>
    </>
  );

};
