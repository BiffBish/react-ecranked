import styled, { keyframes } from "styled-components";
import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useMe, Leaderboard as LeaderboardAPI } from "@ecranked/api";
import AnimatedList from "../components/AnimatedList";

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
// const LeaderboardListsStyle = styled.div`
//   padding: 10px 10px 0px;
//   // margin: 20px 10px 20px;
//   background-color: #222;
//   color: white;
//   float: left;
//   border: 1px solid rgb(70, 70, 70);
//   border-radius: 10px;
//   flex: 200px 2;
// `;

// const ContainerTitle = styled.div`
//   font-size: 36px;
//   font-weight: 400;
//   margin: 10px 0px;
//   text-align: center;
//   flex: 0 0 100%;
//   color: #fff;
//   flex-grow: 0;
// `;

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


interface LeaderboardListItemProps {
  data: {
    oculus_id: string;
    oculus_name: string;
    frames_used: number;
  }
  index: number
}
const LeaderboardListItem = ({ data, index }: LeaderboardListItemProps) => {
  const { me } = useMe();

  let history = useHistory();
  function LeaderboardListClick(session_id: string) {
    history.push("/user/" + session_id + "/stats");
  }
  const OnGameClick = () => {
    LeaderboardListClick(data.oculus_name);
  };
  return (
    <LeaderboardListContainer>
      {/* <LeaderboardListRankingBox rank={user.index} /> */}
      <LeaderboardListStyle
        key={data.oculus_name}
        onClick={OnGameClick}
        style={
          // eslint-disable-next-line
          me?.oculus_id == data.oculus_id
            ? {
              opacity: 1,
              backgroundColor: "#151",
            }
            : {}
        }
      >
        <p style={{ margin: "0" }}>
          {index + ".  " + data.oculus_name}
        </p>
        <p style={{ margin: "0 0 0 auto" }}>
          {Math.round((data.frames_used / (30 * 60 * 60)) * 100) /
            100 + //+
            "h"}
        </p>
      </LeaderboardListStyle>
    </LeaderboardListContainer>
  )
};




const TotalLeaderboardList = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  min-width: 400px;
  gap: 10px;
  margin: 10px auto;
`;

interface LeaderboardProps {
  leaderboardStatistic: string;
  subDomain: string;
}
export default function Leaderboard({
  leaderboardStatistic,
  subDomain,
}: LeaderboardProps) {

  const [apiData, setApiData] = React.useState<{
    oculus_id: string,
    oculus_name: string,
    frames_used: number,
  }[] | null>(null);


  if (subDomain === undefined) {
    subDomain = "global";
  }
  const [randomLoadout, setRandomLoadout] = React.useState<null | number>(null);

  if (
    leaderboardStatistic === "loadout" &&
    subDomain === "random" &&
    randomLoadout === null
  ) {
    var randomLoadoutNumber = Math.round(Math.random() * 64);
    setRandomLoadout(randomLoadoutNumber);
  }

  if (randomLoadout != null) {
    subDomain = randomLoadout.toString();
  }
  useEffect(() => {
    LeaderboardAPI.getStatistic(leaderboardStatistic, subDomain).then(
      (data) => {
        setApiData(data as {

          oculus_id: string,
          oculus_name: string,
          frames_used: number,

        }[]);
      }
    );
  }, [leaderboardStatistic, subDomain]);

  return (
    <TotalLeaderboardList>
      {/* <LoadoutBox number={subDomain} /> */}
      <AnimatedList listData={apiData?.slice(0, 200) ?? []}>
        <LeaderboardListItem data={{
          oculus_id: "fake",
          oculus_name: "",
          frames_used: 0,
        }} index={0} />
      </AnimatedList>

    </TotalLeaderboardList >
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
