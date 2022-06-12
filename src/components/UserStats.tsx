import styled from "styled-components";
import React from "react";
import { UserStat } from "./UserStat";
import { ContainerTitle, map_range } from "./Statistics";
import { User } from "@ecranked/api";

const UserStatsStyle = styled.div`
  padding: 0px 20px 20px;
  background-color: #282828;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 0px 20px;
`;

enum StatChoiceOptions {
  weekly_stats = "weekly_stats",
  daily_stats = "daily_stats",
  monthly_stats = "monthly_stats",
  stats = "stats"
}

interface UserStatsProps {
  userData: User | null
  statChoice: StatChoiceOptions
}
export const UserStats = ({ userData, statChoice }: UserStatsProps) => {

  const userStats = userData?.[statChoice];
  return (
    <UserStatsStyle>
      <ContainerTitle>Stats</ContainerTitle>

      <UserStat
        name={"Total Games"}
        displayValue={userStats?.total_games ?? 0}
        value={1} />
      <UserStat
        name={"Total Deaths"}
        displayValue={userStats?.deaths ?? 0}
        value={1} />
      {/* <UserStat
              name={"Average Ping"}
              displayValue={userStats["average_ping"].toFixed(1) + "ms"}
              value={map_range(userStats["average_ping"], 0, 200, 0, 1)}
            /> */}
      <UserStat
        name={"Average Speed"}
        displayValue={userStats?.average_speed?.toFixed(2) ?? 0 + "m/s"}
        value={map_range(userStats?.average_speed ?? 0, 0, 5, 0, 1)} />
      <UserStat
        name={"Time idle"}
        displayValue={((userStats?.percent_stopped ?? 0) * 100).toFixed(1) + "%"}
        value={userStats?.percent_stopped ?? 0} />
      <UserStat
        name={"Inverted"}
        displayValue={((userStats?.percent_upsidedown ?? 0) * 100).toFixed(1) + "%"}
        value={userStats?.percent_upsidedown ?? 0} />
      <UserStat
        name={"Deaths/Game"}
        displayValue={userStats?.average_deaths?.toFixed(1) ?? 0}
        value={map_range(userStats?.average_deaths ?? 0, 0, 15, 0, 1)} />
      {/* <UserStat
              name={"Crash/Leave"}
              displayValue={(userStats["percent_crash"] * 100).toFixed(2) + "%"}
              value={userStats["percent_crash"]}
            /> */}
      <UserStat
        name={"Level"}
        displayValue={userData?.level ?? 0}
        value={map_range(userData?.level ?? 0, 0, 50, 0, 1)} />
      <UserStat
        name={"Hours Played"}
        displayValue={((userStats?.total_seconds ?? 0) / (60 * 60)).toFixed(1) + "h"}
        value={1} />
    </UserStatsStyle>
  );
};
