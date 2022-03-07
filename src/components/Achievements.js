/* eslint-disable */

import { height } from "@mui/system";
import React, { useState } from "react";
import styled from "styled-components";
import { AchievementHeaderButton } from "./achievements/AchievementHeaderButton";
import { AchievementLoadoutStats } from "./achievements/AchievementLoadoutStats";
import { MasterAchievementBar } from "./MasterAchievementBar";
import { SegmentedProgressBar } from "./SegmentedProgressBar";
var achievementFormatingData = require("./AchievementData.json");
function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}
var collectedAchievementData = {};
export const AchievementSize = 40;
const AchievementGap = 5;

export const AchievementsContainer = styled.div`
  font-size:15px;
  width: 100%;
  height: 1500px;
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  overflow: hidden;
  transition-duration: 1s;
  opacity: 100%
  transition-property: height margin opacity;
  color: white;
  line-height: ${AchievementSize - 4}px;
  width: 800px;
  margin: auto;

`;

const CenterAchievementCollumn = styled.div`
  display: flex;
  width: ${AchievementSize * 5 + AchievementGap * 4}px;
  background-color: transparent;
  flex-wrap: wrap;
  gap: ${AchievementGap}px ${AchievementGap}px; /* row-gap column gap */
  align-content: flex-start;
`;
export const LeftAchievementCollumn = styled.div`
  display: flex;
  flex: 200px 2;
  background-color: transparent;
  margin: 0px ${AchievementGap}px 0px 0px;
  gap: ${AchievementGap}px 0px;
  flex-wrap: wrap;
  flex-direction: column;
`;
const RightAchievementCollumn = styled.div`
  display: flex;
  flex: 200px 2;
  background-color: transparent;
  margin: 0px 0px 0px ${AchievementGap}px;
  gap: ${AchievementGap}px 0px;
  flex-wrap: wrap;
  flex-direction: column;
`;
const AchievementSquareStyle = styled.div`
  background-color: transparent;
  border: 1px solid white;
  border-radius: 10px;
  width: ${AchievementSize - 2}px;
  height: ${AchievementSize - 2}px;
  flex: none;
  padding: 0px;
  text-align: center;
  transition-property: background-color;

  transition-duration: 0.1s;
  cursor: pointer;
`;
const AchievementWideStyle = styled.div`
  background-color: yellow;
  border: 1px solid white;
  border-radius: 10px;
  width: ${AchievementSize * 5 + AchievementGap * 4 - 4}px;
  height: ${AchievementSize - 4}px;
  flex: none;
`;

// const AchievementSquare = ({ num, data, cb, hn = [] }) => {
//   var ref = React.useRef();
//   let backGroundColor = "#A44";

//   if (data["values"][num.toString()] > 0.5) {
//     if (hn.includes(num)) {
//       backGroundColor = "#4A4";
//     } else {
//       backGroundColor = "#008000ff";
//     }
//   } else if (data["locked"][num.toString()]) {
//     if (hn.includes(num)) {
//       backGroundColor = "#A44";
//     } else {
//       backGroundColor = "#f004";
//     }
//   } else {
//     if (hn.includes(num)) {
//       backGroundColor = "#444";
//     } else {
//       backGroundColor = "#0000";
//     }
//   }
//   return (
//     <AchievementSquareStyle
//       onClick={() => {
//         cb(ref, num);
//       }}
//       ref={ref}
//       style={{ backgroundColor: backGroundColor }}
//     >
//       {num}
//     </AchievementSquareStyle>
//   );
// };
// const AchievementWide = ({ num, complete }) => {
//   return (
//     <AchievementWideStyle
//       style={
//         complete
//           ? { backgroundColor: "green" }
//           : { backgroundColor: "transparent" }
//       }
//     >
//       {num}
//     </AchievementWideStyle>
//   );
// };
const AchievementSingleRow = styled.div`
  width: 100%;
  height: ${AchievementSize}px;
  display: flex;
`;
const AchievementDoubleRow = styled.div`
  height: ${AchievementSize * 2 + AchievementGap}px;
  display: flex;
  align-items: center;
`;

const AchievementPopupStyle = styled.div`
  box-sizing: border-box;

  position: absolute;
  color: white;
  padding: 10px;
  // margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  // float: left;
  // border: 1px solid white;
  // border-radius: 10px;
  // display: flex;
  // flex-wrap: wrap;
  // gap: 0px 10px;
  z-index: 10;
`;

const AchievementPopup = ({
  topPosition,
  leftPosition,
  width,
  height,
  visible,
  visibilityCallback,
  selectedNumber,
  achievementData,
}) => {
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

  return (
    <AchievementPopupStyle
      className="rounded"
      onMouseLeave={() => {
        visibilityCallback(false);
      }}
      style={{
        top: topPosition,
        left: leftPosition,
        // height: height,
        width: width,
        visibility: visible ? "visible" : "hidden",
      }}
    >
      {SelectedAchievement.map((element, index) => {
        let scalePercent = 50;
        if (CurrentStepNumber == index) scalePercent = 100;
        if (CurrentStepNumber == index + 1) scalePercent = 70;
        if (CurrentStepNumber == index - 1) scalePercent = 70;
        // if (CurrentStepNumber == index + 2) scalePercent = 60;
        // if (CurrentStepNumber == index - 2) scalePercent = 60;
        return (
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
        );
      })}

      <div style={{ fontSize: 10 }}>{uncompletedStatement}</div>

      {/* <div style={{}}>
        <PopupProgressBar />{" "}
      </div> */}
    </AchievementPopupStyle>
  );
};

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

const AchievementHeaderStyle = styled.div`
  height: 40px;
  display: flex;
  gap: 20px;
`;
const AchievementStyle = styled.div`
  // padding: 0px 0px 0px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  // flex-wrap: wrap;
  gap: 0px 10px;
  width: 100%;
  transition-property: padding;
  transition-duration: 0.5;
  overflow: hidden;
`;

// const ProgressDivStyle = styled.div`
//   position: relative;

//   border-radius: 0.5rem;
//   border: 1px solid white;
//   border-radius: 10px;
//   height: 7px;
//   overflow: hidden;
// `;
// const ProgressBarStyle = styled.div`
//   position: relative;

//   transform: translate(-50%, -0%);
//   background-color: #b35252;
//   height: 100%;
//   border-radius: 8px;
//   transition-duration: 3s;
//   transition-property: width;
// `;
// const ProgressBarTextStyle = styled.p`
//   position: relative;
//   margin: -${AchievementSize - 4}px 4px;
//   text-align: left;

//   z-index: 5;
// `;

// export var ProgressBar = ({ percent, displayValue }) => {
//   const [value, setValue] = React.useState(0);

//   React.useEffect(() => {
//     setValue(percent * 100);
//   }, [percent]);

//   return (
//     <ProgressDivStyle className="progress-div">
//       <ProgressBarStyle
//         style={{ width: `${map_range(value, 0, 100, 0, 200)}%` }}
//         className="progress"
//       ></ProgressBarStyle>
//       <ProgressBarTextStyle>{displayValue}</ProgressBarTextStyle>
//     </ProgressDivStyle>
//   );
// };

export default function Achievements({ userData }) {
  let achievementData = { values: userData["test"], locked: {} };

  let dailyLoadoutData = userData["daily_stats"]["top_loadout"];

  collectedAchievementData["total_games"] = 4;

  let totalPercentage = 0;
  for (let index = 0; index < 63; index++) {
    totalPercentage += achievementData.values[index.toString()];
  }

  let dailyItemUsage = {
    pulsar: false,
    nova: false,
    comet: false,
    meteor: false,
    repair: false,
    threat: false,
    energy: false,
    phase: false,
    detonator: false,
    stun: false,
    arcmine: false,
    instant: false,
  };
  if (dailyLoadoutData != undefined) {
    for (let index = 0; index < dailyLoadoutData.length; index++) {
      const element = dailyLoadoutData[index];
      if (element[1] == 0) {
        continue;
      }
      let itemID = parseInt(element[0]);
      switch (itemID >>> 4) {
        case 0:
          achievementData["locked"]["16"] = true;
          achievementData["locked"]["17"] = true;
          achievementData["locked"]["18"] = true;
          achievementData["locked"]["19"] = true;

          achievementData["locked"]["11"] = true;
          achievementData["locked"]["12"] = true;
          achievementData["locked"]["13"] = true;
          achievementData["locked"]["14"] = true;

          achievementData["locked"]["21"] = true;
          achievementData["locked"]["22"] = true;
          achievementData["locked"]["23"] = true;
          achievementData["locked"]["24"] = true;
          achievementData["locked"]["11"] = true;
          dailyItemUsage["pulsar"] = true;

          break;
        case 1:
          achievementData["locked"]["16"] = true;
          achievementData["locked"]["17"] = true;
          achievementData["locked"]["18"] = true;
          achievementData["locked"]["19"] = true;

          achievementData["locked"]["11"] = true;
          achievementData["locked"]["12"] = true;
          achievementData["locked"]["13"] = true;
          achievementData["locked"]["14"] = true;

          achievementData["locked"]["21"] = true;
          achievementData["locked"]["22"] = true;
          achievementData["locked"]["23"] = true;
          achievementData["locked"]["24"] = true;
          dailyItemUsage["nova"] = true;

          break;
        case 2:
          achievementData["locked"]["6"] = true;
          achievementData["locked"]["7"] = true;
          achievementData["locked"]["8"] = true;
          achievementData["locked"]["9"] = true;

          achievementData["locked"]["11"] = true;
          achievementData["locked"]["12"] = true;
          achievementData["locked"]["13"] = true;
          achievementData["locked"]["14"] = true;

          achievementData["locked"]["21"] = true;
          achievementData["locked"]["22"] = true;
          achievementData["locked"]["23"] = true;
          achievementData["locked"]["24"] = true;

          dailyItemUsage["comet"] = true;

          break;
        case 3:
          achievementData["locked"]["6"] = true;
          achievementData["locked"]["7"] = true;
          achievementData["locked"]["8"] = true;
          achievementData["locked"]["9"] = true;

          achievementData["locked"]["16"] = true;
          achievementData["locked"]["17"] = true;
          achievementData["locked"]["18"] = true;
          achievementData["locked"]["19"] = true;

          achievementData["locked"]["11"] = true;
          achievementData["locked"]["12"] = true;
          achievementData["locked"]["13"] = true;
          achievementData["locked"]["14"] = true;
          dailyItemUsage["meteor"] = true;
          break;
        default:
          break;
      }
      if (itemID >>> 4 == 0) {
      }
    }
  }
  const [hn, setHn] = useState([]);

  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [popupSize, setPopupSize] = useState({ width: 0, height: 0 });
  const [popupVisibility, setPopupVisibility] = useState(true);
  const [popupSelectedNumber, setPopupSelectedNumber] = useState(0);

  const [fullView, setFullView] = useState(false);

  var cb = (ref, selectedNumber, showPopup = true) => {
    console.log(ref);
    setPopupPosition({
      top: ref.current.offsetTop + ref.current.offsetHeight,
      left: ref.current.offsetLeft,
    });

    setPopupSize({
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    });
    setPopupVisibility(showPopup);
    setPopupSelectedNumber(selectedNumber);
  };

  const [selectedAchievementType, setSelectedAchievementType] =
    useState("daily");
  // achievementData.values["1"] = userData["team_id"] ? 1 : 0;
  // achievementData.values["2"] = userData["discord_name"] !== null ? 1 : 0;
  // achievementData.values["3"] = userData["about_string"] ? 1 : 0;
  // achievementData.values["4"] = userData["avatar"] ? 1 : 0;

  var communityTotal = 0;
  for (let index = 1; index <= 4; index++) {
    communityTotal += achievementData.values[index];
  }
  communityTotal /= 4;

  var dailyTotal = 0;
  for (let index = 5; index <= 29; index++) {
    dailyTotal += achievementData.values[index];
  }
  dailyTotal /= 25;

  var weeklyTotal = 0;
  for (let index = 30; index <= 54; index++) {
    weeklyTotal += achievementData.values[index];
  }
  weeklyTotal /= 25;

  var alltimeTotal = 0;
  for (let index = 54; index <= 79; index++) {
    alltimeTotal += achievementData.values[index];
  }
  alltimeTotal /= 25;

  return (
    <div
      className="padded rounded list"
      style={{
        height: fullView ? 2000 : 50,
        ...(fullView
          ? { padding: "10px 20px 20px", gap: "20px" }
          : { padding: "0px", gap: "0px" }),
        transitionProperty: "padding,height,gap",
        transitionDuration: "0.5s",
      }}
    >
      <div>{/* <div className="container-title">Challenges</div> */}</div>
      <AchievementPopup
        topPosition={popupPosition.top}
        leftPosition={popupPosition.left}
        width={popupSize.width}
        height={popupSize.height}
        visible={popupVisibility}
        visibilityCallback={setPopupVisibility}
        selectedNumber={popupSelectedNumber}
        achievementData={achievementData}
      />
      <div
        style={{ color: "white", cursor: "pointer" }}
        onClick={() => {
          setFullView(!fullView);
        }}
      >
        {" "}
        {/* <SegmentedProgressBar
          percent={totalPercentage / 62}
          displayValue={`${((totalPercentage / 62) * 100).toFixed(2)}%`}
          segments={[
            { percentage: 25 / 100, earned: ahData },
            { percentage: 50 / 100, earned: ahData },
            { percentage: 75 / 100, earned: ahData },
          ]}
          updateHoverCallback={setHn}
          selectedNumbers={[]}
        /> */}
        <div
          className="horizontal-container"
          style={{
            gap: fullView ? "" : "0px",
          }}
        >
          <MasterAchievementBar
            CommunityPercent={(communityTotal * 5) / 80}
            DailyPercent={(dailyTotal * 25) / 80}
            WeeklyPercent={(weeklyTotal * 25) / 80}
            SeasonPercent={(alltimeTotal * 25) / 80}
            // Percentage={achievementData.values["63"]}
            Title={""}
            Height={"50px"}
            EnableBorder={fullView}
          />

          <h3
            style={{
              margin: fullView ? "auto 10px" : "auto 0px",
              width: fullView ? "90px" : "0px",
              flexBasis: 0,
              transitionProperty: "margin,width",
              transitionDuration: "0.5s",
            }}
          >
            {/* {Math.round(
              (communityTotal * 5 +
                dailyTotal * 25 +
                weeklyTotal * 25 +
                alltimeTotal * 25) /
                0.008
            ) /
              100 +
              "%"} */}
          </h3>
        </div>
      </div>
      <div className="list" style={{ width: "70%", margin: "0 auto" }}>
        <div className="horizontal-container">
          <AchievementHeaderButton
            selectedAchievementType={selectedAchievementType}
            setSelectedAchievementType={setSelectedAchievementType}
            name={"community"}
            displayName={"Community"}
            progress={communityTotal}
            progressClass={"community-background"}
          />
          <AchievementHeaderButton
            selectedAchievementType={selectedAchievementType}
            setSelectedAchievementType={setSelectedAchievementType}
            name={"daily"}
            displayName={"Daily"}
            progress={dailyTotal}
            progressClass={"daily-background"}
          />
          <AchievementHeaderButton
            selectedAchievementType={selectedAchievementType}
            setSelectedAchievementType={setSelectedAchievementType}
            name={"weekly"}
            displayName={"Weekly"}
            progress={weeklyTotal}
            progressClass={"weekly-background"}
          />
          <AchievementHeaderButton
            selectedAchievementType={selectedAchievementType}
            setSelectedAchievementType={setSelectedAchievementType}
            name={"global"}
            displayName={"Season"}
            progress={alltimeTotal}
            progressClass={"season-background"}
          />
        </div>
        <AchievementLoadoutStats
          userData={userData}
          selectedAchievementType={selectedAchievementType}
          achievementData={achievementData}
          cb={cb}
        />
      </div>
    </div>
  );
}
