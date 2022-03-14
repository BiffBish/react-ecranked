/* eslint-disable */

import React, { useRef, useState, useMemo } from "react";
import { matchPath } from "react-router-dom";

import styled from "styled-components";
import { AchievementsContainer, LeftAchievementCollumn } from "../Achievements";
import { SegmentedProgressBar } from "../SegmentedProgressBar";

var achievementFormatingData = require("../AchievementData.json");

const AchievementPopupStyle = styled.div`
  box-sizing: border-box;

  // position: absolute;
  color: white;
  padding: 10px;
  // margin: 20px 10px 20px;
  background-color: #222;
  color: white;

  z-index: 10;
`;

const AchievementPopup = ({
  visible,
  selectedNumber,
  achievementData,
  locked,
  floatLeft = false,
  floatTop = false,
  DialogBoxOverride = null,
}) => {
  // if (selectedNumber == 15) {
  //   visible = true;
  // }
  let displayedValue = achievementData.values[selectedNumber.toString()];

  let SelectedAchievement = achievementFormatingData[selectedNumber.toString()];
  if (SelectedAchievement == null) return null;
  let SelectedAchievementDataName = SelectedAchievement.progressDataName;
  let NumberEarned = null;
  if (SelectedAchievementDataName != undefined) {
    NumberEarned = collectedAchievementData[SelectedAchievementDataName];
  }

  let MaxNumber = SelectedAchievement.progressTotal;

  const PopupProgressBar = () => {
    if (achievementData.values[selectedNumber.toString()] != null) {
      return <SegmentedProgressBar AN={selectedNumber} AD={achievementData} />;
    } else {
      return <></>;
    }
  };

  let uncompletedStatement = SelectedAchievement.uncompletedInfo;

  if (NumberEarned != null) {
    uncompletedStatement = uncompletedStatement.replace("%c", NumberEarned);
    uncompletedStatement = uncompletedStatement.replace("%m", MaxNumber);
  }

  let CurrentStepNumber = SelectedAchievement.parts.length - 1;
  for (let index = 0; index < SelectedAchievement.parts.length; index++) {
    const element = SelectedAchievement.parts[index];
    if (element.Percent > displayedValue) {
      CurrentStepNumber = index;
      break;
    }
  }
  let ShowHelperBox = true;
  let AchievementStatus = "In Progress";
  let totalAchievements = SelectedAchievement.parts.length;
  if (locked) AchievementStatus = "Challenge Locked";
  if (displayedValue === 1) AchievementStatus = "Completed";

  let iconSRC = "white";
  if (CurrentStepNumber / totalAchievements == 0) {
    iconSRC = "white";
  }
  if (CurrentStepNumber / totalAchievements >= 0.25) {
    iconSRC = "bronze";
  }
  if (CurrentStepNumber / totalAchievements >= 0.5) {
    iconSRC = "silver";
  }
  if (CurrentStepNumber + 1 == totalAchievements) {
    ShowHelperBox = false;
    iconSRC = "gold";
  } else if (locked) {
    iconSRC += "_lock";
  }

  let partOffset = 0;
  if (selectedNumber == 29) {
    CurrentStepNumber = 17;
  }
  if (SelectedAchievement.parts.length > 4) {
    if (CurrentStepNumber < 17) {
      if (CurrentStepNumber < 17 && CurrentStepNumber > 1) {
        partOffset = CurrentStepNumber - 1;
      }
    } else {
      partOffset = SelectedAchievement.parts.length - 4;
    }
  }
  return (
    <div
      style={{ position: "relative", display: !visible ? "none" : undefined }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: 1000,
          right: floatLeft ? 0 : undefined,
          left: !floatLeft ? 0 : undefined,
          bottom: floatTop ? "30px" : undefined,
        }}
      >
        <AchievementPopupStyle
          className="rounded horizontal-container"
          onMouseLeave={() => {
            // visibilityCallback(false);
          }}
          style={{
            width: 600,
          }}
        >
          <div className="list grow">
            <h3 className="centered">
              {SelectedAchievement.parts[CurrentStepNumber].Title}
            </h3>
            <div className="horizontal-container">
              <div
                className="grow"
                style={{ gap: 0, opacity: locked ? "50%" : "100%" }}
              >
                {partOffset != 0 ? (
                  <div
                    className="horizontal-container"
                    style={
                      {
                        // transform: "scale(" + scalePercent + "%)",
                        // transformOrigin: "left",
                        // height: scalePercent / 2 + "px",
                      }
                    }
                  >
                    {partOffset} hidden...
                  </div>
                ) : null}

                {SelectedAchievement.parts
                  .slice(partOffset, partOffset + 4)
                  .map((element, index) => {
                    let scalePercent = 0.5;
                    if (CurrentStepNumber == index + partOffset)
                      scalePercent = 1.0;
                    if (CurrentStepNumber == index + partOffset + 1)
                      scalePercent = 0.7;
                    if (CurrentStepNumber == index + partOffset - 1)
                      scalePercent = 0.7;
                    // if (CurrentStepNumber == index + 2) scalePercent = 60;
                    // if (CurrentStepNumber == index - 2) scalePercent = 60;

                    return (
                      <>
                        <div
                          className="horizontal-container"
                          style={
                            {
                              // transform: "scale(" + scalePercent + "%)",
                              // transformOrigin: "left",
                              // height: scalePercent / 2 + "px",
                            }
                          }
                        >
                          <img
                            src={
                              "/images/" +
                              (element.Percent <= displayedValue
                                ? "neon_green_checkmark"
                                : locked
                                ? "neon_red_x"
                                : "lock_clear_no_square") +
                              ".png"
                            }
                            alt="iconImage"
                            style={{
                              height: 40 * scalePercent + "px",
                              width: 40 * scalePercent + "px",
                            }}
                          />
                          {/* <div
              className="rounded"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor:
                  element.Percent <= displayedValue ? "green" : "red",
              }}
            >
              
              </div> */}

                          <div>
                            <div style={{ fontSize: 20 * scalePercent }}>
                              {element.Title}
                            </div>
                            <div
                              style={{
                                fontSize: 10 * scalePercent,
                                padding: "0px 0px 10px",
                              }}
                            >
                              {element.Description}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                {/* <div style={{}}>
        <PopupProgressBar />{" "}
        
      </div> */}
                {SelectedAchievement.parts.length - partOffset - 4 != 0 ? (
                  <div
                    className="horizontal-container"
                    style={
                      {
                        // transform: "scale(" + scalePercent + "%)",
                        // transformOrigin: "left",
                        // height: scalePercent / 2 + "px",
                      }
                    }
                  >
                    {SelectedAchievement.parts.length - partOffset - 4} more...
                  </div>
                ) : null}
              </div>
              <div className="centering">
                <img
                  style={{ width: "150px", backgroundColor: "transparent" }}
                  src={"/images/series_10_crown/" + iconSRC + ".png"}
                ></img>
              </div>

              {/* <div style={{ fontSize: 10 }}>{uncompletedStatement}</div> */}
            </div>
          </div>
        </AchievementPopupStyle>
        {DialogBoxOverride != null ? (
          <DialogBoxOverride />
        ) : (
          <AchievementPopupStyle
            className="rounded padded list horizontal-container"
            style={{
              display: ShowHelperBox ? undefined : "none",
              width: 600,
              // margin: "0 0 0 200px",
            }}
          >
            <h3>{AchievementStatus}</h3>
            {/* <div className="centering">
              </div> */}
            <p>
              {locked
                ? SelectedAchievement.Locked
                : SelectedAchievement.Progress}
            </p>
          </AchievementPopupStyle>
        )}
      </div>
    </div>
  );
};

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}
const SegmentedLProgressBar = ({
  achievementData,
  AchNum,
  icon = "comet",
  pubRequirement = 20,
  totalGames = 0,
  type,
  cb = () => {},
  locked = false,
  onLeft = false,
  onTop = false,
  DialogBoxOverride = null,
}) => {
  const fullRef = useRef();

  if (achievementData == null) {
    return null;
  }
  //   const [value, setValue] = React.useState(0);

  //   const [backgroundHighlighted, setBackgroundHighlighted] =
  //     React.useState(false);
  //   React.useEffect(() => {
  //     setValue(AchievementData.values[AchievementNumber.toString()] * 100);
  //   }, [AchievementData, AchievementNumber]);
  //   function getWidth() {
  //     if (barRef.current === undefined) {
  //       return 1;
  //     }
  //     return barRef.current.getBoundingClientRect().width;
  //   }
  let SelectedAchievement = achievementFormatingData[AchNum.toString()];
  let displayedValue = achievementData.values[AchNum.toString()];
  let CurrentStepNumber = -1;
  const [visible, setVisible] = useState(false);

  let DisplayedTitle = "Completed!";
  for (let index = 0; index < SelectedAchievement.parts.length; index++) {
    const element = SelectedAchievement.parts[index];
    if (element.Percent > displayedValue) {
      CurrentStepNumber = index;
      DisplayedTitle = element.Title;
      break;
    }
  }
  return (
    <div
      style={{
        height: "30px",
        overflow: "visible",
        flexBasis: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          opacity: locked ? 0.5 : 1,
          position: "relative",
          height: "30px",
        }}
        ref={fullRef}
      >
        <img
          src={"/images/" + icon + ".png"}
          alt="iconImage"
          style={{ height: "28px", width: "28px" }}
        />
        <div
          style={{ flexGrow: 1 }}
          onMouseEnter={() => {
            // updateHoverCallback(AchievementNumber);
            // setBackgroundHighlighted(true);
            setVisible(true);
            cb(fullRef, AchNum, true);
          }}
          onMouseLeave={() => {
            cb(fullRef, AchNum, false);
            setVisible(false);

            // updateHoverCallback([]);
            // setBackgroundHighlighted(false);
          }}
        >
          <SegmentedProgressBar
            Title={DisplayedTitle}
            // Title={achievementData.values[AchievementNumber.toString()]}
            Percentage={achievementData.values[AchNum.toString()]}
            SecondaryPercentage={Math.min(totalGames / pubRequirement, 1)}
            // SecondaryPercentage={0.9}
            // Percentage={0.5}
            Height={15}
            ProgressBarClass={type + "-background"}
          />
        </div>
      </div>
      <AchievementPopup
        width={100}
        visible={visible}
        selectedNumber={AchNum}
        achievementData={achievementData}
        locked={locked}
        floatLeft={onLeft}
        floatTop={onTop}
        DialogBoxOverride={DialogBoxOverride}
      />
    </div>

    // <SegmentedProgressBarContainerStyle
    //   style={S
    //     backgroundHighlighted
    //       ? {
    //           backgroundColor: "#fff4",
    //         }
    //       : {
    //           backgroundColor: "#fff0",
    //         }
    //   }

    //   ref={fullRef}
    // >
    //   {/* {AchievementNumber} */}
    //   {}
    //   <ProgressDivStyle
    //     className="progress-div"
    //     style={{ height: "20px" }}
    //     ref={barRef}
    //   >
    //     <ProgressBarStyle
    //       style={{ width: `${map_range(value, 0, 100, 0, 200)}%` }}
    //       className="progress"
    //     ></ProgressBarStyle>
    //     <ProgressBarTextStyle></ProgressBarTextStyle>
    //     {/* {segments.map((segment) => {
    //       return (
    //         <SegmentOfProgressBar
    //           style={{
    //             backgroundColor: segment.earned ? `green` : `white`,
    //             transform: `translate(${
    //               segment.percentage * 100 * 0.5 * getWidth()
    //             }%, 0%)`,
    //           }}
    //         />
    //       );
    //     })} */}
    //   </ProgressDivStyle>
    // </SegmentedProgressBarContainerStyle>
  );
};
const LoadoutImage = ({ number }) => {
  const tacMod = number % 4;
  const ordinance = ((number - tacMod) % 16) / 4;
  const weapon = ((number - (tacMod + ordinance * 4)) % 64) / 16;

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
    <>
      <img
        src={weaponMap[weapon]}
        alt={"weapon"}
        // style={{ justifyContent: "center" }}
      ></img>
      <img
        src={ordinanceMap[ordinance]}
        alt={"ordinance"}
        // style={{ justifyContent: "center" }}
      ></img>
      <img
        src={tacModMap[tacMod]}
        alt={"tacMod"}
        // style={{ justifyContent: "center" }}
      ></img>
    </>
  );
};
const LoadoutBarSelectedDivStyle = styled.div`
  color: white;
  background-color: #444;
  position: absolute;
  // width: 200px;
  // height: 150px;
  // bottom: 100%;
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
    <LoadoutBarSelectedDivStyle>
      <p style={{ margin: "0px" }}>
        <img
          src={weaponMap[weapon]}
          alt={"weapon"}
          style={{ justifyContent: "center", width: "40px", height: "40px" }}
        />
        {weaponMapName[weapon]}
      </p>
      <p style={{ margin: "0px" }}>
        <img
          src={ordinanceMap[ordinance]}
          alt={"ordinance"}
          style={{ justifyContent: "center", width: "40px", height: "40px" }}
        />
        {ordinanceMapName[ordinance]}
      </p>
      <p style={{ margin: "0px" }}>
        <img
          src={tacModMap[tacMod]}
          alt={"tacMod"}
          style={{ justifyContent: "center", width: "40px", height: "40px" }}
        />
        {tacModMapName[tacMod]}
      </p>
    </LoadoutBarSelectedDivStyle>
  );
};
const LoadoutBarItem = ({ loadoutNumber }) => {
  const [onHovered, setOnHovered] = useState(false);
  return (
    <div
      className="rounded list hoverable"
      // style={{ width: `${width * 100}%` }}
      style={
        {
          // width: `${width * 100}%`,
        }
      }
      onMouseEnter={() => {
        console.log("Twe");

        setOnHovered(true);
      }}
      onMouseLeave={() => {
        setOnHovered(false);
      }}
    >
      <LoadoutImage number={loadoutNumber} />
      <div style={{ position: "relative" }}>
        {onHovered ? (
          <LoadoutBarSelected
            number={loadoutNumber}
            onHover={() => {
              setOnHovered(false);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export const AchievementLoadoutStats = ({
  userData,
  selectedAchievementType = "daily",
  achievementData,
  cb = () => {},
  setHn = () => {},
  lockedAchievements = [],
}) => {
  if (achievementData == null || userData == null) {
    return null;
  }
  let achievementItems = [
    [5, "pulsar", 0],
    [6, "nova", 0],
    [7, "comet", 0],
    [8, "meteor", 0],
    [9, "detonator", 0],
    [10, "stun_field", 0],
    [11, "arc_mine", 0],
    [12, "instant_repair", 0],
    [13, "repair_matrix", 0],
    [14, "threat_scanner", 0],
    [15, "energy_barrier", 0],
    [16, "phaseshift", 0],
    [17, "loadout", 0],
    [18, "deaths", 0],
    [19, "capture_point", 0],
    [20, "payload", 0],
    [21, "team_proximity", 0],
    [22, "enemy_proximity", 0],
    [23, "speed", 0],
    [24, "inverted", 0],
    [25, "dyson", 0],
    [26, "combustion", 0],
    [27, "fission", 0],
    [28, "surge", 0],
  ];

  const AllLoadoutHelper = ({}) => {
    let numOfHelpers = 0;
    return (
      <AchievementPopupStyle
        className="rounded padded list horizontal-container"
        style={{
          width: 600,
          // margin: "0 0 0 200px",
        }}
      >
        <h3>{"In Progress"}</h3>
        {/* <div className="centering">
    </div> */}
        <p>
          Play with loadouts you have never used before. Listed below are some
          loadouts you have not used before. Give them a try!
        </p>
        <div className="horizontal-container">
          {userData.stats.top_loadout.map((element) => {
            if (element[1] != 0) return null;
            numOfHelpers += 1;
            if (numOfHelpers >= 10) return null;
            return (
              <LoadoutBarItem
                width={0.1}
                loadoutNumber={parseInt(element[0])}
              />
            );
          })}
        </div>
      </AchievementPopupStyle>
    );
  };
  const EquipableHelper = ({}) => {
    let numOfHelpers = 0;

    let notUsedAchievements = [
      "/images/pulsar.png",
      "/images/nova.png",
      "/images/comet.png",
      "/images/meteor.png",
      "/images/detonator.png",
      "/images/stun_field.png",
      "/images/arcmine.png",
      "/images/instant_repair.png",
      "/images/repair_matrix.png",
      "/images/threat_scanner.png",
      "/images/energy_barrier.png",
      "/images/phaseshift.png",
    ];
    if (userData.daily_stats.top_loadout) {
      userData.daily_stats.top_loadout.every((element) => {
        if (element[1] == 0) return false;
        let loadoutNumber = parseInt(element[0]);

        if (!(loadoutNumber >> 4 == 0)) notUsedAchievements[0] = null;
        if (!(loadoutNumber >> 4 == 1)) notUsedAchievements[1] = null;
        if (!(loadoutNumber >> 4 == 2)) notUsedAchievements[2] = null;
        if (!(loadoutNumber >> 4 == 3)) notUsedAchievements[3] = null;

        if (!(((loadoutNumber >> 2) & 3) == 0)) notUsedAchievements[4] = null;
        if (!(((loadoutNumber >> 2) & 3) == 1)) notUsedAchievements[5] = null;
        if (!(((loadoutNumber >> 2) & 3) == 2)) notUsedAchievements[6] = null;
        if (!(((loadoutNumber >> 2) & 3) == 3)) notUsedAchievements[7] = null;

        if (!((loadoutNumber & 3) == 0)) notUsedAchievements[8] = null;
        if (!((loadoutNumber & 3) == 1)) notUsedAchievements[9] = null;
        if (!((loadoutNumber & 3) == 2)) notUsedAchievements[10] = null;
        if (!((loadoutNumber & 3) == 3)) notUsedAchievements[11] = null;
        return true;
      });
    }

    return (
      <AchievementPopupStyle
        className="rounded padded list horizontal-container"
        style={{
          width: 600,
          // margin: "0 0 0 200px",
        }}
      >
        <h3>{"In Progress"}</h3>
        {/* <div className="centering">
    </div> */}
        <p>
          Play with more equipables. Listed below are the equipables you have
          not used before. Give them a try!
        </p>
        <div className="horizontal-container">
          {notUsedAchievements.map((element) => {
            if (element == null) return null;
            numOfHelpers += 1;
            if (numOfHelpers >= 10) return null;
            return (
              <img
                src={element}
                alt={element}
                // style={{ justifyContent: "center" }}
              ></img>
            );
          })}
        </div>
      </AchievementPopupStyle>
    );
  };
  // let AllLoadoutHelper = useMemo(() => {
  //   return <EquipableHelper userData={userData} />;
  // }, []);
  // console.log(lockedAchievements);

  // let lockedAchievemetns = useMemo(getLockedStuff());

  if (selectedAchievementType === "daily") {
    return (
      <div className="list rounded-overflow padded light-background">
        <SegmentedLProgressBar
          AchNum={29}
          icon={"pubs"}
          achievementData={achievementData}
          cb={cb}
          type={"daily"}
        />
        <div className="container">
          <div className="horizontal-container">
            <div className="list grow">
              {achievementItems.slice(0, 12).map((element, index) => {
                return (
                  <SegmentedLProgressBar
                    AchNum={element[0]}
                    icon={element[1]}
                    type={"daily"}
                    cb={cb}
                    achievementData={achievementData}
                    locked={lockedAchievements[element[0]] === true}
                    onTop={index > 4}
                    // locked={true}
                  />
                );
              })}
            </div>
            <div className="list grow">
              {achievementItems.slice(12, 24).map((element, index) => {
                return (
                  <SegmentedLProgressBar
                    AchNum={element[0]}
                    icon={element[1]}
                    type={"daily"}
                    cb={cb}
                    achievementData={achievementData}
                    onTop={index > 4}
                    onLeft={true}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (selectedAchievementType === "weekly") {
    return (
      <div className="list rounded padded light-background">
        <SegmentedLProgressBar
          AchNum={29 + 25}
          icon={"pubs"}
          achievementData={achievementData}
          cb={cb}
          type={"weekly"}
        />
        <div className="container">
          <div className="horizontal-container">
            <div className="list grow">
              {achievementItems.slice(0, 12).map((element, index) => {
                return (
                  <SegmentedLProgressBar
                    AchNum={element[0] + 25}
                    icon={element[1]}
                    type={"weekly"}
                    cb={cb}
                    onTop={index > 4}
                    locked={lockedAchievements[element[0]] === true}
                    achievementData={achievementData}
                  />
                );
              })}
            </div>
            <div className="list grow">
              {achievementItems.slice(12, 24).map((element, index) => {
                return (
                  <SegmentedLProgressBar
                    AchNum={element[0] + 25}
                    icon={element[1]}
                    type={"weekly"}
                    cb={cb}
                    achievementData={achievementData}
                    onTop={index > 4}
                    onLeft={true}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (selectedAchievementType === "global") {
    return (
      <div className="list rounded padded light-background">
        <SegmentedLProgressBar
          AchNum={79}
          icon={"pubs"}
          achievementData={achievementData}
          cb={cb}
          type={"season"}
        />
        {/* <EquipableHelper userData={userData} /> */}
        <div className="container">
          <div className="horizontal-container">
            <div className="list grow">
              {achievementItems.slice(0, 12).map((element, index) => {
                return (
                  <SegmentedLProgressBar
                    AchNum={element[0] + 50}
                    locked={lockedAchievements[element[0]] === true}
                    icon={element[1]}
                    type={"season"}
                    cb={cb}
                    onTop={index > 4}
                    achievementData={achievementData}
                  />
                );
              })}
            </div>
            <div className="list grow">
              <SegmentedLProgressBar
                AchNum={67}
                icon={"loadout"}
                type={"season"}
                cb={cb}
                achievementData={achievementData}
                // onTop={index > 4}
                onLeft={true}
                DialogBoxOverride={AllLoadoutHelper}
              />
              {achievementItems.slice(13, 24).map((element, index) => {
                return (
                  <SegmentedLProgressBar
                    AchNum={element[0] + 50}
                    icon={element[1]}
                    type={"season"}
                    cb={cb}
                    achievementData={achievementData}
                    onTop={index > 4}
                    onLeft={true}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (selectedAchievementType === "community") {
    return (
      <div className="list rounded-overflow padded light-background">
        <SegmentedLProgressBar
          AchNum={1}
          icon={"community"}
          achievementData={achievementData}
          cb={cb}
          type={"community"}
        />
        <SegmentedLProgressBar
          AchNum={2}
          icon={"community"}
          achievementData={achievementData}
          cb={cb}
          type={"community"}
        />
        <SegmentedLProgressBar
          AchNum={3}
          icon={"community"}
          achievementData={achievementData}
          cb={cb}
          type={"community"}
        />
        <SegmentedLProgressBar
          AchNum={4}
          icon={"community"}
          achievementData={achievementData}
          cb={cb}
          type={"community"}
        />
      </div>
    );
  }
  return null;
  // return (
  //   <div className="list rounded padded light-background">
  //     {/* <h2>Challenges</h2> */}
  //     {selectedAchievementType === "weekly" ? (
  //       <>
  //         <SegmentedLProgressBar AchNum={54} icon={"pubs"} />

  //         <div className="horizontal-container">
  //           <div className="list grow">
  //             <SegmentedLProgressBar AchNum={30} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={31} icon={"nova"} />
  //             <SegmentedLProgressBar AchNum={32} icon={"comet"} />
  //             <SegmentedLProgressBar AchNum={33} icon={"meteor"} />
  //             <SegmentedLProgressBar AchNum={34} icon={"detonator"} />
  //             <SegmentedLProgressBar AchNum={35} icon={"stun_field"} />
  //             <SegmentedLProgressBar AchNum={36} icon={"arcmine"} />
  //             <SegmentedLProgressBar AchNum={37} icon={"instant_repair"} />
  //             <SegmentedLProgressBar AchNum={38} icon={"repair_matrix"} />
  //             <SegmentedLProgressBar AchNum={39} icon={"threat_scanner"} />
  //             <SegmentedLProgressBar AchNum={40} icon={"energy_barrier"} />
  //             <SegmentedLProgressBar AchNum={41} icon={"phaseshift"} />
  //           </div>
  //           <div className="list grow">
  //             <SegmentedLProgressBar AchNum={42} icon={"pulsar"} />
  //             <SegmentedLProgressBar
  //               AchNum={43}
  //               icon={"pulsar"}
  //               pubRequirement={25}
  //               totalGames={userData["weekly_stats"]["total_games"]}
  //             />
  //             <SegmentedLProgressBar AchNum={44} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={45} icon={"pulsar"} />
  //             <SegmentedLProgressBar
  //               AchNum={46}
  //               icon={"pulsar"}
  //               pubRequirement={25}
  //               totalGames={userData["weekly_stats"]["total_games"]}
  //             />
  //             <SegmentedLProgressBar
  //               AchNum={47}
  //               icon={"pulsar"}
  //               pubRequirement={25}
  //               totalGames={userData["weekly_stats"]["total_games"]}
  //             />
  //             <SegmentedLProgressBar
  //               AchNum={48}
  //               icon={"pulsar"}
  //               pubRequirement={25}
  //               totalGames={userData["weekly_stats"]["total_games"]}
  //             />
  //             <SegmentedLProgressBar
  //               AchNum={49}
  //               icon={"pulsar"}
  //               pubRequirement={25}
  //               totalGames={userData["weekly_stats"]["total_games"]}
  //             />
  //             <SegmentedLProgressBar AchNum={50} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={51} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={52} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={53} icon={"pulsar"} />
  //           </div>
  //         </div>
  //       </>
  //     ) : null}
  //     {selectedAchievementType === "global" ? (
  //       <>
  //         <SegmentedLProgressBar AchNum={79} icon={"pubs"} />

  //         <div className="horizontal-container">
  //           <div className="list grow">
  //             <SegmentedLProgressBar AchNum={55} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={56} icon={"nova"} />
  //             <SegmentedLProgressBar AchNum={57} icon={"comet"} />
  //             <SegmentedLProgressBar AchNum={58} icon={"meteor"} />
  //             <SegmentedLProgressBar AchNum={59} icon={"detonator"} />
  //             <SegmentedLProgressBar AchNum={60} icon={"stun_field"} />
  //             <SegmentedLProgressBar AchNum={61} icon={"arcmine"} />
  //             <SegmentedLProgressBar AchNum={62} icon={"instant_repair"} />
  //             <SegmentedLProgressBar AchNum={63} icon={"repair_matrix"} />
  //             <SegmentedLProgressBar AchNum={64} icon={"threat_scanner"} />
  //             <SegmentedLProgressBar AchNum={65} icon={"energy_barrier"} />
  //             <SegmentedLProgressBar AchNum={66} icon={"phaseshift"} />
  //           </div>
  //           <div className="list grow">
  //             <SegmentedLProgressBar AchNum={67} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={68} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={69} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={70} icon={"pulsar"} />
  //             <SegmentedLProgressBar
  //               AchNum={71}
  //               icon={"pulsar"}
  //               pubRequirement={50}
  //               totalGames={userData["stats"]["total_games"]}
  //             />
  //             <SegmentedLProgressBar
  //               AchNum={72}
  //               icon={"pulsar"}
  //               pubRequirement={50}
  //               totalGames={userData["stats"]["total_games"]}
  //             />
  //             <SegmentedLProgressBar
  //               AchNum={73}
  //               icon={"pulsar"}
  //               pubRequirement={50}
  //               totalGames={userData["stats"]["total_games"]}
  //             />
  //             <SegmentedLProgressBar
  //               AchNum={74}
  //               icon={"pulsar"}
  //               pubRequirement={50}
  //               totalGames={userData["stats"]["total_games"]}
  //             />
  //             <SegmentedLProgressBar AchNum={75} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={76} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={77} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={78} icon={"pulsar"} />
  //           </div>
  //         </div>
  //       </>
  //     ) : null}
  //   </div>
  // );
};
