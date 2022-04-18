import styled from "styled-components";
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Container = styled.div`
  position: relative;
  padding: 10px 10px 10px;
  margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  flex: 200px 12;
`;
const ContainerTitle = styled.h2`
  font-size: 36px;
  font-weight: 400;
  margin: 10px 0px;
  text-align: center;
  flex: 0 0 100%;
  color: #fff;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  background-color: #333;
  padding: 7px;
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
`;

const UserListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 100px 1;
  // margin-top: 30px;
`;

const UserColor = styled.div`
  display: flex;
  align-items: center;
  background-color: #333;
  padding: 7px;
  text-decoration: none;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  &:hover {
    background-color: #555;
    color: #000;
  }
  cursor: pointer;
  height: 40.5px;
  box-sizing: border-box;
`;

const UserColorListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 33px;
`;
const UserColorList = ({
  users,
  animationIndex,
  currentSelected,
  onClick,
  onHover,
}) => {
  // console.log("USR LIST", users);

  let OrangeTeamStartID = -1;
  function getUserColorStyle(user) {
    let BorderColor = "rgb(65, 160, 228)";
    // console.log(user["team"]);
    switch (user["team"]) {
      case 0:
        BorderColor = "rgb(65, 160, 228)";
        break;
      case 1:
        BorderColor = "rgb(230, 167, 50)";
        break;
      default:
        BorderColor = "rgb(255, 255, 255)";
        break;
    }

    var backgroundColor = {};
    if (user["playerid"] === currentSelected) {
      backgroundColor = { backgroundColor: "#333" };
    }
    return {
      borderColor: BorderColor,
      ...backgroundColor,
    };
  }
  return (
    <UserColorListStyle>
      {users.map((user, index) => {
        if (index >= animationIndex) {
          return null;
        }

        if (user["team"] === 1 && OrangeTeamStartID === -1) {
          OrangeTeamStartID = index;
        }
        return (
          <UserColor
            key={user["userid"]}
            onClick={() => {
              onClick(user["userid"]);
            }}
            onMouseEnter={() => {
              onHover(user["userid"]);
            }}
            onMouseLeave={() => {
              onHover(null);
            }}
            style={getUserColorStyle(user)}
          >
            <div
              style={{
                backgroundColor:
                  user["team"] === 0
                    ? BlueColors[index]
                    : OrangeColors[index - OrangeTeamStartID],
                width: "15px",
                height: "15px",
                marginLeft: "auto",
                borderRadius: "100px",
                border: "none",
                overflow: "hidden",
              }}
            ></div>
          </UserColor>
        );
      })}
    </UserColorListStyle>
  );
};
const UserList = ({ users, animationIndex }) => {
  // console.log("USR LIST", users);
  let history = useHistory();

  function userClick(username) {
    history.push("/user/" + username + "/stats");
  }
  let OrangeTeamStartID = -1;
  return (
    <UserListStyle>
      {users.map((user, index) => {
        if (index >= animationIndex) {
          return null;
        }
        const onUserClick = () => {
          userClick(user["name"]);
        };
        if (user["team"] === 1 && OrangeTeamStartID === -1) {
          OrangeTeamStartID = index;
        }
        return (
          <User
            key={user["userid"]}
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
          </User>
        );
      })}
    </UserListStyle>
  );
};

const TimelineSubStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  flex: 200px 8;
`;

const TimelineHeaderBarMinuteMarkers = styled.div`
  position: absolute;
  height: 75%;
  width: 5px;
  bottom: 0px;
  background: #555;
  border-radius: 10px;
  border: none;
`;
const TimelineHeaderBarMinuteMarkersText = styled.div`
  position: absolute;
  height: 100%;
  bottom: 0px;
  background: #5550;
  padding-left: 10px;
`;
const TimelineHeaderBarStyle = styled.div`
  position: relative;
  background: #333;
  border-radius: 10px;
  border: none;

  height: 25px;
  box-sizing: border-box;
`;

const TimelineHeaderBar = ({ api_data }) => {
  // console.log(api_data["match_length"]);
  var minutePoints = [];
  for (let index = 0; index < api_data["match_length"]; index += 60) {
    minutePoints.push(index / api_data["match_length"]);
  }
  // console.log("120 ", minutePoints);
  return (
    <TimelineHeaderBarStyle>
      {minutePoints.map((point, index) => {
        if (index === 0) {
          return (
            <TimelineHeaderBarMinuteMarkers
              style={{
                left: `${point * 100}%`,
              }}
            />
          );
        }
        return (
          <>
            <TimelineHeaderBarMinuteMarkers
              style={{
                left: `${point * 100}%`,
              }}
            />
            <TimelineHeaderBarMinuteMarkersText
              style={{
                left: `${point * 100}%`,
              }}
            >
              {index + " min"}
            </TimelineHeaderBarMinuteMarkersText>
          </>
        );
      })}
    </TimelineHeaderBarStyle>
  );
};

const TimelineUserList = ({ users, api_data, animationIndex }) => {
  // console.log(api_data["total_frames"]);
  return (
    <TimelineSubStyle>
      <TimelineHeaderBar api_data={api_data} />
      {users.map((user, index) => {
        if (index >= animationIndex) return null;
        return <TimelineUserItem user={user} api_data={api_data} />;
      })}
    </TimelineSubStyle>
  );
};
const TimelineUserItemStyle = styled.div`
  position: relative;
  align-items: center;
  background-color: #222;
  text-decoration: none;
  #border: 1px solid rgb(70, 70, 70);

  line-height: 0;
  font-size: 15px;
  line-height: 1.5;

  cursor: pointer;
  height: 40.5px;
  // overflow: hidden;
`;
const TimeLineItemActiveBar = styled.div`
  background-color: #333;
  width: 100%;
  height: 100%;
  #height: 32px;
  overflow: hidden;
  border-radius: 10px;
  border: none;
`;
const DeathBar = styled.div`
  position: absolute;
  top: 34px;
  background-color: #f44;
  width: 0.5%;
  height: 10px;
  border: 0px solid red;
  border-radius: 10px;
  height: 3px;
  overflow: hidden;
`;
const GetDeathPoints = ({ user, api_data }) => {
  const totalFrames = api_data["frames"];
  let TotalListOfElements = [];
  for (
    let index = 0;
    index < user["framestamps"]["in_bounds"].length;
    index++
  ) {
    var width = 0.005;

    var startFrame = 0;
    var endFrame = 100;
    if (!user["framestamps"]["in_bounds"][index][1]) {
      //If the in_bound point is false
      if (user["framestamps"]["in_bounds"].length === index + 1) {
        // On the last deathPoint
        endFrame = user["startFrame"] + user["stats"]["total_frames"];
      } else {
        // console.log(user["framestamps"]);
        endFrame = user["framestamps"]["in_bounds"][index + 1][0];
      }
      startFrame = user["framestamps"]["in_bounds"][index][0];
      // AT THE LAST DEATH
      // startFrame = 100;
      // endFrame = 600;
      width = (endFrame - startFrame) / totalFrames;

      const transformPercentageHorisontal =
        (startFrame / totalFrames) * 100 * (1 / width);

      TotalListOfElements.push(
        <DeathBar
          style={{
            width: `${width * 100}%`,
            transform: `translate(${transformPercentageHorisontal}%,0%)`,
          }}
        />
      );
    }
  }
  TotalListOfElements.pop();
  return TotalListOfElements.map((element) => {
    return element;
  });
};
const LoadoutBarItemStyle = styled.div`
  position: absolute;
  top: 2px;
  left: 0px;
  background-color: #444;
  height: 20px;
  width: 0.5%;
  height: 10px;
  border: 0px solid red;
  border-radius: 5px;
  height: 3px;
  height: 28px;
  &:hover {
    background-color: #555;
    color: #000;
  }
`;
const LoadoutImage = ({ number }) => {
  const tacMod = number % 4;
  const ordinance = ((number - tacMod) % 16) / 4;
  const weapon = ((number - (tacMod + ordinance * 4)) % 64) / 16;

  const tacModMap = [
    "repair_matrix.png",
    "threat_scanner.png",
    "energy_barrier.png",
    "phaseshift.png",
  ];
  const ordinanceMap = [
    "detonator.png",
    "stun_field.png",
    "arcmine.png",
    "instant_repair.png",
  ];
  const weaponMap = [
    "pulsar.png",
    "nova.png",
    "comet.png",
    "meteor.png",
  ];

  return (
    <>
      <img
        src={"/images/icons/"+weaponMap[weapon]}
        alt={"weapon"}
        style={{ justifyContent: "center", width: "15px", height: "15px" }}
      ></img>
      <img
        src={"/images/icons/"+ordinanceMap[ordinance]}
        alt={"ordinance"}
        style={{ justifyContent: "center", width: "15px", height: "15px" }}
      ></img>
      <img
        src={"/images/icons/"+tacModMap[tacMod]}
        alt={"tacMod"}
        style={{ justifyContent: "center", width: "15px", height: "15px" }}
      ></img>
    </>
  );
};
const LoadoutBarSelectedDivStyle = styled.div`
  color: white;
  background-color: #444;
  position: absolute;
  width: 200px;
  height: 150px;
  bottom: 100%;
  border: 2px solid #555;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;
const LoadoutBarSelected = ({ number, onHover }) => {
  const tacMod = number % 4;
  const ordinance = ((number - tacMod) % 16) / 4;
  const weapon = ((number - (tacMod + ordinance * 4)) % 64) / 16;

  const tacModMap = [
    "repair_matrix.png",
    "threat_scanner.png",
    "energy_barrier.png",
    "phaseshift.png",
  ];
  const ordinanceMap = [
    "detonator.png",
    "stun_field.png",
    "arcmine.png",
    "instant_repair.png",
  ];
  const weaponMap = [
    "pulsar.png",
    "nova.png",
    "comet.png",
    "meteor.png",
  ];
  const tacModMapName = [
    "Repair Matrix",
    "Threat Scanner",
    "Energy Barrier",
    "Phaseshift",
  ];
  const ordinanceMapName = [
    "Detonator",
    "Stun Field",
    "Arcmine",
    "Instant Repair",
  ];
  const weaponMapName = ["Pulsar", "Nova", "Comet", "Meteor"];

  return (
    <LoadoutBarSelectedDivStyle onMouseEnter={onHover}>
      <p style={{ margin: "0px" }}>
        <img
          src={"/images/icons/"+weaponMap[weapon]}
          alt={"weapon"}
          style={{ justifyContent: "center", width: "40px", height: "40px" }}
        />
        {weaponMapName[weapon]}
      </p>
      <p style={{ margin: "0px" }}>
        <img
          src={"/images/icons/"+ordinanceMap[ordinance]}
          alt={"ordinance"}
          style={{ justifyContent: "center", width: "40px", height: "40px" }}
        />
        {ordinanceMapName[ordinance]}
      </p>
      <p style={{ margin: "0px" }}>
        <img
          src={"/images/icons/"+tacModMap[tacMod]}
          alt={"tacMod"}
          style={{ justifyContent: "center", width: "40px", height: "40px" }}
        />
        {tacModMapName[tacMod]}
      </p>
    </LoadoutBarSelectedDivStyle>
  );
};
const LoadoutBarItem = ({ width, transformHorisontal, loadoutNumber }) => {
  const [onHovered, setOnHovered] = useState(false);
  var HoveredObject = null;

  if (onHovered) {
    HoveredObject = (
      <LoadoutBarSelected
        number={loadoutNumber}
        onHover={() => {
          setOnHovered(false);
        }}
      />
    );
  }
  return (
    <LoadoutBarItemStyle
      // style={{ width: `${width * 100}%` }}
      style={{
        width: `${width * 100}%`,
        left: `${transformHorisontal}%`,
      }}
      onMouseEnter={() => {
        console.log("Twe");

        setOnHovered(true);
      }}
      onMouseLeave={() => {
        setOnHovered(false);
      }}
    >
      <LoadoutImage number={loadoutNumber} />
      {HoveredObject}
    </LoadoutBarItemStyle>
  );
};
const LoadoutBar = ({ user, api_data }) => {
  let LoadoutBarItems = [];
  for (let index = 0; index < user["framestamps"]["loadout"].length; index++) {
    // console.debug(user["framestamps"]["loadout"][index][0]);
    const startFrame = user["framestamps"]["loadout"][index][0];
    // console.debug(startFrame);

    var endFrame = user["stats"]["total_frames"] + user["startFrame"];
    if (index + 1 < user["framestamps"]["loadout"].length) {
      endFrame = user["framestamps"]["loadout"][index + 1][0];
    }
    const totalFrames = api_data["frames"];
    const width = (endFrame - startFrame) / totalFrames;
    const transformPercentageHorisontal = (startFrame / totalFrames) * 100;

    LoadoutBarItems.push(
      <LoadoutBarItem
        width={width}
        transformHorisontal={transformPercentageHorisontal}
        loadoutNumber={user["framestamps"]["loadout"][index][1]}
      />
    );
  }

  return LoadoutBarItems.map((element) => {
    return element;
  });
};

const TimelineUserItem = ({ user, api_data }) => {
  const startFrame = user["startFrame"];
  const totalFrames = api_data["frames"];
  const totalWidth = user["stats"]["total_frames"] / totalFrames;
  const startPercentage = (startFrame / totalFrames) * (1 / totalWidth);

  return (
    <TimelineUserItemStyle>
      <TimeLineItemActiveBar
        style={{
          width:
            (100 * user["stats"]["total_frames"]) / api_data["frames"] + "%",
          transform: `translate(${startPercentage * 100}%,0)`,
        }}
      />
      <GetDeathPoints user={user} api_data={api_data} />
      <LoadoutBar user={user} api_data={api_data} />
    </TimelineUserItemStyle>
  );
};
const OrangeColors = [
  "#ff0022",
  "#f7ff0a",
  "#f56600",
  "#a3005c",
  "#ffbc42",
  "#f9c8d1",
  "#ffffff",
  "#ed31b8",
  "#fface4",
];
const BlueColors = [
  "#0932ec",
  "#36a0fc",
  "#cf14f5",
  "#14fff7",
  "#1c8487",
  "#12f840",
  "#0ad2ff",
  "#810efb",
  "#3b21c0",
];
const StatChoiceStyle = styled.div`
  padding: 0px;
  background-color: #222;
  color: white;
  float: left;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 0px 10px;
  width: 100%;
  box-sizing: border-box;
`;
const StatChoiceButton = styled.div`
  // padding: 10px 10px 0px;
  padding: auto;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  flex-grow: 1;
  text-align: center;
  &:hover {
    background-color: #555;
    color: #000;
  }
  cursor: pointer;
  // line-height: 20px;
  height: 25px;
  box-sizing: border-box;
`;
const StatChoice = ({ currentSelected, onClick }) => {
  return (
    <StatChoiceStyle>
      <StatChoiceButton
        style={
          currentSelected === "timeline" ? { backgroundColor: "#333" } : {}
        }
        onClick={() => {
          onClick("timeline");
        }}
      >
        Timeline
      </StatChoiceButton>
      <StatChoiceButton
        style={
          currentSelected === "snapshot" ? { backgroundColor: "#333" } : {}
        }
        onClick={() => {
          onClick("snapshot");
        }}
      >
        Snapshot
      </StatChoiceButton>
    </StatChoiceStyle>
  );
};
const HeatmapSelectionChoice = ({ currentSelected, onClick, onHover }) => {
  return (
    <StatChoiceStyle>
      <StatChoiceButton
        style={currentSelected === "blue" ? { backgroundColor: "#333" } : {}}
        onClick={() => {
          onClick("blue");
        }}
        onMouseEnter={() => {
          onHover("blue");
        }}
        onMouseLeave={() => {
          onHover(null);
        }}
      >
        Blue
      </StatChoiceButton>
      <StatChoiceButton
        style={currentSelected === "all" ? { backgroundColor: "#333" } : {}}
        onClick={() => {
          onClick("all");
        }}
        onMouseEnter={() => {
          onHover("all");
        }}
        onMouseLeave={() => {
          onHover(null);
        }}
      >
        All
      </StatChoiceButton>
      <StatChoiceButton
        style={currentSelected === "orange" ? { backgroundColor: "#333" } : {}}
        onClick={() => {
          onClick("orange");
        }}
        onMouseEnter={() => {
          onHover("orange");
        }}
        onMouseLeave={() => {
          onHover(null);
        }}
      >
        Orange
      </StatChoiceButton>
    </StatChoiceStyle>
  );
};
export const Timeline = ({ skimData }) => {
  const [animationIndex, setAnimationIndex] = useState(0);
  const [userList, setUserList] = useState(null);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [updatedUsernamesPromises, setUpdatedUsernamesPromises] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [selectedOption, setSelectedOption] = useState("snapshot");
  const [heatmapSelectedOption, setHeatmapSelectedOption] = useState("all");
  const [heatmapHoveredOption, setHeatmapHoveredOption] = useState(null);

  const imageRef = useRef();

  //set userList
  useEffect(() => {
    console.log("SkimData 413", skimData);
    async function startApiCalls() {
      setUserList(
        [...skimData["players"]].sort((users1, users2) => {
          return users1.team - users2.team;
        })
      );
    }
    if (skimData) startApiCalls();
  }, [skimData]);

  //get updates usernames
  useEffect(() => {
    console.log(userList);
    async function startApiCalls() {
      setUpdatedUsernamesPromises(
        userList.map((user) => {
          return fetch(
            "https://ecranked.ddns.net/api/v1/user/" + user["userid"]
          ).then(async (response) => {
            const data = await response.json();
            if (response.status === 404) {
            } else {
              if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
              }
              return data;
            }
          });
        })
      );
    }
    if (userList !== null) startApiCalls();
  }, [userList]);
  //start animation
  useEffect(() => {
    async function loadInReplayAnimation() {
      for (var i = 0; i < userList.length; i++) {
        setAnimationIndex((prev) => prev + 1);
        await delay(20);
      }
      //console.log("Finished Animation", userList);
      setAnimationFinished(true);
    }
    if (userList !== null) loadInReplayAnimation();
  }, [skimData, userList]);

  //update all names
  useEffect(() => {
    console.log("Updating names");
    async function updateAllNames() {
      //Wait for all API returns
      var updatedUsernames = await Promise.all(updatedUsernamesPromises);
      //Update the usernames
      setUserList((prev) => {
        return prev
          .map((element, index) => {
            return {
              ...element,
              name: updatedUsernames[index].oculus_name,
            };
          })
          .sort((users1, users2) => {
            return users1.team - users2.team;
          });
      });
    }
    if (animationFinished) {
      updateAllNames();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationFinished]);

  if (userList === null) return null;

  return (
    <Container>
      <ContainerTitle>
        <span style={{ float: "left" }}>
          {skimData["map"].charAt(0).toUpperCase() + skimData["map"].slice(1)}
        </span>
        Game over time{" "}
        <p
          style={{
            position: "absolute",
            right: "20px",
            fontSize: "20px",
            top: "0px",
          }}
        >
          red: deaths
        </p>
      </ContainerTitle>
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <StatChoice
              currentSelected={selectedOption}
              onClick={setSelectedOption}
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <UserColorList
              users={userList}
              animationIndex={animationIndex}
              currentSelected={heatmapSelectedOption}
              onClick={(value) => {
                if (Array.isArray(heatmapSelectedOption)) {
                  if (heatmapSelectedOption.includes(value)) {
                    const index = heatmapSelectedOption.indexOf(value);
                    if (index > -1) {
                      heatmapSelectedOption.splice(index, 1); // 2nd parameter means remove one item only
                    }
                    setHeatmapSelectedOption(heatmapSelectedOption);
                  } else {
                    setHeatmapSelectedOption([...heatmapSelectedOption, value]);
                  }
                } else {
                  setHeatmapSelectedOption([value]);
                }
              }}
              onHover={setHeatmapHoveredOption}
            />
            <UserList users={userList} animationIndex={animationIndex} />
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", flexGrow: 1 }}>
          {selectedOption === "timeline" ? (
            <TimelineUserList
              users={userList}
              animationIndex={animationIndex}
              api_data={skimData}
            />
          ) : (
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <HeatmapSelectionChoice
                currentSelected={heatmapSelectedOption}
                onClick={setHeatmapSelectedOption}
                onHover={setHeatmapHoveredOption}
              />
              {animationFinished ? (
                <Heatmap
                  imageRef={imageRef}
                  skimData={skimData}
                  heatmapSelectedOption={heatmapSelectedOption}
                  heatmapHoveredOption={heatmapHoveredOption}
                />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};
const Heatmap = ({
  imageRef,
  skimData,
  heatmapSelectedOption,
  heatmapHoveredOption,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const [heatmapHighres, setHeatmapHighres] = useState(false);
  const [targetHeatmapHighres, setTargetHeatmapHighres] = useState(false);

  const imageZoomRef = useRef();
  const imageContainerZoomRef = useRef();

  const [imageLoadedFirstTime, setImageLoadedFirstTime] = useState(false);
  const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(false);
  const [backgroundImageLoadedFirstTime, setBackgroundImageLoadedFirstTime] =
    useState(false);

  const [backgroundMapHighres, setBackgroundMapHighres] = useState(false);
  const [backgroundMapHighresLoaded, setBackgroundMapHighresLoaded] =
    useState(false);

  const [smallestZoom, setSmallestZoom] = useState(0);
  useEffect(() => {
    if (imageLoaded) {
      setHeatmapHighres(targetHeatmapHighres);
    }
  }, [imageLoaded, targetHeatmapHighres, setHeatmapHighres]);

  useEffect(() => {
    if (backgroundImageLoaded) {
      setBackgroundMapHighres(targetHeatmapHighres);
    }
  }, [backgroundImageLoaded, targetHeatmapHighres, setBackgroundMapHighres]);
  useEffect(() => {
    if (!imageLoadedFirstTime) return;
    if (!backgroundImageLoadedFirstTime) return;
    var targetWidth = imageRef.current.offsetWidth;
    var targetHeight = imageRef.current.offsetHeight;

    var parentWidth = imageContainerZoomRef.current.offsetWidth;
    var parentHeight = imageContainerZoomRef.current.offsetHeight;

    console.log("targetWidth", targetWidth);
    console.log("targetHeight", targetHeight);
    console.log("parentWidth", parentWidth);
    console.log("parentHeight", parentHeight);
    var finalWidth = targetWidth;
    var finalHeight = targetHeight;
    var decreasePercentage = 0;
    var finalScale = 1;
    if (finalWidth >= parentWidth) {
      decreasePercentage = parentWidth / finalWidth;
      finalWidth *= decreasePercentage;
      finalHeight *= decreasePercentage;
      finalScale *= decreasePercentage;
    }
    if (finalHeight >= parentHeight) {
      decreasePercentage = parentHeight / finalHeight;
      finalWidth *= decreasePercentage;
      finalHeight *= decreasePercentage;
      finalScale *= decreasePercentage;
    }

    imageZoomRef.current.setTransform(
      (parentWidth - finalWidth) / 2,
      (parentHeight - finalHeight) / 2,
      finalScale,
      0,
      0
    );
    setSmallestZoom(finalScale);
  }, [imageLoadedFirstTime, imageRef, backgroundImageLoadedFirstTime]);

  return (
    <div
      style={{
        flexGrow: 1,
        border: "1px solid rgb(70, 70, 70)",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        ref={imageContainerZoomRef}
      >
        <TransformWrapper
          onZoom={(e) => {
            // eslint-disable-next-line
            if (targetHeatmapHighres != e.state.scale > 2) {
              setImageLoaded(false);
              setBackgroundImageLoaded(false);
              setTargetHeatmapHighres(e.state.scale > 2);
            }
          }}
          minScale={smallestZoom}
          initialScale={1}
          limitToBounds={false}
          // centerOnInit={true}
          initialPositionX={0}
          initialPositionY={0}
          ref={imageZoomRef}
        >
          <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
            <div style={{ position: "relative" }}>
              <img
                alt={""}
                onLoad={() => {
                  setBackgroundImageLoadedFirstTime(true);
                  setBackgroundImageLoaded(true);
                  if (targetHeatmapHighres) {
                    setBackgroundMapHighresLoaded(true);
                  }
                  console.log("Background Image Loaded");
                }}
                ref={imageRef}
                style={
                  backgroundMapHighres || backgroundMapHighresLoaded
                    ? {
                        transformOrigin: "top left",
                        transform: "scale(20%)",
                        // width: "scale(5)",
                        // transform: "scale(5)",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }
                    : {
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }
                }
                src={`https://ecranked.ddns.net/public/${
                  skimData["map"]
                }_minimap_${
                  targetHeatmapHighres || backgroundMapHighresLoaded
                    ? "highres"
                    : "lowres"
                }.png`}
              ></img>

              {(() => {
                if (Array.isArray(heatmapSelectedOption)) {
                  return heatmapSelectedOption.map((value) => {
                    return (
                      <img
                        alt={""}
                        onLoad={() => {
                          setImageLoadedFirstTime(true);
                          setImageLoaded(true);
                        }}
                        style={
                          heatmapHighres
                            ? {
                                transformOrigin: "top left",
                                transform: "scale(20%)",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                // width: "scale(5)",
                                // transform: "scale(5)",
                              }
                            : {
                                position: "absolute",
                                top: 0,
                                left: 0,
                              }
                        }
                        src={`https://ecranked.ddns.net/public/${
                          skimData["session_id"]
                        }/heatmap_${value}_${
                          targetHeatmapHighres ? "highres" : "lowres"
                        }.png`}
                      ></img>
                    );
                  });
                } else {
                  return (
                    <img
                      alt={""}
                      onLoad={() => {
                        setImageLoadedFirstTime(true);
                        setImageLoaded(true);
                      }}
                      style={
                        heatmapHighres
                          ? {
                              transformOrigin: "top left",
                              transform: "scale(20%)",
                              // width: "scale(5)",
                              // transform: "scale(5)",
                              position: "absolute",
                              top: 0,
                              left: 0,
                            }
                          : {
                              position: "absolute",
                              top: 0,
                              left: 0,
                            }
                      }
                      src={`https://ecranked.ddns.net/public/${
                        skimData["session_id"]
                      }/heatmap_${
                        heatmapHoveredOption ?? heatmapSelectedOption
                      }_${targetHeatmapHighres ? "highres" : "lowres"}.png`}
                    />
                  );
                }
              })()}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
};
