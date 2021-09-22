import styled from "styled-components";

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

const ProgressDivStyle = styled.div`
  border-radius: 0.5rem;
  border: 2px solid white;
  border-radius: 10px;
  height: 30px;
  overflow: hidden;
`;

const ProgressBarStyle = styled.div`
  position: relative;

  transform: translate(-50%, -0%);
  background-color: #b35252;
  height: 100%;
  border-radius: 8px;
  transition-duration: 0.5s;
  transition-property: width;
`;
const ProgressBarTextStyle = styled.p`
  position: relative;
  margin: -26px 0px;
  text-align: center;
  z-index: 5;
`;

export var ProgressBar = ({ percent, displayValue }) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(percent * 100);
  }, [percent]);

  return (
    <ProgressDivStyle className="progress-div">
      <ProgressBarStyle
        style={{ width: `${map_range(value, 0, 100, 0, 200)}%` }}
        className="progress"
      ></ProgressBarStyle>
      <ProgressBarTextStyle>{displayValue}</ProgressBarTextStyle>
    </ProgressDivStyle>
  );
};
// const UserStat = ({ name, value, displayValue }) => {
//   return (
//     <ReplayStatStyle>
//       {name}
//       <ProgressBar percent={value} displayValue={displayValue}>
//         valueStr
//       </ProgressBar>
//     </ReplayStatStyle>
//   );
// };
const ReplayStatsStyle = styled.div`
  padding: 10px 10px 0px;
  margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 2px solid white;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 0px 10px;
`;
const ReplayStats = ({ userData }) => {
  return (
    <ReplayStatsStyle>
      <ContainerTitle>Stats</ContainerTitle>
    </ReplayStatsStyle>
  );
};
const CenterColumnStyle = styled.div`
  background-color: #222;
  float: left;
  display: flex;
  flex: 400px 4;
  flex-direction: column;
`;
const CenterColumn = ({ userData }) => {
  return (
    <CenterColumnStyle>
      <ReplayStats userData={userData} />
    </CenterColumnStyle>
  );
};
const RecentGameStyle = styled.div`
  display: flex;
  align-items: center;
  background-color: #333;
  padding: 10px;
  margin: 10px 0px;
  text-decoration: none;
  border: 2px solid white;
  border-radius: 10px;
  line-height: 0;
  font-size: 15px;
  line-height: 1.5;
  &:hover {
    background-color: #555;
    color: #000;
  }
  cursor: pointer;
`;
const RecentGamesStyle = styled.div`
  padding: 10px 10px 0px;
  margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 2px solid white;
  border-radius: 10px;
  flex: 200px 2;
`;
const UserList = ({ users }) => {
  let history = useHistory();
  const [userList, setUserList] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function loadInReplayAnimation(replays) {
      replays.sort((replay1, replay2) => {
        return replay1.team - replay2.team;
      });

      var AnimationList = [];
      for (const replay of replays) {
        AnimationList.push(replay);
        setUserList([...AnimationList]);
        await delay(20);
      }
    }
    loadInReplayAnimation(users);
  }, [users]);

  if (!users) return null;
  function userClick(username) {
    history.push("/user/" + username + "/stats");
  }
  return (
    <RecentGamesStyle>
      <ContainerTitle>Users</ContainerTitle>
      {userList.map((user) => {
        const onUserClick = () => {
          userClick(user["name"]);
        };
        return (
          <RecentGameStyle
            onClick={onUserClick}
            style={(() => {
              switch (user["team"]) {
                case 0:
                  return { borderColor: "rgb(65, 160, 228)" };
                case 1:
                  return { borderColor: "rgb(230, 167, 50)" };
                default:
                  return { borderColor: "rgb(255, 255, 255)" };
              }
            })()}
          >
            <p style={{ margin: 0 }}>{user["name"]}</p>
          </RecentGameStyle>
        );
      })}
    </RecentGamesStyle>
  );
};

const LeftBar = styled.div`
  padding: 10px 10px 0px;
  margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 2px solid transparent;
  border-radius: 10px;
  flex: 100px 2;
  display: flex;
`;
const DownloadContainerStyle = styled.div`
  padding: 10px 10px 0px;
  margin: -12px -12px 0px;
  background-color: #222;
  color: white;
  float: left;
  border: 2px solid white;
  border-radius: 10px;
  cursor: pointer;
  flex-grow: 1;
  height: 80px;
  transition-duration: 0.5s;
  transition-property: height;
  overflow: hidden;
`;

const DownloadRatelimitStyle = styled.p`
  padding: 0px;
  margin: 0px;
  height: 60px;
  overflow: hidden;
  transition-duration: 0.5f;
  transition-property: transparency height;
`;
const Download = ({ session_id }) => {
  const [isRateLimit, setIsRateLimit] = useState(false);
  const [rateLimitTime, setRateLimitTime] = useState(0);

  const onButtonClick = () => {
    fetch("https://ecranked.ddns.net/replay/" + session_id + "/trydownload")
      .then(async (response) => {
        const data = await response.text();
        console.log("data", data);
        console.log("code:", response.status);
        if (response.status === 429) {
          console.error("RateLimit!");
          setIsRateLimit(true);
          setRateLimitTime(data);
        } else {
          setIsRateLimit(false);
          window.location.assign(
            "https://ecranked.ddns.net/replay/" + session_id + "/download"
          );
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
        }
      })
      .catch((error) => {
        setIsRateLimit(true);
        console.error("There was an error!", error);
      });

    // //ecranked.ddns.net/replay/91915B74-295B-4B06-AA18-A1440BD1A4E6/trydownload
    // https: window.location.assign(
    //   "https://ecranked.ddns.net/replay/" + session_id + "/download"
    // );
  };
  return (
    <LeftBar>
      <DownloadContainerStyle
        onClick={onButtonClick}
        style={isRateLimit ? { height: "100px" } : { height: "80px" }}
      >
        <ContainerTitle>Download</ContainerTitle>
        <DownloadRatelimitStyle
          style={isRateLimit ? { height: "60px" } : { height: "0px" }}
        >
          please wait {rateLimitTime} seconds
        </DownloadRatelimitStyle>
      </DownloadContainerStyle>
    </LeftBar>
  );
};

const ContainerTitle = styled.h2`
  font-size: 36px;
  font-weight: 400;
  margin: 10px 0px;
  text-align: center;
  flex: 0 0 100%;
  color: #fff;
`;

const ReplayBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    overflow: hidden;
    transition-duration: 1s;
    opacity: 100%
    transition-property: height margin opacity;
  `;

export default function Replay({ session_id }) {
  const EMPTYREQUEST = {
    frames: 9462,
    start_time: "2021-09-21 23:57:38.43",
    end_time: "2021-09-22 00:12:27.43",
    match_length: 888,
    framerate: 10.655405405405405,
    map: "dyson",
    players: [],
    session_id: session_id,
  };
  const [apiData, setApiData] = React.useState(null);
  const [replayNotFound, setReplayNotFound] = React.useState(false);
  useEffect(() => {
    fetch("https://ecranked.ddns.net/replay/" + session_id + ".json")
      .then(async (response) => {
        console.log("finding api data");
        const data = await response.json();
        console.log("code:" + response.statusCode);
        if (response.status === 404) {
          console.error("Replay Not Found!");
          setReplayNotFound(true);
        } else {
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          setApiData(data);
          setReplayNotFound(false);
        }
      })
      .catch((error) => {
        setReplayNotFound(true);
        console.error("There was an error!", error);
      });
  }, [session_id]);

  function WhatApiRequest() {
    console.log("WhatApiRequest", apiData);
    if (replayNotFound) {
      return EMPTYREQUEST;
    }
    if (apiData) {
      return apiData;
    }

    return EMPTYREQUEST;
  }

  console.log("APIDATA2", WhatApiRequest());
  return (
    <ReplayBody
      style={
        replayNotFound ? { height: "0px", margin: "0px", opacity: "0%" } : {}
      }
    >
      <UserList users={WhatApiRequest()["players"]} />
      <CenterColumn userData={WhatApiRequest()} />
      <Download session_id={session_id} />
    </ReplayBody>
  );
}
