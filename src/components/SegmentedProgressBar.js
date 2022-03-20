/* eslint-disable */

import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
var achievementFormatingData = require("./AchievementData.json");

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}
const AchievementSize = 40;
export const SegmentedProgressBar = ({
  SetBarWhite = false,
  Percentage = 0,
  Title,
  Height = AchievementSize - 4,
  EnableBorder = true,
  SecondaryPercentage = 0.0,
  ActiveProgress = null,
  ProgressBarClass,
  centeredTitle = false,
  leftTitle = true,
  titleStyle = {},
}) => {
  const [value, setValue] = useState(0);
  const [secondaryValue, setSecondaryValue] = useState(0);
  const [activeValue, setActiveValue] = useState(0);

  const barRef = useRef();
  const fullRef = useRef();
  var switchDefaultToWhite = false;

  if (ActiveProgress !== null) {
    switchDefaultToWhite = true;
  }

  const [backgroundHighlighted, setBackgroundHighlighted] = useState(false);
  useEffect(() => {
    setValue(Percentage * 100);
    setSecondaryValue(SecondaryPercentage * 100);
    setActiveValue(ActiveProgress * 100);
  }, [Percentage]);

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
              backgroundColor: "#fff0",
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
      <div
        className={centeredTitle ? "centering" : ""}
        style={{ textAlign: leftTitle ? "right" : undefined, ...titleStyle }}
      >
        {Title}
      </div>
      <ProgressDivStyle
        className="rounded"
        style={{
          height: Height,
          ...(EnableBorder ? {} : { borderWidth: "0px" }),
          transform: leftTitle ? "scale(-100%,100%)" : undefined,
        }}
        ref={barRef}
      >
        <ProgressBarStyle
          style={{
            width: `${map_range(secondaryValue, 0, 100, 0, 200)}%`,
            backgroundColor: "#333",
          }}
          className="progress"
          color=""
        />
        <ProgressBarStyle
          style={{
            width: `${map_range(value, 0, 100, 0, 200)}%`,
            transform: `translate(-50%, -100%)`,
            backgroundColor: switchDefaultToWhite || SetBarWhite ? "#ccc" : undefined,
          }}
          className={"progress " + ProgressBarClass}
        />
        <ProgressBarStyle
          style={{
            width: `${map_range(activeValue, 0, 100, 0, 200)}%`,
            // backgroundColor: "#0ff",
            transform: `translate(-50%, -200%)`,
          }}
          className={"progress " + ProgressBarClass}
        />
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
  transition-duration: 3s, 0.5s;
  transition-property: width, background-color;
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
  // height: ${AchievementSize}px;

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
