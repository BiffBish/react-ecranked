import { height } from "@mui/system";
import React, { useRef, useState } from "react";
import styled from "styled-components";
var achievementData = require("./AchievementData.json");
function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}
var collectedAchievementData = {};
const AchievementSize = 35;
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
  percent,
  displayValue,
  segments,
  selectedNumbers,
  updateHoverCallback,
  fullWidth = false,
  height = AchievementSize - 4,
}) => {
  const [value, setValue] = React.useState(0);
  const barRef = useRef();
  const [backgroundHighlighted, setBackgroundHighlighted] =
    React.useState(false);
  React.useEffect(() => {
    setValue(percent * 100);
  }, [percent]);
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
        updateHoverCallback(selectedNumbers);
        setBackgroundHighlighted(true);
      }}
      onMouseLeave={() => {
        updateHoverCallback([]);
        setBackgroundHighlighted(false);
      }}
    >
      {displayValue}
      <ProgressDivStyle
        className="progress-div"
        style={fullWidth ? { height: "7px" } : { height: "7px" }}
        ref={barRef}
      >
        <ProgressBarStyle
          style={{ width: `${map_range(value, 0, 100, 0, 200)}%` }}
          className="progress"
        ></ProgressBarStyle>
        <ProgressBarTextStyle></ProgressBarTextStyle>
        {segments.map((segment) => {
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
        })}
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

const AchievementSquare = ({ num, data, cb, hn = [] }) => {
  var ref = React.useRef();
  let backGroundColor = "#A44";

  if (data["complete"][num.toString()]) {
    if (hn.includes(num)) {
      backGroundColor = "#4A4";
    } else {
      backGroundColor = "#008000ff";
    }
  } else if (data["locked"][num.toString()]) {
    if (hn.includes(num)) {
      backGroundColor = "#A44";
    } else {
      backGroundColor = "#f004";
    }
  } else {
    if (hn.includes(num)) {
      backGroundColor = "#444";
    } else {
      backGroundColor = "#0000";
    }
  }
  return (
    <AchievementSquareStyle
      onClick={() => {
        cb(ref, num);
      }}
      ref={ref}
      style={{ backgroundColor: backGroundColor }}
    >
      {num}
    </AchievementSquareStyle>
  );
};
const AchievementWide = ({ num, complete }) => {
  return (
    <AchievementWideStyle
      style={
        complete
          ? { backgroundColor: "green" }
          : { backgroundColor: "transparent" }
      }
    >
      {num}
    </AchievementWideStyle>
  );
};
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
`;

const AchievementPopup = ({
  topPosition,
  leftPosition,
  visible,
  visibilityCallback,
  selectedNumber,
}) => {
  let SelectedAchievement = achievementData[selectedNumber];
  let SelectedAchievementDataName = SelectedAchievement.progressDataName;
  let NumberEarned = null;
  if (SelectedAchievementDataName != undefined) {
    NumberEarned = collectedAchievementData[SelectedAchievementDataName];
  }

  let MaxNumber = SelectedAchievement.progressTotal;

  const PopupProgressBar = () => {
    if (NumberEarned != null) {
      return (
        <SegmentedProgressBar
          percent={NumberEarned / MaxNumber}
          segments={[{ percentage: 999, earned: false }]}
          updateHoverCallback={() => {}}
        />
      );
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
      <div style={{ fontSize: 20 }}>{SelectedAchievement.title}</div>
      <div style={{ fontSize: 10, padding: "0px 0px 10px" }}>
        {SelectedAchievement.description}
      </div>
      <div style={{ fontSize: 10 }}>{uncompletedStatement}</div>

      <div style={{ height: "10px" }}>
        <PopupProgressBar />{" "}
      </div>
    </AchievementPopupStyle>
  );
};

export default function Achievements({ userData }) {
  let ahData = { complete: userData["test"], locked: {} };

  let dailyLoadoutData = userData["daily_stats"]["top_loadout"];

  collectedAchievementData["total_games"] = 4;

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
    setPopupPosition({
      top: ref.current.offsetTop + ref.current.offsetWidth,
      left: ref.current.offsetLeft,
    });
    setPopupVisibility(true);
    setPopupSelectedNumber(selectedNumber);
  };

  return (
    <>
      <div style={{ margin: ` 0px 0px ${AchievementGap}px` }}>
        {" "}
        <SegmentedProgressBar
          percent={userData["daily_stats"]["total_games"] / 53}
          displayValue={`${userData["daily_stats"]["total_games"]}`}
          segments={[
            { percentage: 5 / 53, earned: ahData },
            { percentage: 10 / 53, earned: ahData },
            { percentage: 15 / 53, earned: ahData },
            { percentage: 20 / 53, earned: ahData },
            { percentage: 25 / 53, earned: ahData },
            { percentage: 30 / 53, earned: ahData },
            { percentage: 35 / 53, earned: ahData },
            { percentage: 40 / 53, earned: ahData },
            { percentage: 45 / 53, earned: ahData },
            { percentage: 50 / 53, earned: ahData },
          ]}
          updateHoverCallback={setHn}
          selectedNumbers={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
        />
      </div>

      <AchievementsContainer>
        <LeftAchievementCollumn>
          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`weapons`}
              segments={[{ percentage: 4 / 4.2, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[6]}
            />
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`tac-mods`}
              segments={[{ percentage: 4 / 4.2, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[7]}
            />
          </AchievementSingleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["daily_stats"]["total_games"] / 17}
              displayValue={"pulsar:" + userData["daily_stats"]["total_games"]}
              fullWidth={true}
              segments={[
                { percentage: 1 / 17, earned: ahData },
                { percentage: 5 / 17, earned: ahData },
                { percentage: 10 / 17, earned: ahData },
                { percentage: 15 / 17, earned: ahData },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[6, 7, 8, 9]}
            />
          </AchievementDoubleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["daily_stats"]["total_games"] / 17}
              displayValue={"nova:" + userData["daily_stats"]["total_games"]}
              fullWidth={true}
              segments={[
                { percentage: 1 / 17, earned: ahData },
                { percentage: 5 / 17, earned: ahData },
                { percentage: 10 / 17, earned: ahData },
                { percentage: 15 / 17, earned: ahData },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[11, 12, 13, 14]}
            />
          </AchievementDoubleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 28}
              displayValue={`repair matrix`}
              segments={[{ percentage: 25 / 28, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[51]}
            />
            <SegmentedProgressBar
              percent={1 / 28}
              displayValue={`threat scanner`}
              segments={[{ percentage: 25 / 28, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[52]}
            />
          </AchievementSingleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`energy barrier`}
              segments={[{ percentage: 4 / 4.2, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[53]}
            />

            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`phase shift`}
              segments={[{ percentage: 4 / 4.2, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[54]}
            />
          </AchievementSingleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["weekly_stats"]["percent_close_mate"] / 0.55}
              displayValue={`${
                userData["weekly_stats"]["percent_close_mate"] * 100
              }%`}
              segments={[
                { percentage: 20 / 55, earned: ahData },
                { percentage: 30 / 55, earned: ahData },
                { percentage: 40 / 55, earned: ahData },
                { percentage: 50 / 55, earned: ahData },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[16, 17, 18, 19]}
            />
          </AchievementDoubleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={userData["weekly_stats"]["payload_games"] / 55}
              displayValue={`capture point :${userData["weekly_stats"]["payload_games"]}`}
              segments={[
                { percentage: 25 / 55, earned: ahData },
                { percentage: 50 / 55, earned: ahData },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[36, 37]}
            />
          </AchievementSingleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={userData["stats"]["dyson_games"] / 110}
              displayValue={`dyson: ${userData["stats"]["dyson_games"]}`}
              segments={[{ percentage: 100 / 110, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[46]}
            />
            <SegmentedProgressBar
              percent={userData["stats"]["combustion_games"] / 110}
              displayValue={`combustion: ${userData["stats"]["combustion_games"]}`}
              segments={[{ percentage: 100 / 110, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[47]}
            />
          </AchievementSingleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["stats"]["percent_upsidedown"] / 0.5}
              displayValue={`inverted: ${userData["stats"]["percent_upsidedown"]}%`}
              segments={[
                { percentage: 5 / 50, earned: ahData },
                { percentage: 10 / 50, earned: ahData },
                { percentage: 25 / 50, earned: ahData },
                { percentage: 40 / 50, earned: ahData },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[56, 57, 58, 59]}
            />
          </AchievementDoubleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["weekly_stats"]["average_speed"] / 5}
              displayValue={`Average Speed: ${userData["weekly_stats"]["average_speed"]}m/s`}
              segments={[
                { percentage: 3.0 / 5, earned: ahData },
                { percentage: 3.5 / 5, earned: ahData },
                { percentage: 4.0 / 5, earned: ahData },
                { percentage: 4.5 / 5, earned: ahData },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[81, 82, 83, 84]}
            />
          </AchievementDoubleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["weekly_stats"]["average_deaths"] / 9}
              displayValue={`Average Deaths: ${userData["weekly_stats"]["average_deaths"]}`}
              segments={[
                { percentage: 8 / 9, earned: ahData },
                { percentage: 7 / 9, earned: ahData },
                { percentage: 6 / 9, earned: ahData },
                { percentage: 5 / 9, earned: ahData },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[76, 77, 78, 79]}
            />
          </AchievementDoubleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={0 / 1.4}
              displayValue={`Loadout Stuff%`}
              segments={[
                { percentage: 0.5 / 1.4, earned: ahData },
                { percentage: 0.75 / 1.4, earned: ahData },
                { percentage: 1.0 / 1.4, earned: ahData },
                { percentage: 1.25 / 1.4, earned: ahData },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[96, 97, 98, 99]}
            />
          </AchievementDoubleRow>
        </LeftAchievementCollumn>
        <CenterAchievementCollumn>
          <AchievementSquare num={1} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={2} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={0} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={3} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={4} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={6} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={11} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={5} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={16} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={21} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={7} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={12} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={10} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={17} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={22} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={8} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={13} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={15} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={18} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={23} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={9} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={14} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={20} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={19} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={24} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={33} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={34} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={25} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={44} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={43} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={51} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={52} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={30} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={61} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={62} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={53} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={54} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={35} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={63} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={64} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={16} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={17} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={40} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={27} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={26} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={18} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={19} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={45} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={29} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={28} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={36} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={37} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={50} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={38} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={39} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={46} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={47} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={55} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={48} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={49} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={56} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={57} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={60} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={92} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={91} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={58} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={59} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={65} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={94} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={93} data={ahData} hn={hn} cb={cb} />

          <AchievementWide num={65} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={58} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={59} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={65} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={94} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={93} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={81} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={82} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={70} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={72} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={71} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={83} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={84} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={75} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={74} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={73} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={76} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={77} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={80} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={87} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={86} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={78} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={79} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={85} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={89} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={88} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={96} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={97} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={90} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={67} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={66} data={ahData} hn={hn} cb={cb} />

          <AchievementSquare num={98} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={99} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={95} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={69} data={ahData} hn={hn} cb={cb} />
          <AchievementSquare num={68} data={ahData} hn={hn} cb={cb} />
          <AchievementWide num={100} data={ahData} hn={hn} cb={cb} />
          <AchievementWide num={101} data={ahData} hn={hn} cb={cb} />
        </CenterAchievementCollumn>
        <RightAchievementCollumn>
          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`ordnances`}
              segments={[{ percentage: 4 / 4.2, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[8]}
            />
            <SegmentedProgressBar
              percent={1 / 16.4}
              displayValue={`equipables`}
              segments={[{ percentage: 16 / 16.8, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[9]}
            />
          </AchievementSingleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["daily_stats"]["total_games"] / 17}
              displayValue={"comet:" + userData["daily_stats"]["total_games"]}
              fullWidth={true}
              segments={[
                { percentage: 1 / 17, earned: ahData },
                { percentage: 5 / 17, earned: ahData },
                { percentage: 10 / 17, earned: ahData },
                { percentage: 15 / 17, earned: ahData },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[16, 17, 18, 19]}
            />
          </AchievementDoubleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["daily_stats"]["total_games"] / 17}
              displayValue={"meteor:" + userData["daily_stats"]["total_games"]}
              fullWidth={true}
              segments={[
                { percentage: 1 / 17, earned: ahData },
                { percentage: 5 / 17, earned: ahData },
                { percentage: 10 / 17, earned: ahData },
                { percentage: 15 / 17, earned: ahData },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[21, 22, 23, 24]}
            />
          </AchievementDoubleRow>
          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 28}
              displayValue={`detonator`}
              segments={[{ percentage: 25 / 28, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[61]}
            />
            <SegmentedProgressBar
              percent={1 / 28}
              displayValue={`stun field`}
              segments={[{ percentage: 25 / 28, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[62]}
            />
          </AchievementSingleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`arcmine`}
              segments={[{ percentage: 4 / 4.2, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[63]}
            />
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`instant repair`}
              segments={[{ percentage: 4 / 4.2, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[64]}
            />
          </AchievementSingleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["weekly_stats"]["percent_close_enemy"] / 0.042}
              displayValue={`${
                userData["weekly_stats"]["percent_close_enemy"] * 100
              }%`}
              segments={[
                { percentage: 1 / 4.2, earned: ahData },
                { percentage: 2 / 4.2, earned: ahData },
                { percentage: 3 / 4.2, earned: ahData },
                { percentage: 4 / 4.2, earned: ahData },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[26, 27, 28, 29]}
            />
          </AchievementDoubleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={userData["weekly_stats"]["payload_games"] / 55}
              displayValue={`payload: ${userData["weekly_stats"]["payload_games"]}`}
              segments={[
                { percentage: 25 / 55, earned: ahData },
                { percentage: 50 / 55, earned: ahData },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[38, 39]}
            />
          </AchievementSingleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={userData["stats"]["fission_games"] / 110}
              displayValue={`fission: ${userData["stats"]["fission_games"]}`}
              segments={[{ percentage: 100 / 110, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[48]}
            />
            <SegmentedProgressBar
              percent={userData["stats"]["surge_games"] / 110}
              displayValue={`surge: ${userData["stats"]["surge_games"]}`}
              segments={[{ percentage: 100 / 110, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[49]}
            />
          </AchievementSingleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={0 / 50}
              displayValue={`Both hands stuff`}
              segments={[
                { percentage: 5 / 50, earned: ahData },
                { percentage: 10 / 50, earned: ahData },
                { percentage: 25 / 50, earned: ahData },
                { percentage: 40 / 50, earned: ahData },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[91, 92, 93, 94]}
            />
          </AchievementDoubleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["daily_stats"]["top_speed"] / 38}
              displayValue={`${userData["daily_stats"]["top_speed"]}m/s`}
              segments={[
                { percentage: 20 / 38, earned: ahData },
                { percentage: 25 / 38, earned: ahData },
                { percentage: 30 / 38, earned: ahData },
                { percentage: 35 / 38, earned: ahData },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[71, 72, 73, 74]}
            />
          </AchievementDoubleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["stats"]["total_deaths"] / 4200}
              displayValue={`${userData["stats"]["total_deaths"]}`}
              segments={[
                { percentage: 500 / 4200, earned: ahData },
                { percentage: 1000 / 4200, earned: ahData },
                { percentage: 2000 / 4200, earned: ahData },
                { percentage: 4000 / 4200, earned: ahData },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[86, 87, 88, 89]}
            />
          </AchievementDoubleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`arcmine`}
              segments={[{ percentage: 4 / 4.2, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[67]}
            />
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`instant repair`}
              segments={[{ percentage: 4 / 4.2, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[66]}
            />
          </AchievementSingleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`arcmine`}
              segments={[{ percentage: 4 / 4.2, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[69]}
            />
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`instant repair`}
              segments={[{ percentage: 4 / 4.2, earned: ahData }]}
              updateHoverCallback={setHn}
              selectedNumbers={[68]}
            />
          </AchievementSingleRow>
        </RightAchievementCollumn>
      </AchievementsContainer>
      <AchievementPopup
        topPosition={popupPosition.top}
        leftPosition={popupPosition.left}
        visible={popupVisibility}
        visibilityCallback={setPopupVisibility}
        selectedNumber={popupSelectedNumber}
      />
    </>
  );
}
