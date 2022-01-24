import useResizeAware from "react-resize-aware";
import styled from "styled-components";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { NavLink } from "react-router-dom";

import { SideBySideMagnifier } from "react-image-magnifiers";
function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}
const ContainerTitle = styled.div`
  font-size: 36px;
  font-weight: 400;
  margin: 10px 0px;
  text-align: center;
  flex: 0 0 100%;
  color: #fff;
  flex-grow: 0;
`;
const LoadoutStyle = styled.div`
  flex-wrap: wrap;

  display: flex;
  padding: 10px 10px 10px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid white;
  border-radius: 10px;
`;

const LoadoutBoxStyle = styled(NavLink)`
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
function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
}
const RankingText = styled.p`
  font-size: 10px;
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
const LoadoutBox = ({ user_id, number, frequency }) => {
  const [ranking, setRanking] = useState(0);
  useEffect(() => {
    fetch(
      "https://ecranked.ddns.net/api/v1/leaderboard/rank/" +
        user_id +
        "/loadout/" +
        number +
        "/global"
    )
      .then((response) => response.json())
      .then((data) => {
        setRanking(data[0]["rank"]);
      });
  });

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
  const tacModMapName = [
    "Repair matrix",
    "Threat scanner",
    "Energy barrier",
    "Phase shift",
  ];
  const ordinanceMapName = [
    "Detonator",
    "Stun field",
    "Arc mine",
    "Instant repair",
  ];
  const weaponMapName = ["Pulsar", "Nova", "Comet", "Meteor"];
  let displayNumber = Math.round(frequency * 10000) / 100;
  // if (displayNumber === 100) {
  //   displayNumber = 99.999;
  // }
  return (
    <LoadoutBoxStyle to={"/leaderboard/loadout/" + number}>
      <img
        src={weaponMap[weaponNumber]}
        alt={weaponMapName[weaponNumber]}
        style={{ width: "60px", height: "60px" }}
        title={weaponMapName[weaponNumber]}
      />
      <img
        src={ordinanceMap[grenadeNumber]}
        alt={ordinanceMapName[grenadeNumber]}
        style={{ width: "60px", height: "60px" }}
        title={ordinanceMapName[grenadeNumber]}
      />
      <img
        src={tacModMap[tacNumber]}
        alt={tacModMapName[tacNumber]}
        style={{ width: "60px", height: "60px" }}
        title={tacModMapName[tacNumber]}
      />
      <LoadoutBoxItemStyle style={{ fontSize: "20px", fontWeight: "900" }}>
        {displayNumber + "%"} <br />
        {ranking > 0 && ranking < 10 ? (
          <RankingText>
            {ordinal_suffix_of(ranking) + " Globally!"}{" "}
          </RankingText>
        ) : (
          ""
        )}
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
const HeatmapStyle = styled.div`
  // flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 10px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid white;
  border-radius: 10px;
  // max-height: 20%;
  gap: 10px;
`;
const GrowToFullScreen = (props) => {
  const AnimationTime = 0.5;
  const childRefrence = useRef(null);

  const [positionOnScreen, setPositionOnScreen] = useState({});

  const [onClickZoom, setOnClickZoom] = useState(false);

  const [onClickStart, setOnClickStart] = useState(false);

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  useEffect(() => {
    if (onClickZoom) {
      delay(1).then(() => setOnClickStart(true));
    }
  }, [onClickZoom]);

  useEffect(() => {
    if (!onClickStart) {
      delay(AnimationTime * 1000).then(() => setOnClickZoom(false));
    }
  }, [onClickStart]);

  useEffect(() => {
    var rect = childRefrence.current.getBoundingClientRect();

    if (props.isFullscreen) {
      // example use

      rect.percentWidth = (rect.width / window.innerWidth) * 100;
      rect.percentHeight = (rect.height / window.innerHeight) * 100;
      console.log(rect);
      // console.log(childRefrence.current.className);

      setOnClickZoom(true);
      setPositionOnScreen(rect);
    } else {
      // setOnClickZoom(false);
      // example use

      rect.percentWidth = (rect.width / window.innerWidth) * 100;
      rect.percentHeight = (rect.height / window.innerHeight) * 100;
      setPositionOnScreen(rect);
      setOnClickStart(false);
    }
  }, [props.isFullscreen]);
  let defaultStyle = {
    position: "fixed",
    transitionProperty: "height, left, top, width",
    transitionDuration: `${AnimationTime}s`,
    transitionTimingFunction: "ease",
    zIndex: 100,
  };

  let MaxStyle = {
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    // opacity: "100%",
  };

  let StartStyle = {
    top: positionOnScreen.top,
    left: positionOnScreen.left,
    width: positionOnScreen.width,
    height: positionOnScreen.height,
    // opacity: "0%",
  };
  return (
    <>
      {React.cloneElement(props.children, {
        ref: childRefrence,
      })}
      {onClickZoom ? (
        <div
          style={{
            ...defaultStyle,
            ...(onClickStart ? MaxStyle : StartStyle),
          }}
        >
          {React.cloneElement(props.children, {
            // ref: childRefrence,
            style: {
              width: "100%",
              height: "100%",
              margin: "none",
              boxSizing: "border-box",
            },
          })}
        </div>
      ) : null}
    </>
  );
};
const HeatmapButtonStyle = styled.div`
  color: white;
  border: 1px solid white;
  border-radius: 10px;
  flex: 40px 0 0;
  min-height: 20px;
  &:hover {
    background-color: #555;
    color: #000;
  }
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
`;
const Heatmap = ({ userData }) => {
  const [selectedHeatmap, setSelectedHeatmap] = useState(2);
  const [isFullscreen, setIsFullscreen] = useState(false);

  //1394 951
  const Images = useMemo(
    () => [
      {
        width: 1394,
        height: 591,
        name: "combustion",
      },
      {
        width: 874,
        height: 556,
        name: "dyson",
      },
      {
        width: 1589,
        height: 458,
        name: "fission",
      },
      {
        width: 1641,
        height: 877,
        name: "surge",
      },
    ],
    []
  );

  const [finalImageSize, setFinalImageSize] = useState({
    width: "10px",
    height: "10px",
  });
  const imageRef = useRef();

  const [resizeListener, sizes] = useResizeAware();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (imageRef.current === undefined || imageRef.current === null) {
      return;
    }

    var targetWidth = Images[selectedHeatmap].width;
    var targetHeight = Images[selectedHeatmap].height;

    var parentWidth = imageRef.current.getBoundingClientRect().width;
    var parentHeight = imageRef.current.getBoundingClientRect().height;

    // parentWidth -= parentWidth - prevImageState.width;
    // parentHeight -= parentHeight - prevImageState.height;

    console.log("update", parentWidth, parentHeight);
    var finalWidth = targetWidth;
    var finalHeight = targetHeight;
    var decreasePercentage = 0;
    if (finalWidth >= parentWidth) {
      decreasePercentage = parentWidth / finalWidth;
      finalWidth *= decreasePercentage;
      finalHeight *= decreasePercentage;
    }
    if (finalHeight >= parentHeight) {
      decreasePercentage = parentHeight / finalHeight;
      finalWidth *= decreasePercentage;
      finalHeight *= decreasePercentage;
    }
    console.log("set_update", finalWidth, finalHeight);

    setFinalImageSize({
      width: finalWidth + "px",
      height: finalHeight + "px",
      left: (parentWidth - finalWidth) / 2,
      top: (parentHeight - finalHeight) / 2,
    });
  }, [
    sizes.width,
    sizes.height,
    imageRef,
    selectedHeatmap,
    imageLoaded,
    Images,
  ]);
  const onHeatmapRequested = () => {
    const authToken = localStorage.getItem("AUTHORIZATION_TOKEN");

    const requestOptions = {
      method: "PUT",
      headers: { Authorization: authToken, "Content-Type": "application/json" },
      body: "{}",
    };
    fetch(
      "https://ecranked.ddns.net/api/v1/user/" +
        userData["oculus_id"] +
        "/request_heatmaps",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          alert(
            "There was an error when requesting your heatmaps. Please contact a moderator."
          );
        } else {
          alert(
            "Heatmap requested! They can take up to 20 minutes to process. Please wait for the ping on discord. Contact a moderator if your heatmap doesn't load or you dont get a ping within 20 minutes"
          );
        }
      })
      .then((data) => {});
  };
  if (userData.heatmap_completed === 1) {
    return (
      <GrowToFullScreen isFullscreen={isFullscreen}>
        <HeatmapStyle>
          <HeatmapButtonStyle
            onClick={() => {
              setIsFullscreen((prev) => !prev);
            }}
          >
            Toggle fullscreen
          </HeatmapButtonStyle>
          <div
            style={{
              display: "flex",
              width: "100%",
              flex: "200px 1",
              height: "100px",
            }}
          >
            <HeatmapButtonStyle
              onClick={() => {
                setSelectedHeatmap((prev) => {
                  setImageLoaded(false);
                  if (prev === 0) {
                    return 3;
                  }
                  return prev - 1;
                });
              }}
            >
              {"<"}
            </HeatmapButtonStyle>
            <div
              style={{
                flex: "0px 8 1",
                position: "relative",
              }}
              ref={imageRef}
            >
              {" "}
              {resizeListener}
              {/* Your content here. (div sizes are {sizes.width} x {sizes.height}) */}
              <div
                style={{
                  position: "absolute",
                  // backgroundColor: "red",
                  ...finalImageSize,
                }}
              >
                <SideBySideMagnifier
                  style={{
                    opacity: imageLoaded ? "100%" : "0%",
                  }}
                  imageSrc={
                    "https://ecranked.ddns.net/public/" +
                    userData.oculus_id +
                    "/heatmap_" +
                    Images[selectedHeatmap].name +
                    "_recent.png"
                  }
                  alwaysInPlace={true}
                  className="input-position"
                  fillAvailableSpace={true}
                  onImageLoad={() => {
                    setImageLoaded(true);
                  }}
                />
              </div>
            </div>
            <HeatmapButtonStyle
              onClick={() => {
                setSelectedHeatmap((prev) => {
                  setImageLoaded(false);
                  if (prev === 3) {
                    return 0;
                  }
                  return prev + 1;
                });
              }}
            >
              {">"}
            </HeatmapButtonStyle>
          </div>
          {(() => {
            /* eslint-disable */
            if (localStorage.getItem("MODERATOR") == 1) {
              return (
                <HeatmapButtonStyle onClick={onHeatmapRequested}>
                  Update your heatmaps!
                </HeatmapButtonStyle>
              );
            } else if (
              localStorage.getItem("OCULUS_ID") == userData["oculus_id"]
            ) {
              if (
                !(
                  userData["heatmap_render_date"] <
                  Math.round(Date.now() / 1000) + 60 * 60 * 24 * 3
                )
              ) {
                return (
                  <HeatmapButtonStyle onClick={onHeatmapRequested}>
                    Update your heatmaps!
                  </HeatmapButtonStyle>
                );
              }
            }

            /* eslint-enable */
          })()}
        </HeatmapStyle>
      </GrowToFullScreen>
    );
  } else {
    /* eslint-disable */
    if (
      localStorage.getItem("OCULUS_ID") == userData["oculus_id"] ||
      localStorage.getItem("MODERATOR") == 1
    ) {
      return (
        <HeatmapButtonStyle onClick={onHeatmapRequested}>
          Request your heatmaps!
        </HeatmapButtonStyle>
      );
    } else {
      return null;
    }
    /* eslint-enable */
  }

  // return (
  //   <>
  //     <LoadoutStyle>
  //       {top_loadout.slice(0, numOfEntrys).map((loadout) => {
  //         return (
  //           <LoadoutBox
  //             user_id={user_id}
  //             number={loadout[0]}
  //             frequency={loadout[1]}
  //             key={loadout[0]}
  //           />
  //         );
  //       }, 4)}{" "}
  //       <LoadoutExpandButtonStyle
  //         onClick={() => {
  //           setNumOfEntrys(numOfEntrys * 2);
  //         }}
  //       >
  //         {" "}
  //         Click to show more{" "}
  //       </LoadoutExpandButtonStyle>
  //     </LoadoutStyle>
  //   </>
  // );
};
const Loadout = ({ user_id, top_loadout }) => {
  const [numOfEntrys, setNumOfEntrys] = useState(5);
  return (
    <>
      <LoadoutStyle>
        {top_loadout.slice(0, numOfEntrys).map((loadout) => {
          return (
            <LoadoutBox
              user_id={user_id}
              number={loadout[0]}
              frequency={loadout[1]}
              key={loadout[0]}
            />
          );
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
  min-width: 200px;
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
  padding: 10px 10px 10px;
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
      {/* <UserStat
        name={"Average Ping"}
        displayValue={userStats["average_ping"].toFixed(1) + "ms"}
        value={map_range(userStats["average_ping"], 0, 200, 0, 1)}
      /> */}
      <UserStat
        name={"Average Speed"}
        displayValue={userStats["average_speed"].toFixed(2) + "m/s"}
        value={map_range(userStats["average_speed"], 0, 5, 0, 1)}
      />
      <UserStat
        name={"Time idle"}
        displayValue={(userStats["percent_stopped"] * 100).toFixed(1) + "%"}
        value={userStats["percent_stopped"]}
      />
      <UserStat
        name={"Inverted"}
        displayValue={(userStats["percent_upsidedown"] * 100).toFixed(1) + "%"}
        value={userStats["percent_upsidedown"]}
      />
      <UserStat
        name={"Deaths/Game"}
        displayValue={userStats["average_deaths"].toFixed(1)}
        value={map_range(userStats["average_deaths"], 0, 15, 0, 1)}
      />
      {/* <UserStat
        name={"Crash/Leave"}
        displayValue={(userStats["percent_crash"] * 100).toFixed(2) + "%"}
        value={userStats["percent_crash"]}
      /> */}
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
  gap: 10px;
`;

const StatChoiceStyle = styled.div`
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
        style={
          currentSelected === "monthly_resetting_stats"
            ? { backgroundColor: "#333" }
            : {}
        }
        onClick={() => {
          onClick("monthly_resetting_stats");
        }}
      >
        Monthly
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
const LeftCenterSection = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

export const Statistics = ({ userData }) => {
  const [statChoice, setStatChoice] = useState("stats");

  return (
    <CenterColumnStyle>
      <LeftCenterSection>
        <StatChoice
          currentSelected={statChoice}
          onClick={(table) => {
            setStatChoice(table);
          }}
        />
        <UserStats userData={userData} statChoice={statChoice} />
        <Heatmap userData={userData} />
        <Loadout
          user_id={userData["oculus_id"]}
          top_loadout={
            userData[statChoice]["top_loadout"]
              ? userData[statChoice]["top_loadout"]
              : []
          }
        />
      </LeftCenterSection>
    </CenterColumnStyle>
  );
};
