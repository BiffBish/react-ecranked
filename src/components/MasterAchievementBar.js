/* eslint-disable */

import React, { useRef } from "react";
import styled from "styled-components";
var achievementFormatingData = require("./AchievementData.json");

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}
const AchievementSize = 40;
export const MasterAchievementBar = ({
  Title,
  Height = AchievementSize - 4,
  EnableBorder = true,
  DailyPercent = 0.25,
  WeeklyPercent = 0.25,
  SeasonPercent = 0.25,
  CommunityPercent = 0.25,
  totalPercent = 0,
  clickMe = false,
}) => {
  const [communityValue, setCommunityValue] = React.useState(0);
  const [dailyValue, setDailyValue] = React.useState(0);
  const [weeklyValue, setWeeklyValue] = React.useState(0);
  const [seasonValue, setSeasonValue] = React.useState(0);

  const [secondaryValue, setSecondaryValue] = React.useState(0);
  const barRef = useRef();
  const fullRef = useRef();

  const [backgroundHighlighted, setBackgroundHighlighted] =
    React.useState(false);

  React.useEffect(() => {
    setCommunityValue(CommunityPercent * 100);
    setDailyValue(DailyPercent * 100);
    setWeeklyValue(WeeklyPercent * 100);
    setSeasonValue(SeasonPercent * 100);
  }, [CommunityPercent, DailyPercent, WeeklyPercent, SeasonPercent]);

  function getWidth() {
    if (barRef.current === undefined) {
      return 1;
    }
    return barRef.current.getBoundingClientRect().width;
  }

  let TotalPercent = Math.round(totalPercent * 10000) / 100;
  if (isNaN(TotalPercent)) {
    TotalPercent = 0;
  }

  return (
    <div className="grow horizontal-container">
      <SegmentedProgressBarContainerStyle
        className="grow"
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
          setBackgroundHighlighted(true);
        }}
        onMouseLeave={() => {
          setBackgroundHighlighted(false);
        }}
        ref={fullRef}
      >
        {/* {AchievementNumber} */}
        {Title}
        <ProgressDivStyle
          className="rounded"
          style={{
            height: Height,
            ...(EnableBorder ? {} : { borderWidth: "0px" }),
          }}
          ref={barRef}
        >
          <ProgressBarStyle
            style={{
              width: `${map_range(
                communityValue + dailyValue + weeklyValue + seasonValue,
                0,
                100,
                0,
                200
              )}%`,
              transform: `translate(-50%, -0%)`,
            }}
            className="progress season-background"
          />
          <ProgressBarStyle
            style={{
              width: `${map_range(
                communityValue + dailyValue + weeklyValue,
                0,
                100,
                0,
                200
              )}%`,
              transform: `translate(-50%, -100%)`,
            }}
            className="progress weekly-background"
            color=""
          />
          <ProgressBarStyle
            style={{
              width: `${map_range(
                communityValue + dailyValue,
                0,
                100,
                0,
                200
              )}%`,
              transform: `translate(-50%, -200%)`,
            }}
            className="progress daily-background"
            color=""
          />
          <ProgressBarStyle
            style={{
              width: `${map_range(communityValue, 0, 100, 0, 200)}%`,
              transform: `translate(-50%, -300%)`,
            }}
            className="progress community-background"
            color=""
          />
          {clickMe ? (
            <div
              className="centering"
              style={{
                width: `100%`,
                transform: `translate(-0%, -400%)`,
                height: "100%",
                flexDirection: "column",
              }}
            >
              <div className="conthrax"> Click to view Achievements!</div>
            </div>
          ) : null}

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
      <div className="centering" style={{ width: "100px" }}>
        <h3 className="conthrax-thin">{TotalPercent} %</h3>
      </div>
    </div>
  );
};
const ProgressDivStyle = styled.div`
  position: relative;

  border-radius: 0.5rem;
  border-radius: 10px;
  height: 7px;
  overflow: hidden;
`;
const ProgressBarStyle = styled.div`
  position: relative;

  transform: translate(-50%, -0%);
  // background-color: #b35252;
  height: 100%;
  border-radius: 8px;
  transition-duration: 3s;
  transition-property: width;
`;
const ProgressBarTextStyle = styled.h3`
  position: absolute;
  margin: -${AchievementSize - 4}px 4px;
  text-align: left;
  top: 100%;
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
  // height: ${AchievementSize}px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  line-height: 16px;
  // flex-grow: 1;
  transition-property: background-color;
  transition-duration: 0.2f;
  flex-basis: 0;
`;
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
