import { height } from "@mui/system";
import React, { useRef, useState } from "react";
import styled from "styled-components";
var achievementFormatingData = require("./AchievementData.json");
function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}
var collectedAchievementData = {};
const AchievementSize = 40;
const AchievementGap = 5;

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
  margin: -${AchievementSize - 4}px 4px;
  text-align: left;

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

const SegmentOfProgressBar = styled.div`
  width: 2px;
  position: absolute;
  z-index: 10;
  height: 10px;
  opacity: 100%;
  background-color: white;
  top: 0px;
`;

const SegmentedProgressBarContainerStyle = styled.div`
  height: ${AchievementSize}px;

  display: flex;
  flex-direction: column;
  line-height: 16px;
  flex-grow: 1;
  transition-property: background-color;
  transition-duration: 0.2f;
  flex-basis: 0;
`;
export var SegmentedProgressBar = ({
  AN: AchievementNumber,
  AD: AchievementData,
  uHC: updateHoverCallback = () => {},
  height = AchievementSize - 4,
  cb = () => {},
}) => {
  const [value, setValue] = React.useState(0);
  const barRef = useRef();
  const fullRef = useRef();

  const [backgroundHighlighted, setBackgroundHighlighted] =
    React.useState(false);
  React.useEffect(() => {
    setValue(AchievementData.values[AchievementNumber.toString()] * 100);
  }, [AchievementData, AchievementNumber]);
  function getWidth() {
    if (barRef.current === undefined) {
      return 1;
    }
    return barRef.current.getBoundingClientRect().width;
  }
  return (
    <SegmentedProgressBarContainerStyle
      style={
        backgroundHighlighted
          ? {
              backgroundColor: "#fff4",
            }
          : {
              backgroundColor: "#fff0",
            }
      }
      onMouseEnter={() => {
        updateHoverCallback(AchievementNumber);
        setBackgroundHighlighted(true);
        cb(fullRef, AchievementNumber);
      }}
      onMouseLeave={() => {
        updateHoverCallback([]);
        setBackgroundHighlighted(false);
      }}
      ref={fullRef}
    >
      {/* {AchievementNumber} */}
      {achievementFormatingData[AchievementNumber.toString()].Title}
      <ProgressDivStyle
        className="progress-div"
        style={{ height: "7px" }}
        ref={barRef}
      >
        <ProgressBarStyle
          style={{ width: `${map_range(value, 0, 100, 0, 200)}%` }}
          className="progress"
        ></ProgressBarStyle>
        <ProgressBarTextStyle></ProgressBarTextStyle>
        {/* {segments.map((segment) => {
          return (
            <SegmentOfProgressBar
              style={{
                backgroundColor: segment.earned ? `green` : `white`,
                transform: `translate(${
                  segment.percentage * 100 * 0.5 * getWidth()
                }%, 0%)`,
              }}
            />
          );
        })} */}
      </ProgressDivStyle>
    </SegmentedProgressBarContainerStyle>
  );
};

const AchievementsContainer = styled.div`
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
const LeftAchievementCollumn = styled.div`
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

export default function Achievements({ userData }) {
  let ahData = { values: userData["test"], locked: {} };

  let dailyLoadoutData = userData["daily_stats"]["top_loadout"];

  collectedAchievementData["total_games"] = 4;

  let totalPercentage = 0;
  for (let index = 0; index < 63; index++) {
    totalPercentage += ahData.values[index.toString()];
  }
  ahData.values["63"] = totalPercentage / 64;
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
          ahData["locked"]["16"] = true;
          ahData["locked"]["17"] = true;
          ahData["locked"]["18"] = true;
          ahData["locked"]["19"] = true;

          ahData["locked"]["11"] = true;
          ahData["locked"]["12"] = true;
          ahData["locked"]["13"] = true;
          ahData["locked"]["14"] = true;

          ahData["locked"]["21"] = true;
          ahData["locked"]["22"] = true;
          ahData["locked"]["23"] = true;
          ahData["locked"]["24"] = true;
          ahData["locked"]["11"] = true;
          dailyItemUsage["pulsar"] = true;

          break;
        case 1:
          ahData["locked"]["16"] = true;
          ahData["locked"]["17"] = true;
          ahData["locked"]["18"] = true;
          ahData["locked"]["19"] = true;

          ahData["locked"]["11"] = true;
          ahData["locked"]["12"] = true;
          ahData["locked"]["13"] = true;
          ahData["locked"]["14"] = true;

          ahData["locked"]["21"] = true;
          ahData["locked"]["22"] = true;
          ahData["locked"]["23"] = true;
          ahData["locked"]["24"] = true;
          dailyItemUsage["nova"] = true;

          break;
        case 2:
          ahData["locked"]["6"] = true;
          ahData["locked"]["7"] = true;
          ahData["locked"]["8"] = true;
          ahData["locked"]["9"] = true;

          ahData["locked"]["11"] = true;
          ahData["locked"]["12"] = true;
          ahData["locked"]["13"] = true;
          ahData["locked"]["14"] = true;

          ahData["locked"]["21"] = true;
          ahData["locked"]["22"] = true;
          ahData["locked"]["23"] = true;
          ahData["locked"]["24"] = true;

          dailyItemUsage["comet"] = true;

          break;
        case 3:
          ahData["locked"]["6"] = true;
          ahData["locked"]["7"] = true;
          ahData["locked"]["8"] = true;
          ahData["locked"]["9"] = true;

          ahData["locked"]["16"] = true;
          ahData["locked"]["17"] = true;
          ahData["locked"]["18"] = true;
          ahData["locked"]["19"] = true;

          ahData["locked"]["11"] = true;
          ahData["locked"]["12"] = true;
          ahData["locked"]["13"] = true;
          ahData["locked"]["14"] = true;
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

  return (
    <>
      <AchievementPopup
        topPosition={popupPosition.top}
        leftPosition={popupPosition.left}
        visible={popupVisibility}
        visibilityCallback={setPopupVisibility}
        selectedNumber={popupSelectedNumber}
        achievementData={ahData}
      />
      <div style={{ margin: ` 0px 0px ${AchievementGap}px`, color: "white" }}>
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
        <SegmentedProgressBar AN={63} uHC={setHn} AD={ahData} />
      </div>
      <StatChoiceStyle>
        <StatChoiceButton
          style={
            popupSelectedNumber === "daily" ? { backgroundColor: "#333" } : {}
          }
          onClick={() => {
            setPopupSelectedNumber("daily");
          }}
        >
          Daily
        </StatChoiceButton>
        <StatChoiceButton
          style={
            popupSelectedNumber === "weekly" ? { backgroundColor: "#333" } : {}
          }
          onClick={() => {
            setPopupSelectedNumber("weekly");
          }}
        >
          Weekly
        </StatChoiceButton>
        <StatChoiceButton
          style={
            popupSelectedNumber === "global" ? { backgroundColor: "#333" } : {}
          }
          onClick={() => {
            setPopupSelectedNumber("global");
          }}
        >
          All time
        </StatChoiceButton>
      </StatChoiceStyle>
      {selectedAchievementType === "daily" ? (
        <AchievementsContainer>
          <LeftAchievementCollumn>
            <SegmentedProgressBar AN={21} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={0} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={1} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={2} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={3} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={4} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={5} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={6} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={7} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={8} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={9} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={10} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={11} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={12} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={13} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={14} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={15} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={16} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={17} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={18} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={19} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={20} uHC={setHn} AD={ahData} cb={cb} />
          </LeftAchievementCollumn>
        </AchievementsContainer>
      ) : null}
      {selectedAchievementType === "weekly" ? (
        <AchievementsContainer>
          <LeftAchievementCollumn>
            <SegmentedProgressBar AN={43} uHC={setHn} AD={ahData} cb={cb} />

            <SegmentedProgressBar AN={22} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={23} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={24} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={25} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={26} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={27} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={28} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={29} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={30} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={31} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={43} uHC={setHn} AD={ahData} cb={cb} />

            <SegmentedProgressBar AN={32} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={33} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={34} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={35} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={36} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={37} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={38} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={39} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={40} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={41} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={42} uHC={setHn} AD={ahData} cb={cb} />
          </LeftAchievementCollumn>

          {/* <RightAchievementCollumn></RightAchievementCollumn> */}
        </AchievementsContainer>
      ) : null}
      {selectedAchievementType === "global" ? (
        <AchievementsContainer>
          <LeftAchievementCollumn>
            <SegmentedProgressBar AN={62} uHC={setHn} AD={ahData} cb={cb} />

            <SegmentedProgressBar AN={44} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={45} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={46} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={47} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={48} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={49} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={50} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={51} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={52} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={53} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={54} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={55} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={56} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={57} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={58} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={59} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={60} uHC={setHn} AD={ahData} cb={cb} />
            <SegmentedProgressBar AN={61} uHC={setHn} AD={ahData} cb={cb} />
          </LeftAchievementCollumn>
        </AchievementsContainer>
      ) : null}
    </>
  );
}
