import React from "react";
import styled from "styled-components";

export const AchievementHeaderButton = ({
  selectedAchievementType,
  setSelectedAchievementType,
  name,
  displayName,
  progress,
}) => {
  return (
    <AchievementHeaderButtonStyle
      style={
        selectedAchievementType === name
          ? {
              backgroundColor: "#333",
            }
          : {}
      }
      onClick={() => {
        setSelectedAchievementType(name);
      }}
    >
      <ProgressBarStyle
        style={{
          width: progress * 100 + "%",
        }}
      />
      <div
        style={{
          position: "relative",
        }}
      >
        <TextStyle>{displayName}</TextStyle>
      </div>
    </AchievementHeaderButtonStyle>
  );
};

const ProgressBarStyle = styled.div`
  background: red;
  position: relative;
  height: 100%;
`;
const TextStyle = styled.div`
  position: relative;
  height: 100%;
  transform: translate(0, -100%);
`;
const AchievementHeaderButtonStyle = styled.div`
  height: 40px;
  // padding: 10px 10px 0px;
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
  overflow: hidden;
`;
