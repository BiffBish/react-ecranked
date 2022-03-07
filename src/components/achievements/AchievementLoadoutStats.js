/* eslint-disable */

import React, { useRef, useState } from "react";
import { matchPath } from "react-router-dom";

import styled from "styled-components";
import { AchievementsContainer, LeftAchievementCollumn } from "../Achievements";
import { SegmentedProgressBar } from "../SegmentedProgressBar";

var achievementFormatingData = require("../AchievementData.json");

const ContainerStyle = styled.div`
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
const ContainerTitle = styled.div`
  font-size: 36px;
  font-weight: 400;
  margin: 10px 0px;
  text-align: center;
  flex: 0 0 100%;
  color: #fff;
  flex-grow: 0;
`;

const SegmentedProgressBarContainerStyle = styled.div`
  height: ${40}px;

  display: flex;
  flex-direction: column;
  line-height: 16px;
  // flex-grow: 1;
  transition-property: background-color;
  transition-duration: 0.2f;
  flex-basis: 0;
`;
const ProgressDivStyle = styled.div`
  position: relative;

  border-radius: 0.5rem;
  border: 1px solid white;
  border-radius: 10px;
  height: 7px;
  overflow: hidden;
`;

const ProgressBarStyle = styled.div`
  position: relative;

  transform: translate(-50%, -0%);
  background-color: #b35252;
  height: 100%;
  border-radius: 8px;
  transition-duration: 3s;
  transition-property: width;
`;
const ProgressBarTextStyle = styled.p`
  position: relative;
  margin: -${35 - 4}px 4px;
  text-align: left;

  z-index: 5;
`;
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
    <div style={{ display: "flex", opacity: locked ? 0.5 : 1 }} ref={fullRef}>
      <img
        src={"/images/" + icon + ".png"}
        alt="iconImage"
        style={{ height: "38px", width: "38px" }}
      />
      <div
        style={{ flexGrow: 1 }}
        onMouseEnter={() => {
          // updateHoverCallback(AchievementNumber);
          // setBackgroundHighlighted(true);
          cb(fullRef, AchNum, true);
        }}
        onMouseLeave={() => {
          cb(fullRef, AchNum, false);

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
          Height={20}
          ProgressBarClass={type + "-background"}
        />
      </div>
    </div>

    // <SegmentedProgressBarContainerStyle
    //   style={
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

  let lockedAchievemetns = [];

  userData.daily_stats.top_loadout.forEach((element) => {});

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
