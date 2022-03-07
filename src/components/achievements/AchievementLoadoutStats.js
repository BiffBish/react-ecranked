/* eslint-disable */

import React, { useRef, useState } from "react";
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
  width,
  visible,
  // visibilityCallback,
  selectedNumber,
  achievementData,
  lockedAchievements,
  locked,
}) => {
  // visible = true;
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

  let CurrentStepNumber = SelectedAchievement.length - 1;
  for (let index = 0; index < SelectedAchievement.length; index++) {
    const element = SelectedAchievement[index];
    if (element.Percent > displayedValue) {
      CurrentStepNumber = index;
      break;
    }
  }
  // if (visible) {
  // }
  // debugger;
  // setTimeout(function () {}, 500);

  return (
    <AchievementPopupStyle
      className="rounded horizontal-container"
      onMouseLeave={() => {
        // visibilityCallback(false);
      }}
      style={{
        position: "relative",
        // top: 0,
        // left: 0,
        // top: 0,
        // height: height,
        width: 500,
        // opacity: visible ? "100%" : "0%",
        display: visible ? "block" : "none",
        // transitionDuration: ".0s",
        // transitionProperty: "opacity",
        zIndex: 1000,
      }}
    >
      <div className="list">
        {SelectedAchievement.map((element, index) => {
          let scalePercent = 50;
          if (CurrentStepNumber == index) scalePercent = 100;
          if (CurrentStepNumber == index + 1) scalePercent = 70;
          if (CurrentStepNumber == index - 1) scalePercent = 70;
          // if (CurrentStepNumber == index + 2) scalePercent = 60;
          // if (CurrentStepNumber == index - 2) scalePercent = 60;
          return (
            <>
              <div
                className="horizontal-container"
                style={{
                  transform: "scale(" + scalePercent + "%)",
                  transformOrigin: "left",
                  height: scalePercent / 2 + "px",
                }}
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
                  style={{ height: "40px", width: "40px" }}
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
                  <div style={{ fontSize: 20 }}>{element.Title}</div>
                  <div style={{ fontSize: 10, padding: "0px 0px 10px" }}>
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
      </div>
      Achievement Failed
      {/* <div style={{ fontSize: 10 }}>{uncompletedStatement}</div> */}
    </AchievementPopupStyle>
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
  for (let index = 0; index < SelectedAchievement.length; index++) {
    const element = SelectedAchievement[index];
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

  console.log(lockedAchievements);

  // let lockedAchievemetns = useMemo(getLockedStuff());
  if (selectedAchievementType === "daily") {
    return (
      <div className="list rounded padded light-background">
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
              {achievementItems.slice(0, 12).map((element) => {
                return (
                  <SegmentedLProgressBar
                    AchNum={element[0]}
                    icon={element[1]}
                    type={"daily"}
                    cb={cb}
                    achievementData={achievementData}
                    locked={lockedAchievements[element[0]] === true}
                    // locked={true}
                  />
                );
              })}
            </div>
            <div className="list grow">
              {achievementItems.slice(12, 24).map((element) => {
                return (
                  <SegmentedLProgressBar
                    AchNum={element[0]}
                    icon={element[1]}
                    type={"daily"}
                    cb={cb}
                    achievementData={achievementData}
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
              {achievementItems.slice(0, 12).map((element) => {
                return (
                  <SegmentedLProgressBar
                    AchNum={element[0] + 25}
                    icon={element[1]}
                    type={"weekly"}
                    cb={cb}
                    achievementData={achievementData}
                  />
                );
              })}
            </div>
            <div className="list grow">
              {achievementItems.slice(12, 24).map((element) => {
                return (
                  <SegmentedLProgressBar
                    AchNum={element[0] + 25}
                    icon={element[1]}
                    type={"weekly"}
                    cb={cb}
                    achievementData={achievementData}
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
        <div className="container">
          <div className="horizontal-container">
            <div className="list grow">
              {achievementItems.slice(0, 12).map((element) => {
                return (
                  <SegmentedLProgressBar
                    AchNum={element[0] + 50}
                    icon={element[1]}
                    type={"season"}
                    cb={cb}
                    achievementData={achievementData}
                  />
                );
              })}
            </div>
            <div className="list grow">
              {achievementItems.slice(12, 24).map((element) => {
                return (
                  <SegmentedLProgressBar
                    AchNum={element[0] + 50}
                    icon={element[1]}
                    type={"season"}
                    cb={cb}
                    achievementData={achievementData}
                  />
                );
              })}
            </div>
          </div>
        </div>
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
