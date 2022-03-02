/* eslint-disable */

import React, { useRef } from "react";
import styled from "styled-components";
var achievementFormatingData = require("./AchievementData.json");

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}
const AchievementSize = 40;
export const SegmentedProgressBar = ({
  Percentage = 0,
  Title,
  Height = AchievementSize - 4,
  EnableBorder = true,
}) => {
  const [value, setValue] = React.useState(0);
  const barRef = useRef();
  const fullRef = useRef();

  const [backgroundHighlighted, setBackgroundHighlighted] =
    React.useState(false);
  React.useEffect(() => {
    setValue(Percentage * 100);
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
        className="progress-div"
        style={{
          height: Height,
          ...(EnableBorder ? { border: "1px solid white" } : {}),
        }}
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
