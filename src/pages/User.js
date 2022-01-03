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
  border: 1px solid white;
  border-radius: 10px;
`;

const LoadoutBoxStyle = styled.div`
  justify-content: center;
  padding: 10px 10px 10px;
  margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid white;
  border-radius: 10px;
  flex: 60px 1;
  font-size: 11px;
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
  let displayNumber = Math.round(frequency * 10000) / 100;
  // if (displayNumber === 100) {
  //   displayNumber = 99.999;
  // }
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
        {displayNumber + "%"}{" "}
      </LoadoutBoxItemStyle>
    </LoadoutBoxStyle>
  );
};
const LoadoutExpandButtonStyle = styled.div`
  border: 1px solid white;
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
  margin: 1px;
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
  border: 1px solid white;
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
  border: 1px solid white;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 0px 10px;
`;
const UserStats = ({ userData, statChoice }) => {
  const userStats = userData[statChoice];
  return (
    <UserStatsStyle>
      <ContainerTitle>Stats</ContainerTitle>

      <UserStat
        name={"Total Games"}
        displayValue={userStats["total_games"]}
        value={1}
      />
      <UserStat
        name={"Total Deaths"}
        displayValue={userStats["total_deaths"]}
        value={1}
      />
      <UserStat
        name={"Average Ping"}
        displayValue={userStats["average_ping"].toFixed(1) + "ms"}
        value={map_range(userStats["average_ping"], 0, 200, 0, 1)}
      />
      <UserStat
        name={"Average Speed"}
        displayValue={userStats["average_speed"].toFixed(2) + "m/s"}
        value={map_range(userStats["average_speed"], 0, 5, 0, 1)}
      />
      <UserStat
        name={"Time Stopped"}
        displayValue={(userStats["percent_stopped"] * 100).toFixed(1) + "%"}
        value={userStats["percent_stopped"]}
      />
      <UserStat
        name={"Inverted"}
        displayValue={(userStats["percent_upsidedown"] * 100).toFixed(1) + "%"}
        value={userStats["percent_upsidedown"]}
      />
      <UserStat
        name={"Deaths/game"}
        displayValue={userStats["average_deaths"].toFixed(1)}
        value={map_range(userStats["average_deaths"], 0, 15, 0, 1)}
      />
      <UserStat
        name={"Crash/Leave"}
        displayValue={(userStats["percent_crash"] * 100).toFixed(2) + "%"}
        value={userStats["percent_crash"]}
      />
      <UserStat
        name={"Level"}
        displayValue={userData["level"]}
        value={map_range(userData["level"], 0, 50, 0, 1)}
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
const StatChoiceStyle = styled.div`
  margin: 20px 10px 0px;
  padding: 0px;
  background-color: #222;
  color: white;
  float: left;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 0px 10px;
`;
const StatChoiceButton = styled.div`
  padding: 10px 10px 0px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid white;
  border-radius: 10px;
  gap: 0px 10px;
  flex-grow: 1;
  text-align: center;
  height: 20px;
  &:hover {
    background-color: #555;
    color: #000;
  }
  cursor: pointer;
  line-height: 20px;
`;
const StatChoice = ({ currentSelected, onClick }) => {
  return (
    <StatChoiceStyle>
      <StatChoiceButton
        style={
          currentSelected === "weekly_stats" ? { backgroundColor: "#333" } : {}
        }
        onClick={() => {
          onClick("weekly_stats");
        }}
      >
        7 Days
      </StatChoiceButton>
      <StatChoiceButton
        style={currentSelected === "stats" ? { backgroundColor: "#333" } : {}}
        onClick={() => {
          onClick("stats");
        }}
      >
        All time
      </StatChoiceButton>
    </StatChoiceStyle>
  );
};
const CenterColumn = ({ userData }) => {
  const [statChoice, setStatChoice] = useState("stats");

  return (
    <CenterColumnStyle>
      <StatChoice
        currentSelected={statChoice}
        onClick={(table) => {
          setStatChoice(table);
        }}
      />
      <UserStats userData={userData} statChoice={statChoice} />
      <Loadout
        top_loadout={
          userData[statChoice]["top_loadout"]
            ? userData[statChoice]["top_loadout"]
            : []
        }
      />
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
  margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid white;
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
        const LocalGameTime = moment.unix(replay["start_time"]); // Assumes seconds.  Defaults to local time
        const UtcGameTime = moment.unix(replay["start_time"]).utc(); // Must be separate object b/c utc() just sets a flag
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
  border: 1px solid white;
  border-radius: 10px;
  flex: 100px 2;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const EditTextButtonStyle = styled.div`
  color: #888;
  font-size: 10px;
`;
const EditButtonsStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;
const EditButtonStyle = styled.div`
  color: #aaa;
  font-size: 15px;
  cursor: pointer;
`;

const AboutStringBox = ({ userData, oculus_id }) => {
  var is_editable = false;
  if (oculus_id == null) {
    is_editable = false;
  }
  // eslint-disable-next-line
  if (oculus_id == parseInt(userData["oculus_id"])) {
    is_editable = true;
  }
  // eslint-disable-next-line
  if (localStorage.getItem("MODERATOR") == 1) {
    is_editable = true;
  }
  console.log(
    "[TEST] " +
      oculus_id +
      "   " +
      parseInt(userData["oculus_id"]) +
      "    " +
      is_editable
  );
  const updateIsEdit = (e, value = "null") => {};
  const [currentText, setCurrentText] = useState(userData["about_string"]);
  const [editing, setEditing] = useState(false);

  const onClickSubmit = () => {
    if (currentText.length > 200) {
      return;
    }

    const authToken = localStorage.getItem("AUTHORIZATION_TOKEN");

    const requestOptions = {
      method: "PUT",
      headers: { Authorization: authToken, "Content-Type": "application/json" },
      body: JSON.stringify({ about_string: currentText }),
    };
    console.log({ about_string: currentText });

    fetch(
      "https://ecranked.ddns.net/api/v1/user/" + userData["oculus_id"],
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload(false);
      });
  };
  if (editing) {
    return (
      <>
        <textarea
          style={{
            backgroundColor: "transparent",
            // border: "none",
            outline: "none",
            color: "#fff",
            fontSize: "18px",
            padding: "8px",
            fontFamily: "Montserrat",
            flexGrow: 1,
            minWidth: "120px",
            // f: "Montserrat", sans-serif,
          }}
          type="textarea"
          name="userName"
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          onBlur={updateIsEdit}
        />
        <EditButtonsStyle>
          <EditButtonStyle
            onClick={() => {
              setEditing(false);
            }}
          >
            Discard
          </EditButtonStyle>

          <EditButtonStyle onClick={onClickSubmit}>Save</EditButtonStyle>
        </EditButtonsStyle>
      </>
    );
  } else {
    if (is_editable) {
      return (
        <>
          <div style={{ whiteSpace: "pre-wrap" }}>
            {userData["about_string"]}
          </div>
          <EditButtonStyle
            onClick={() => {
              setCurrentText(userData["about_string"]);
              setEditing(true);
            }}
          >
            Edit
          </EditButtonStyle>
        </>
      );
    } else {
      if (oculus_id == null) {
        return (
          <>
            <div style={{ whiteSpace: "pre-wrap" }}>
              {userData["about_string"]}
            </div>
            <EditTextButtonStyle>
              Login to change your aboutMe
            </EditTextButtonStyle>
          </>
        );
      } else {
        return (
          <>
            <div>{userData["about_string"]}</div>
          </>
        );
      }
    }
  }
};

const AvatarStyle = styled.img`
  // min-height: 100%;
  width: 100%;
  height: auto;
  min-width: 0;
`;
const FileUploadButton = ({ userData }) => {
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append("image", selectedFile);

    fetch(
      "https://ecranked.ddns.net/api/v1/user/" +
        userData["oculus_id"] +
        "/avatar",
      {
        method: "POST",
        body: formData,
        headers: { Authorization: localStorage.getItem("AUTHORIZATION_TOKEN") },
      }
    )
      .then((response) => response.json())

      .then((result) => {
        console.log("Success:", result);
        window.location.reload(false);
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />

      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );
};
const ModeratorAvatarControls = ({ userData }) => {
  const onApprove = () => {
    fetch(
      "https://ecranked.ddns.net/api/v1/user/" +
        userData["oculus_id"] +
        "/avatar",
      {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approve: true }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload(false);
      });
  };
  const onRemove = () => {
    fetch(
      "https://ecranked.ddns.net/api/v1/user/" +
        userData["oculus_id"] +
        "/avatar",
      {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approve: false }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload(false);
      });
  };
  return (
    <EditButtonsStyle>
      <EditButtonStyle onClick={onRemove}>Remove</EditButtonStyle>

      {userData["avatar_pending"] ? (
        <EditButtonStyle onClick={onApprove}>Approve</EditButtonStyle>
      ) : (
        <></>
      )}
    </EditButtonsStyle>
  );
};
const AvatarControls = ({ moderator, userData, oculus_id }) => {
  // eslint-disable-next-line
  var ownPage = oculus_id == userData["oculus_id"];
  var avatar = userData["avatar"];
  // var pending = userData["avatar_pending"];

  return (
    <>
      {moderator && avatar ? (
        <ModeratorAvatarControls userData={userData} />
      ) : (
        <> </>
      )}
      {ownPage ? <FileUploadButton userData={userData} /> : <> </>}
    </>
  );
  // return <></>;
};
const AboutAvatar = ({ userData, oculus_id }) => {
  var avatar = userData["avatar"];

  // var pending = userData["avatar_pending"];
  var isModerator = false;

  // eslint-disable-next-line
  if (localStorage.getItem("MODERATOR") == 1) {
    isModerator = true;
  }
  console.log(userData);
  if (avatar) {
    return (
      <>
        <AvatarStyle src={avatar} />
        {/* <EditButtonsStyle>
          <EditButtonStyle
            onClick={() => {
              setEditing(false);
            }}
          >
            Discard
          </EditButtonStyle>

          <EditButtonStyle onClick={onClickSubmit}>Save</EditButtonStyle>
        </EditButtonsStyle> */}
        <AvatarControls
          moderator={isModerator}
          userData={userData}
          oculus_id={oculus_id}
        />
      </>
    );
  } else {
    return (
      <>
        <AvatarControls
          moderator={isModerator}
          userData={userData}
          oculus_id={oculus_id}
        />
      </>
    );
  }
};
const AboutMe = ({ userData }) => {
  const oculus_id = localStorage.getItem("OCULUS_ID");

  return (
    <AboutMeStyle>
      <div>
        <AboutMeTitle>About Me</AboutMeTitle>
      </div>

      <AboutStringBox userData={userData} oculus_id={oculus_id} />
      <AboutAvatar userData={userData} oculus_id={oculus_id} />
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

const ContainerTitle = styled.div`
  font-size: 36px;
  font-weight: 400;
  margin: 10px 0px;
  text-align: center;
  flex: 0 0 100%;
  color: #fff;
  flex-grow: 0;
`;

const AboutMeTitle = styled.div`
  font-size: 36px;
  font-weight: 400;
  margin: 10px 0px;
  text-align: center;
  flex: 0 0 100%;
  color: #fff;
  flex-grow: 0;
  flex-shrink: 0;
`;
const autoCompleteBox = styled.form`
  border: 1px solid white;
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
  border-width: 1px
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
  font-size: 41px;
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
              border: "1px solid #fff",
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

export default function User({ username, setBannerCallback, subDomain }) {
  let history = useHistory();
  const whenSearchSubmit = (text) => {
    console.log(text);
    history.push("/user/" + text + "/stats");
    //Change url without reloading: /user/{text}/stats
  };

  const EMPTYREQUEST = {
    discord_name: null,
    discord_pfp: null,
    recent_games: [],
    about_string: null,
    stats: {
      average_speed: 0,
      average_ping: 0,
      percent_stopped: 0,
      percent_upsidedown: 0,
      total_games: 0,
      total_deaths: 0,
      average_deaths: 0,
      top_loadout: [],
    },
    weekly_stats: {
      average_speed: 0,
      average_ping: 0,
      percent_stopped: 0,
      percent_upsidedown: 0,
      total_games: 0,
      total_deaths: 0,
      average_deaths: 0,
      top_speed: 0,
      percent_left: 0,
      percent_right: 0,

      top_loadout: [],
    },
    daily_stats: {
      average_speed: 0,
      average_ping: 0,
      percent_stopped: 0,
      percent_upsidedown: 0,
      total_games: 0,
      total_deaths: 0,
      average_deaths: 0,
      top_speed: 0,
      percent_left: 0,
      percent_right: 0,
      top_loadout: [],
    },
    test: {},
  };
  const [apiData, setApiData] = React.useState(null);
  const [userNotFound, setUserNotFound] = React.useState(false);

  useEffect(() => {
    fetch("https://ecranked.ddns.net/api/v1/user/" + username, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
        "Content-Type": "application/json",
      },
    })
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
          if ("oculus_name" in data) {
            setUserNotFound(false);
            setBannerCallback(data["oculus_name"]);
            console.log(data["oculus_name"]);
            setApiData(data);
          } else {
            setBannerCallback("Unknown");
            setUserNotFound(true);
          }
        }
      })
      .catch((error) => {
        setUserNotFound(true);
        console.error("There was an error!", error);
      });
  }, [username, setBannerCallback]);

  function WhatApiRequest() {
    console.log("APIDATA");

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
