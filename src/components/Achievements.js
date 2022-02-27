import { height } from "@mui/system";
import React, { useState } from "react";
import styled from "styled-components";
import { AchievementHeaderButton } from "./achievements/AchievementHeaderButton";
import { AchievementLoadoutStats } from "./achievements/AchievementLoadoutStats";
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
  position: absolute;
  color: white;
  padding: 10px;
  // margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  // float: left;
  border: 1px solid white;
  border-radius: 10px;
  // display: flex;
  // flex-wrap: wrap;
  // gap: 0px 10px;
  z-index: 10;
`;

const AchievementPopup = ({
  topPosition,
  leftPosition,
  visible,
  visibilityCallback,
  selectedNumber,
  achievementData,
}) => {
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
  return (
    <AchievementPopupStyle
      onMouseLeave={() => {
        visibilityCallback(false);
      }}
      style={{
        top: topPosition,
        left: leftPosition,
        visibility: visible ? "visible" : "hidden",
      }}
    >
      <div style={{ fontSize: 20 }}>{SelectedAchievement.Title}</div>
      <div style={{ fontSize: 10, padding: "0px 0px 10px" }}>
        {SelectedAchievement.Description}
      </div>
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
  achievementData.values["63"] = totalPercentage / 64;
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
  const [popupVisibility, setPopupVisibility] = useState(true);
  const [popupSelectedNumber, setPopupSelectedNumber] = useState(0);

  const [fullView, setFullView] = useState(false);

  var cb = (ref, selectedNumber) => {
    console.log(ref);
    setPopupPosition({
      top: ref.current.offsetTop + ref.current.offsetHeight,
      left: ref.current.offsetLeft,
    });
    setPopupVisibility(true);
    setPopupSelectedNumber(selectedNumber);
  };

  const [selectedAchievementType, setSelectedAchievementType] =
    useState("daily");

  var dailyTotal = 0;
  for (let index = 5; index < 22; index++) {
    dailyTotal += achievementData.values[index];
  }
  dailyTotal /= 17;

  var weeklyTotal = 0;
  for (let index = 22; index < 44; index++) {
    weeklyTotal += achievementData.values[index];
  }
  weeklyTotal /= 14;

  var alltimeTotal = 0;
  for (let index = 44; index < 63; index++) {
    alltimeTotal += achievementData.values[index];
  }
  alltimeTotal /= 19;

  const SegmentedAchievementProgressBar = ({ AN: AchievementNumber }) => {
    return (
      <SegmentedProgressBar
        Title={achievementFormatingData[AchievementNumber.toString()].Title}
        Percentage={achievementData.values[AchievementNumber.toString()] * 100}
      />
    );
  };

  return (
    <AchievementStyle
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
        <SegmentedProgressBar
          Percentage={achievementData.values["63"]}
          Title={""}
          Height={"50px"}
          EnableBorder={fullView}
        />
      </div>
      <AchievementHeaderStyle>
        <AchievementHeaderButton
          selectedAchievementType={selectedAchievementType}
          setSelectedAchievementType={setSelectedAchievementType}
          name={"daily"}
          displayName={"Daily"}
          progress={dailyTotal}
        />
        <AchievementHeaderButton
          selectedAchievementType={selectedAchievementType}
          setSelectedAchievementType={setSelectedAchievementType}
          name={"weekly"}
          displayName={"Weekly"}
          progress={weeklyTotal}
        />
        <AchievementHeaderButton
          selectedAchievementType={selectedAchievementType}
          setSelectedAchievementType={setSelectedAchievementType}
          name={"global"}
          displayName={"All time"}
          progress={alltimeTotal}
        />
      </AchievementHeaderStyle>
      <AchievementLoadoutStats
        selectedAchievementType={selectedAchievementType}
        ahData={achievementData}
      />
      {selectedAchievementType === "daily"
        ? // <AchievementsContainer>
          //   <LeftAchievementCollumn>
          //     <SegmentedAchievementProgressBar AN={5} />
          //     <SegmentedAchievementProgressBar AN={6} />
          //     <SegmentedAchievementProgressBar AN={7} />
          //     <SegmentedAchievementProgressBar AN={8} />
          //     <SegmentedAchievementProgressBar AN={9} />
          //     <SegmentedAchievementProgressBar AN={10} />
          //     <SegmentedAchievementProgressBar AN={11} />
          //     <SegmentedAchievementProgressBar AN={12} />
          //     <SegmentedAchievementProgressBar AN={13} />
          //     <SegmentedAchievementProgressBar AN={14} />
          //     <SegmentedAchievementProgressBar AN={15} />
          //     <SegmentedAchievementProgressBar AN={16} />
          //   </LeftAchievementCollumn>
          // </AchievementsContainer>
          null
        : null}
      {selectedAchievementType === "weekly"
        ? // <AchievementsContainer>
          //   <LeftAchievementCollumn>
          //     <SegmentedAchievementProgressBar AN={22} />
          //     <SegmentedAchievementProgressBar AN={23} />
          //     <SegmentedAchievementProgressBar AN={24} />
          //     <SegmentedAchievementProgressBar AN={25} />
          //     <SegmentedAchievementProgressBar AN={26} />
          //     <SegmentedAchievementProgressBar AN={27} />
          //     <SegmentedAchievementProgressBar AN={28} />
          //     <SegmentedAchievementProgressBar AN={29} />
          //     <SegmentedAchievementProgressBar AN={30} />
          //     <SegmentedAchievementProgressBar AN={31} />
          //     <SegmentedAchievementProgressBar AN={43} />
          //   </LeftAchievementCollumn>

          //   {/* <RightAchievementCollumn></RightAchievementCollumn> */}
          // </AchievementsContainer>
          null
        : null}
      {selectedAchievementType === "global"
        ? // <AchievementsContainer>
          //   <LeftAchievementCollumn>
          //     <SegmentedAchievementProgressBar AN={44} />
          //     <SegmentedAchievementProgressBar AN={45} />
          //     <SegmentedAchievementProgressBar AN={46} />
          //     <SegmentedAchievementProgressBar AN={47} />
          //     <SegmentedAchievementProgressBar AN={48} />
          //     <SegmentedAchievementProgressBar AN={49} />
          //     <SegmentedAchievementProgressBar AN={50} />
          //     <SegmentedAchievementProgressBar AN={51} />
          //     <SegmentedAchievementProgressBar AN={52} />
          //     <SegmentedAchievementProgressBar AN={53} />
          //     <SegmentedAchievementProgressBar AN={54} />
          //     <SegmentedAchievementProgressBar AN={55} />
          //   </LeftAchievementCollumn>
          // </AchievementsContainer>
          null
        : null}
    </AchievementStyle>
  );
}
