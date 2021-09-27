import styled, { keyframes } from "styled-components";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AutoComplete from "../components/AutoComplete";
import moment from "moment-timezone";

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}
const LoadoutStyle = styled.div`
  flex-wrap: wrap;

  display: flex;
  padding: 10px 10px 10px;
  margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 2px solid white;
  border-radius: 10px;
`;

const LoadoutBoxStyle = styled.div`
  justify-content: center;
  padding: 10px 10px 10px;
  margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 2px solid white;
  border-radius: 10px;
  flex: 60px 1;
  font-size: 12px;
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
    "/images/repair_matrix.png",
    "/images/threat_scanner.png",
    "/images/energy_barrier.png",
    "/images/phaseshift.png",
  ];
  const ordinanceMap = [
    "/images/detonator.png",
    "/images/stun_field.png",
    "/images/arcmine.png",
    "/images/instant_repair.png",
  ];
  const weaponMap = [
    "/images/pulsar.png",
    "/images/nova.png",
    "/images/comet.png",
    "/images/meteor.png",
  ];

  return (
    <LoadoutBoxStyle>
      <img
        src={weaponMap[weaponNumber]}
        alt={"weapon"}
        style={{ width: "60px", height: "60px" }}
      />
      <img
        src={ordinanceMap[grenadeNumber]}
        alt={"weapon"}
        style={{ width: "60px", height: "60px" }}
      />
      <img
        src={tacModMap[tacNumber]}
        alt={"tacMod"}
        style={{ width: "60px", height: "60px" }}
      />
      <LoadoutBoxItemStyle style={{ fontSize: "20px", fontWeight: "900" }}>
        {Math.round(frequency * 10000) / 100 + "%"}{" "}
      </LoadoutBoxItemStyle>
    </LoadoutBoxStyle>
  );
};
const LoadoutExpandButtonStyle = styled.div`
  border: 2px solid white;
  border-radius: 10px;
  flex-grow: 1;
  margin: 10px;
  height: 40px;
  text-align: center;
  cursor: pointer;
`;
const Loadout = ({ top_loadout }) => {
  const [numOfEntrys, setNumOfEntrys] = useState(5);
  return (
    <>
      <LoadoutStyle>
        {top_loadout.slice(0, numOfEntrys).map((loadout) => {
          return <LoadoutBox number={loadout[0]} frequency={loadout[1]} />;
        }, 4)}{" "}
        <LoadoutExpandButtonStyle
          onClick={() => {
            setNumOfEntrys(numOfEntrys * 2);
          }}
        >
          {" "}
          Click to show more{" "}
        </LoadoutExpandButtonStyle>
      </LoadoutStyle>
    </>
  );
};

const UserStatStyle = styled.div`
  margin: 2px;
  float: left;
  background-color: #222;
  color: white;
  z-index: 3;
  font-size: 20px;
  flex-basis: 0;
  flex-grow: 1;
  min-width: 120px;
  font-size: 14px;
  text-align: center;
  line-height: 1.5;
`;

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
const UserStat = ({ name, value, displayValue }) => {
  return (
    <UserStatStyle>
      {name}
      <ProgressBar percent={value} displayValue={displayValue}>
        valueStr
      </ProgressBar>
    </UserStatStyle>
  );
};
const UserStatsStyle = styled.div`
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
const UserStats = ({ userData }) => {
  return (
    <UserStatsStyle>
      <ContainerTitle>Stats</ContainerTitle>
      <UserStat
        name={"Total Games"}
        displayValue={userData["total_games"]}
        value={1}
      />
      <UserStat
        name={"Total Deaths"}
        displayValue={userData["total_deaths"]}
        value={1}
      />
      <UserStat
        name={"Average Ping"}
        displayValue={userData["average_ping"].toFixed(1) + "ms"}
        value={map_range(userData["average_ping"], 0, 200, 0, 1)}
      />
      <UserStat
        name={"Average Speed"}
        displayValue={userData["average_speed"].toFixed(2) + "m/s"}
        value={map_range(userData["average_speed"], 0, 5, 0, 1)}
      />
      <UserStat
        name={"Time Stopped"}
        displayValue={(userData["percent_stopped"] * 100).toFixed(1) + "%"}
        value={userData["percent_stopped"]}
      />
      <UserStat
        name={"Inverted"}
        displayValue={(userData["percent_upsidedown"] * 100).toFixed(1) + "%"}
        value={userData["percent_upsidedown"]}
      />
      <UserStat
        name={"Deaths/game"}
        displayValue={userData["average_deaths"].toFixed(1)}
        value={map_range(userData["average_deaths"], 0, 15, 0, 1)}
      />
      <UserStat
        name={"Crash/Leave"}
        displayValue={(userData["percent_crash"] * 100).toFixed(2) + "%"}
        value={userData["percent_crash"]}
      />
    </UserStatsStyle>
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
      <UserStats userData={userData} />
      <Loadout top_loadout={userData["top_loadout"] ? userData["top_loadout"] : [] } />
    </CenterColumnStyle>
  );
};

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
  animation: ${RecentGameFadeIN} 0.2s;
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
const RecentGames = ({ replays }) => {
  const [replayList, setReplayList] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function loadInReplayAnimation(replays) {
      var AnimationList = [];
      for (const replay of replays) {
        AnimationList.push(replay);
        setReplayList([...AnimationList]);
        await delay(20);
      }
    }
    loadInReplayAnimation(replays);
  }, [replays]);

  let history = useHistory();
  function recentGameClick(session_id) {
    history.push("/replay/" + session_id);
  }

  return (
    <RecentGamesStyle>
      <ContainerTitle>Replays</ContainerTitle>
      {replayList.map((replay) => {
        const LocalGameTime = moment.unix(replay["start_time"]);  // Assumes seconds.  Defaults to local time
        const UtcGameTime = moment.unix(replay["start_time"]).utc();  // Must be separate object b/c utc() just sets a flag
        const UtcNow = moment.utc();
        const dateDiffrence = UtcGameTime.diff(UtcNow, "d");
        const hourDiffrence = UtcGameTime.diff(UtcNow, "h");

        var TimeString = "";

        if (dateDiffrence === 0) {
          TimeString = `${-hourDiffrence}h ago`;
        }
        if (dateDiffrence < 0) {
          TimeString = `${-dateDiffrence} days ago`;
        }
        const OnGameClick = () => {
          recentGameClick(replay["session_id"]);
        };
        return (
          <RecentGameStyle
            key={replay["session_id"]}
            onClick={OnGameClick}
            style={{ opacity: 1 }}
          >
            <p style={{ margin: 0 }}>
              {"{" +
                TimeString +
                "}" +
                "[" +
                moment(LocalGameTime).format("MMM DD LTS") + //+
                "] - " +
                replay["map"]}
            </p>
          </RecentGameStyle>
        );
      })}
    </RecentGamesStyle>
  );
};
const AboutMeStyle = styled.div`
  padding: 10px 10px 0px;
  margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 2px solid white;
  border-radius: 10px;
  flex: 100px 2;
`;
const AboutMe = ({ userData }) => {
  return (
    <AboutMeStyle>
      <ContainerTitle>About Me</ContainerTitle>
      {userData["about_string"]}
    </AboutMeStyle>
  );
};
const UserBody = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  height: 100%;
  overflow: hidden;
  transition-duration: 1s;
  opacity: 100%
  transition-property: height margin opacity;
`;

const ContainerTitle = styled.h2`
  font-size: 36px;
  font-weight: 400;
  margin: 10px 0px;
  text-align: center;
  flex: 0 0 100%;
  color: #fff;
`;
const autoCompleteBox = styled.form`
  border: 2px solid white;
  border-radius: 10px;
  display: inline-block;
  float: center;
  margin: 4px;
  background-color: #222;
  z-index: 50;
  float: center;
  overflow: hidden;
`;
const autoCompleteInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 36px;
  padding: 8px;
  font-family: "Montserrat", sans-serif;
  z-index: 50;
`;
const autoCompleteOptionDiv = styled.div`
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 36px;
  padding: 3px 8px;
  z-index: 50;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
  transition-duration: 0.1s;
`;

const FailedSearchBarStyle = styled.div`
  flex-grow: 1;
  height: 0px;
  transition-duration: 1s;
  border-width: 2px
  transition-property: height border margin border-width;
  background-color: #222;
  overflow: hidden;
  border-style: solid;
  
  border-radius: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const FailedSearchBarTitleStyle = styled.h2`
  text-align: center;
  font-size: 42px;
  color: #fff;
  line-height: 1;
`;
const FailedSearchBar = ({ shown, onFormSubmit }) => {
  const [allUsernames, setAllUsernames] = useState(null);

  useEffect(() => {
    fetch("https://ecranked.ddns.net/api/v1/user/@all")
      .then(async (response) => {
        const data = await response.json();
        console.log("allUsernames code:" + response.statusCode);
        if (response.status === 404) {
        } else {
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          console.log(data);
          setAllUsernames(data);
        }
      })
      .catch((error) => {
        console.error("SetAllUsernames => There was an error!", error);
      });
  }, []);

  return (
    <FailedSearchBarStyle
      style={
        shown
          ? {
              height: `600px`,
              border: "2px solid #fff",
              margin: "10px 10px 0px",
            }
          : {
              height: `0px`,
              border: "0px solid #222",
              margin: "0px 10px 0px",
            }
      }
    >
      <FailedSearchBarTitleStyle>Could not find user</FailedSearchBarTitleStyle>
      <AutoComplete
        onFormSubmit={onFormSubmit}
        options={allUsernames}
        maxAllowed={6}
        Box={autoCompleteBox}
        OptionDiv={autoCompleteOptionDiv}
        Input={autoCompleteInput}
      ></AutoComplete>
    </FailedSearchBarStyle>
  );
};

export default function User({ username }) {
  let history = useHistory();
  const whenSearchSubmit = (text) => {
    console.log(text);
    history.push("/user/" + text + "/stats");
    //Change url without reloading: /user/{text}/stats
  };

  const EMPTYREQUEST = {
    average_speed: 0,
    average_ping: 0,
    percent_stopped: 0,
    percent_upsidedown: 0,
    total_games: 0,
    total_deaths: 0,
    average_deaths: 0,
    discord_name: null,
    discord_pfp: null,
    loadout: {
      0: 0.000477,
      1: 0.000195,
      2: 0.0,
      3: 0.002625,
      4: 0.0,
      5: 0.0,
      6: 0.0,
      7: 0.0,
      8: 0.000668,
      9: 0.0,
      10: 0.0,
      11: 0.0,
      12: 0.0,
      13: 0.0,
      14: 0.0,
      15: 0.0,
      16: 0.001513,
      17: 7.3e-5,
      18: 1e-5,
      19: 0.004462,
      20: 5e-6,
      21: 0.0,
      22: 0.0,
      23: 1.7e-5,
      24: 8.9e-5,
      25: 0.00583,
      26: 0.000339,
      27: 0.019384,
      28: 0.001617,
      29: 0.0,
      30: 0.0,
      31: 1.3e-5,
      32: 0.156949,
      33: 0.378763,
      34: 0.018567,
      35: 0.242486,
      36: 0.000111,
      37: 5e-6,
      38: 5e-6,
      39: 0.000398,
      40: 0.029968,
      41: 0.004429,
      42: 2.4e-5,
      43: 6.8e-5,
      44: 0.027134,
      45: 1.3e-5,
      46: 0.0,
      47: 3.2e-5,
      48: 4.6e-5,
      49: 0.06147,
      50: 0.0,
      51: 5.4e-5,
      52: 0.0,
      53: 0.0,
      54: 0.0,
      55: 0.0,
      56: 0.041852,
      57: 0.0,
      58: 0.0,
      59: 0.0,
      60: 0.000314,
      61: 0.0,
      62: 0.0,
      63: 0.0,
    },
    top_loadout: [
      ["33", 0.378763],
      ["35", 0.242486],
      ["32", 0.156949],
      ["49", 0.06147],
      ["56", 0.041852],
      ["40", 0.029968],
      ["44", 0.027134],
      ["27", 0.019384],
      ["34", 0.018567],
      ["25", 0.00583],
      ["19", 0.004462],
      ["41", 0.004429],
      ["3", 0.002625],
      ["28", 0.001617],
      ["16", 0.001513],
      ["8", 0.000668],
      ["0", 0.000477],
      ["39", 0.000398],
      ["26", 0.000339],
      ["60", 0.000314],
      ["1", 0.000195],
      ["36", 0.000111],
      ["24", 8.9e-5],
      ["17", 7.3e-5],
      ["43", 6.8e-5],
      ["51", 5.4e-5],
      ["48", 4.6e-5],
      ["47", 3.2e-5],
      ["42", 2.4e-5],
      ["23", 1.7e-5],
      ["31", 1.3e-5],
      ["45", 1.3e-5],
      ["18", 1e-5],
      ["20", 5e-6],
      ["37", 5e-6],
      ["38", 5e-6],
      ["2", 0.0],
      ["4", 0.0],
      ["5", 0.0],
      ["6", 0.0],
      ["7", 0.0],
      ["9", 0.0],
      ["10", 0.0],
      ["11", 0.0],
      ["12", 0.0],
      ["13", 0.0],
      ["14", 0.0],
      ["15", 0.0],
      ["21", 0.0],
      ["22", 0.0],
      ["29", 0.0],
      ["30", 0.0],
      ["46", 0.0],
      ["50", 0.0],
      ["52", 0.0],
      ["53", 0.0],
      ["54", 0.0],
      ["55", 0.0],
      ["57", 0.0],
      ["58", 0.0],
      ["59", 0.0],
      ["61", 0.0],
      ["62", 0.0],
      ["63", 0.0],
    ],
    recent_games: [],
  };
  const [apiData, setApiData] = React.useState(null);
  const [userNotFound, setUserNotFound] = React.useState(false);
  useEffect(() => {
    fetch("https://ecranked.ddns.net/user/" + username + "/stats.json")
      .then(async (response) => {
        const data = await response.json();
        console.log("code:" + response.statusCode);
        if (response.status === 404) {
          console.error("User not found!");
          setUserNotFound(true);
        } else {
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          setApiData(data);
          setUserNotFound(false);
        }
      })
      .catch((error) => {
        setUserNotFound(true);
        console.error("There was an error!", error);
      });
  }, [username]);

  function WhatApiRequest() {
    console.log("APIDATA");

    console.log(apiData);
    if (userNotFound) {
      return EMPTYREQUEST;
    }
    if (apiData) {
      return apiData;
    }

    return EMPTYREQUEST;
  }

  console.log("userNotFound", userNotFound);
  return (
    <>
      <FailedSearchBar shown={userNotFound} onFormSubmit={whenSearchSubmit} />
      <UserBody
        style={
          userNotFound ? { height: "0px", margin: "0px", opacity: "0%" } : {}
        }
      >
        <RecentGames replays={WhatApiRequest()["recent_games"]} />
        <CenterColumn userData={WhatApiRequest()} />
        <AboutMe userData={WhatApiRequest()} />
      </UserBody>
    </>
  );
}
