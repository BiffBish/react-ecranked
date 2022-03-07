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

const AchievementPopupStyle = styled.div`
  box-sizing: border-box;

  position: absolute;
  color: white;
  padding: 10px;
  // margin: 20px 10px 20px;
  background-color: #222;
  color: white;

  z-index: 10;
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

  let lockedAchievements = [];

  userData.daily_stats.top_loadout.every((element) => {
    if (element[1] == 0) return false;
    let loadoutNumber = parseInt(element[0]);
    console.log(loadoutNumber.toString(2));
    console.log(((loadoutNumber >> 2) & 3).toString(2));
    // console.log((loadoutNumber & 3).toString(2));

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
          cb={cb}
          lockedAchievements={lockedAchievements}
        />
      </div>
    </div>
  );
}
