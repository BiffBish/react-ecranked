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
export const LeftAchievementCollumn = styled.div`
  display: flex;
  flex: 200px 2;
  background-color: transparent;
  margin: 0px ${AchievementGap}px 0px 0px;
  gap: ${AchievementGap}px 0px;
  flex-wrap: wrap;
  flex-direction: column;
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
  if (userData["test"] === undefined) achievementData.values = {};

  let dailyLoadoutData = userData["daily_stats"]["top_loadout"];

  collectedAchievementData["total_games"] = 4;

  let totalPercentage = 0;
  for (let index = 0; index < 63; index++) {
    totalPercentage += achievementData.values[index.toString()];
  }

  let lockedAchievements = [];
  if (userData.daily_stats.top_loadout) {
    userData.daily_stats.top_loadout.every((element) => {
      if (element[1] == 0) return false;
      let loadoutNumber = parseInt(element[0]);

      if (!(loadoutNumber >> 4 == 0)) lockedAchievements[5] = true;
      if (!(loadoutNumber >> 4 == 1)) lockedAchievements[6] = true;
      if (!(loadoutNumber >> 4 == 2)) lockedAchievements[7] = true;
      if (!(loadoutNumber >> 4 == 3)) lockedAchievements[8] = true;

      if (!(((loadoutNumber >> 2) & 3) == 0)) lockedAchievements[9] = true;
      if (!(((loadoutNumber >> 2) & 3) == 1)) lockedAchievements[10] = true;
      if (!(((loadoutNumber >> 2) & 3) == 2)) lockedAchievements[11] = true;
      if (!(((loadoutNumber >> 2) & 3) == 3)) lockedAchievements[12] = true;

      if (!((loadoutNumber & 3) == 0)) lockedAchievements[13] = true;
      if (!((loadoutNumber & 3) == 1)) lockedAchievements[14] = true;
      if (!((loadoutNumber & 3) == 2)) lockedAchievements[15] = true;
      if (!((loadoutNumber & 3) == 3)) lockedAchievements[16] = true;
      return true;
    });
  }
  if (userData.weekly_stats.top_loadout) {
    userData.weekly_stats.top_loadout.every((element) => {
      if (element[1] == 0) return false;
      let loadoutNumber = parseInt(element[0]);

      if (!(loadoutNumber >> 4 == 0)) lockedAchievements[30] = true;
      if (!(loadoutNumber >> 4 == 1)) lockedAchievements[31] = true;
      if (!(loadoutNumber >> 4 == 2)) lockedAchievements[32] = true;
      if (!(loadoutNumber >> 4 == 3)) lockedAchievements[33] = true;

      if (!(((loadoutNumber >> 2) & 3) == 0)) lockedAchievements[34] = true;
      if (!(((loadoutNumber >> 2) & 3) == 1)) lockedAchievements[35] = true;
      if (!(((loadoutNumber >> 2) & 3) == 2)) lockedAchievements[36] = true;
      if (!(((loadoutNumber >> 2) & 3) == 3)) lockedAchievements[37] = true;

      if (!((loadoutNumber & 3) == 0)) lockedAchievements[38] = true;
      if (!((loadoutNumber & 3) == 1)) lockedAchievements[39] = true;
      if (!((loadoutNumber & 3) == 2)) lockedAchievements[40] = true;
      if (!((loadoutNumber & 3) == 3)) lockedAchievements[41] = true;
      return true;
    });
  }
  const [fullView, setFullView] = useState(false);

  const [selectedAchievementType, setSelectedAchievementType] =
    useState("daily");

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
      {/* <AchievementPopup
        topPosition={popupPosition.top}
        leftPosition={popupPosition.left}
        width={popupSize.width}
        height={popupSize.height}
        visible={popupVisibility}
        visibilityCallback={setPopupVisibility}
        selectedNumber={popupSelectedNumber}
        achievementData={achievementData}
        lockedAchievements={lockedAchievements}
      /> */}
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
          lockedAchievements={lockedAchievements}
        />
      </div>
    </div>
  );
}
