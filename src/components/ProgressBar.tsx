import styled from "styled-components";
import React from "react";
import { map_range } from "./Statistics";

const ProgressDivStyle = styled.div`
  border-radius: 0.5rem;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  height: 30px;
  overflow: hidden;
`;
const ProgressBarStyle = styled.div`
  position: relative;

  transform: translate(-50%, -0%);
  background-color: #b35252;
  height: 100%;
  border-radius: 8px;
  transition-duration: 0.5s;
  transition-property: width;
`;
const ProgressBarTextStyle = styled.p`
  position: relative;
  margin: -26px 0px;
  text-align: center;
  z-index: 5;
`;
interface ProgressBarProps {
  percent: number;
  displayValue: number | string;
}
export var ProgressBar = ({ percent, displayValue }: ProgressBarProps): JSX.Element => {
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
