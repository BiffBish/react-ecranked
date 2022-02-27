import useResizeAware from "react-resize-aware";
import styled from "styled-components";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import disableScroll from "disable-scroll";

// import { SideBySideMagnifier } from "react-image-magnifiers";
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
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
`;
const LoadoutBoxStyle = styled(NavLink)`
  justify-content: center;
  padding: 10px 10px 10px;
  margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
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
  border: 1px solid rgb(70, 70, 70);
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
  width: 100%;
  height: 100%;

  flex-direction: column;
  padding: 10px 10px 10px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  // max-height: 20%;
  gap: 10px;
  box-sizing: border-box;
`;

const GrowToFullScreen = (props) => {
  const childRef = useRef(null);
  const [wantFullscreen, setWantFullscreen] = useState(false);
  useEffect(() => {
    console.log("Getting Position of original", childRef);
  }, [wantFullscreen]);

  const AnimationTime = 0.5;

  const [positionOnScreen, setPositionOnScreen] = useState({});

  const [showFullscreenElement, setShowFullscreenElement] = useState(false);

  const [goFullscreen, setGoFullscreen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  // const [wantFullscreen, setWantFullscreen] = useState(false);

  const [sharedStates, setSharedStates] = useState(props.defaultState);

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  // useEffect(() => {
  //   if (showFullscreenElement) {
  //     delay(1).then(() => setGoFullscreen(true));
  //   }
  // }, [showFullscreenElement]);
  useEffect(() => {
    console.log("220", childRef);
  }, [childRef]);
  useEffect(() => {
    if (wantFullscreen) {
      disableScroll.on();

      setShowFullscreenElement(true);
      setIsAnimating(true);
      delay(1).then(() => setGoFullscreen(true));
      delay(1000 * AnimationTime).then(() => setIsAnimating(false));
    } else {
      setGoFullscreen(false);
      setIsAnimating(true);

      delay(1000 * AnimationTime).then(() => {
        setShowFullscreenElement(false);
        setIsAnimating(false);
        disableScroll.off();
      });
    }
  }, [wantFullscreen]);

  useEffect(() => {
    console.log("Getting Position of original", childRef);
    if (childRef.current == null) {
      return;
    }
    var rect = childRef.current.getBoundingClientRect();

    if (wantFullscreen) {
      // example use

      rect.percentWidth = (rect.width / window.innerWidth) * 100;
      rect.percentHeight = (rect.height / window.innerHeight) * 100;
      console.log(rect);
      // console.log(childReference.current.className);

      setShowFullscreenElement(true);
      setPositionOnScreen(rect);
    } else {
      // setOnClickZoom(false);
      // example use

      rect.percentWidth = (rect.width / window.innerWidth) * 100;
      rect.percentHeight = (rect.height / window.innerHeight) * 100;
      setPositionOnScreen(rect);
      setGoFullscreen(false);
    }
  }, [wantFullscreen]);

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
  // return (
  //   <>
  //     {React.cloneElement(props.children, {
  //       ref: childRef,
  //       // isFullscreenComponent: false,
  //       setFullscreenState: setWantFullscreen,
  //       // sharedStates: sharedStates,
  //       // setSharedStates: setSharedStates,
  //     })}
  //   </>
  // );
  return (
    <>
      <div style={{ width: "100%", height: "100%" }} ref={childRef}>
        {React.cloneElement(props.children, {
          isFullscreenComponent: false,
          setFullscreenState: setWantFullscreen,
          fullscreenComponentShown: showFullscreenElement,
          sharedStates: sharedStates,
          setSharedStates: setSharedStates,
        })}
      </div>
      {showFullscreenElement ? (
        <div
          style={{
            ...defaultStyle,
            ...(goFullscreen ? MaxStyle : StartStyle),
          }}
        >
          {React.cloneElement(props.children, {
            style: {
              width: "100%",
              height: "100%",
              margin: "none",
              boxSizing: "border-box",
            },
            setFullscreenState: setWantFullscreen,
            isFullscreenComponent: true,
            isAnimating: isAnimating,
            fullscreenComponentShown: showFullscreenElement,
            sharedStates: sharedStates,
            setSharedStates: setSharedStates,
          })}
        </div>
      ) : null}
    </>
  );
};
const HeatmapButtonStyle = styled.div`
  color: white;
  border: 1px solid rgb(70, 70, 70);
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

const Heatmap = ({
  userData,
  isFullscreenComponent,
  setFullscreenState,
  fullscreenComponentShown,
  isAnimating,
  sharedStates,
  setSharedStates,
}) => {
  console.log("327", isFullscreenComponent);
  // useEffect(() => {
  //   if (sharedStates.selectedHeatmap === undefined) {
  //     setSharedStates((prev) => ({
  //       ...prev,
  //       sharedStates: 2,
  //     }));
  //   }
  // }, [setSharedStates, sharedStates]);

  //   //1394 951
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
    scale: 1,
  });

  const [resizeListener, sizes] = useResizeAware();

  const [imageLoaded, setImageLoaded] = useState(false);
  // const heatmapZoomComponentRef = useRef();

  const imageRef = useRef(null);
  const fullscreenImageRef = useRef(null);
  const imageZoomRef = useRef(null);
  const fullscreenImageZoomRef = useRef(null);
  useEffect(() => {
    // imageRef =
    // console.log("update", child);
    // console.log("updateREF", heatmapZoomComponentRef);
    // console.log("update", fullscreenChild);
    var image;
    console.log(fullscreenImageRef);
    console.log(imageRef);
    if (fullscreenImageRef.current !== null) {
      image = fullscreenImageRef.current;
    } else if (imageRef.current !== null) {
      image = imageRef.current;
    } else {
      return;
    }
    console.log(sharedStates.selectedHeatmap);
    var targetWidth = Images[sharedStates.selectedHeatmap ?? 2].width;
    var targetHeight = Images[sharedStates.selectedHeatmap ?? 2].height;

    var parentWidth = image.getBoundingClientRect().width;
    var parentHeight = image.getBoundingClientRect().height;

    // parentWidth -= parentWidth - prevImageState.width;
    // parentHeight -= parentHeight - prevImageState.height;

    console.log("update", parentWidth, parentHeight);
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

    // setFinalImageSize({
    //   width: finalWidth + "px",
    //   height: finalHeight + "px",
    //   left: (parentWidth - finalWidth) / 2,
    //   top: (parentHeight - finalHeight) / 2,
    // });
    console.log("finalScale", finalScale);
    setFinalImageSize({
      scale: finalScale,
    });
    console.log(fullscreenImageZoomRef);
    fullscreenImageZoomRef?.current?.centerView?.(finalScale, 0, 0);
    imageZoomRef?.current?.centerView?.(finalScale, 0, 0);
    // if (fullscreenResetTransform !== undefined) {
    //   fullscreenResetTransform(0);
    // } else if (childResetTransform !== undefined) {
    //   childResetTransform(0);
    // }
    // if (heatmapZoomComponentRef.current !== undefined) {
    //   heatmapZoomComponentRef.current.resetTransform();
    // }
  }, [
    sizes.width,
    sizes.height,
    sharedStates,
    imageLoaded,
    Images,
    fullscreenComponentShown,
  ]);
  // useEffect(() => {
  //   console.log("IMAGE LOADED");
  //   fullscreenImageZoomRef?.current?.centerView?.(0.2, 0, 0);
  //   imageZoomRef?.current?.centerView?.(0.2, 0, 0);
  // }, [imageLoaded]);
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
      <HeatmapStyle>
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
              setImageLoaded(false);
              setSharedStates((prev) => {
                console.log(prev.selectedHeatmap);
                var selectedHeatmap = prev.selectedHeatmap ?? 0;
                if (selectedHeatmap === 0) {
                  selectedHeatmap = 3;
                } else {
                  selectedHeatmap -= 1;
                }
                return {
                  ...prev,
                  selectedHeatmap: selectedHeatmap,
                };
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
            ref={isFullscreenComponent ? fullscreenImageRef : imageRef}
          >
            {" "}
            {resizeListener}
            {/* Your content here. (div sizes are {sizes.width} x {sizes.height}) */}
            <div
              style={{
                position: "absolute",
                // backgroundColor: "red",
                width: "100%",
                height: "100%",
              }}
            >
              <TransformWrapper
                onZoom={(e) => {
                  if (isFullscreenComponent) {
                    console.log(e.state);
                    if (e.state.scale <= finalImageSize.scale)
                      setFullscreenState(false);
                  } else {
                    console.log(e.state.scale);
                    console.log(finalImageSize.scale);
                    if (e.state.scale > finalImageSize.scale) {
                      setFullscreenState(true);
                    }
                  }
                }}
                initialScale={finalImageSize.scale}
                minScale={finalImageSize.scale}
                centerOnInit={true}
                limitToBounds={false}
                disabled={isFullscreenComponent ? isAnimating : false}
                ref={
                  isFullscreenComponent ? fullscreenImageZoomRef : imageZoomRef
                }
              >
                <TransformComponent
                  // ref={heatmapZoomComponentRef}
                  wrapperStyle={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    style={{
                      opacity: imageLoaded ? "100%" : "0%",
                    }}
                    src={
                      "https://ecranked.ddns.net/public/" +
                      userData.oculus_id +
                      "/heatmap_" +
                      Images[sharedStates.selectedHeatmap ?? 2].name +
                      "_recent.png"
                    }
                    alt="test"
                    onLoad={() => {
                      setImageLoaded(true);
                    }}
                  />
                </TransformComponent>
              </TransformWrapper>
            </div>
          </div>
          <HeatmapButtonStyle
            onClick={() => {
              setImageLoaded(false);

              setSharedStates((prev) => {
                console.log(prev.selectedHeatmap);
                var selectedHeatmap = prev.selectedHeatmap ?? 0;
                if (selectedHeatmap === 3) {
                  selectedHeatmap = 0;
                } else {
                  selectedHeatmap += 1;
                }
                return {
                  ...prev,
                  selectedHeatmap: selectedHeatmap,
                };
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
              userData["heatmap_render_date"] <
              Math.round(Date.now() / 1000) + 60 * 60 * 24 * 3
            ) {
              return (
                <HeatmapButtonStyle onClick={onHeatmapRequested}>
                  Update your heatmaps!
                </HeatmapButtonStyle>
              );
            }
          }
          return null;

          /* eslint-enable */
        })()}
      </HeatmapStyle>
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
  border: 1px solid rgb(70, 70, 70);
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
  border: 1px solid rgb(70, 70, 70);
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
        displayValue={userStats["deaths"]}
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
      <UserStat
        name={"Hours Played"}
        displayValue={(userStats["total_seconds"] / (60 * 60)).toFixed(1) + "h"}
        value={1}
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
  border: 1px solid rgb(70, 70, 70);
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
        <GrowToFullScreen defaultState={{ selectedHeatmap: 0 }}>
          <Heatmap userData={userData} />
        </GrowToFullScreen>
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
