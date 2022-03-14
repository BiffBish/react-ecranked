import React from "react";
import styled from "styled-components";

export const AchievementHeaderButton = ({
  selectedAchievementType,
  setSelectedAchievementType,
  name,
  displayName,
  progress,
  progressClass,
}) => {
  return (
    <AchievementHeaderButtonStyle
      className="grow rounded relative"
      style={{
        width: "0px",
        backgroundColor: selectedAchievementType === name ? "#333" : undefined,
      }}
      onClick={() => {
        setSelectedAchievementType(name);
      }}
    >
      <ProgressBarStyle
        className={progressClass}
        style={{
          width: progress * 100 + "%",
        }}
      />
      <div
        className="centering absolute fill"
        style={{
          top: 0,
        }}
      >
        <TextStyle>{displayName}</TextStyle>
      </div>
    </AchievementHeaderButtonStyle>
  );
};

const ProgressBarStyle = styled.div`
  // background: #b35252;
  position: relative;
  height: 100%;
`;
const TextStyle = styled.h3`
  position: relative;
  // height: 100%;
  margin: auto;
  // transform: translate(0, -240%);
`;
const AchievementHeaderButtonStyle = styled.div`
  // height: 80px;
  // padding: 10px 10px 0px;
  background-color: #222;
  color: white;
  float: left;
  gap: 0px 10px;
  flex-grow: 1;
  text-align: center;
  height: 40px;
  &:hover {
    background-color: #555;
    color: #000;
  }
  cursor: pointer;
  line-height: 20px;
  overflow: hidden;
`;
