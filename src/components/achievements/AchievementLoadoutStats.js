import React, { useRef, useState } from "react";

import styled from "styled-components";
import { AchievementsContainer, LeftAchievementCollumn } from "../Achievements";
import { SegmentedProgressBar } from "../SegmentedProgressBar";

var achievementFormatingData = require("../AchievementData.json");

const ContainerStyle = styled.div`
  padding: 10px 10px 10px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid white;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 0px 10px;
`;
const ContainerTitle = styled.div`
  font-size: 36px;
  font-weight: 400;
  margin: 10px 0px;
  text-align: center;
  flex: 0 0 100%;
  color: #fff;
  flex-grow: 0;
`;

const SegmentedProgressBarContainerStyle = styled.div`
  height: ${40}px;

  display: flex;
  flex-direction: column;
  line-height: 16px;
  // flex-grow: 1;
  transition-property: background-color;
  transition-duration: 0.2f;
  flex-basis: 0;
`;
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
  margin: -${35 - 4}px 4px;
  text-align: left;

  z-index: 5;
`;
function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

export const AchievementLoadoutStats = ({
  selectedAchievementType = "daily",
  ahData: achievementData,
  cb = () => {},
  setHn = () => {},
}) => {
  const SegmentedLoadoutProgressBar = ({ AchNum, icon = "comet" }) => {
    //   const [value, setValue] = React.useState(0);
    //   const barRef = useRef();
    //   const fullRef = useRef();

    //   const [backgroundHighlighted, setBackgroundHighlighted] =
    //     React.useState(false);
    //   React.useEffect(() => {
    //     setValue(AchievementData.values[AchievementNumber.toString()] * 100);
    //   }, [AchievementData, AchievementNumber]);
    //   function getWidth() {
    //     if (barRef.current === undefined) {
    //       return 1;
    //     }
    //     return barRef.current.getBoundingClientRect().width;
    //   }
    return (
      <div style={{ display: "flex" }}>
        <img
          src={"/images/" + icon + ".png"}
          alt="iconImage"
          style={{ height: "50px", width: "50px" }}
        />
        <div style={{ flexGrow: 1 }}>
          <SegmentedProgressBar
            Title={achievementFormatingData[AchNum.toString()].Title}
            // Title={achievementData.values[AchievementNumber.toString()]}
            Percentage={achievementData.values[AchNum.toString()]}
            // Percentage={0.5}
          />
        </div>
      </div>

      // <SegmentedProgressBarContainerStyle
      //   style={
      //     backgroundHighlighted
      //       ? {
      //           backgroundColor: "#fff4",
      //         }
      //       : {
      //           backgroundColor: "#fff0",
      //         }
      //   }
      //   onMouseEnter={() => {
      //     updateHoverCallback(AchievementNumber);
      //     setBackgroundHighlighted(true);
      //     cb(fullRef, AchievementNumber);
      //   }}
      //   onMouseLeave={() => {
      //     updateHoverCallback([]);
      //     setBackgroundHighlighted(false);
      //   }}
      //   ref={fullRef}
      // >
      //   {/* {AchievementNumber} */}
      //   {}
      //   <ProgressDivStyle
      //     className="progress-div"
      //     style={{ height: "20px" }}
      //     ref={barRef}
      //   >
      //     <ProgressBarStyle
      //       style={{ width: `${map_range(value, 0, 100, 0, 200)}%` }}
      //       className="progress"
      //     ></ProgressBarStyle>
      //     <ProgressBarTextStyle></ProgressBarTextStyle>
      //     {/* {segments.map((segment) => {
      //       return (
      //         <SegmentOfProgressBar
      //           style={{
      //             backgroundColor: segment.earned ? `green` : `white`,
      //             transform: `translate(${
      //               segment.percentage * 100 * 0.5 * getWidth()
      //             }%, 0%)`,
      //           }}
      //         />
      //       );
      //     })} */}
      //   </ProgressDivStyle>
      // </SegmentedProgressBarContainerStyle>
    );
  };

  return (
    <ContainerStyle>
      <ContainerTitle>Achievement Loadout Stats</ContainerTitle>
      {selectedAchievementType === "daily" ? (
        <AchievementsContainer>
          <LeftAchievementCollumn>
            <SegmentedLoadoutProgressBar AchNum={5} icon={"pulsar"} />
            <SegmentedLoadoutProgressBar AchNum={6} icon={"nova"} />
            <SegmentedLoadoutProgressBar AchNum={7} icon={"comet"} />
            <SegmentedLoadoutProgressBar AchNum={8} icon={"meteor"} />
            <SegmentedLoadoutProgressBar AchNum={9} icon={"detonator"} />
            <SegmentedLoadoutProgressBar AchNum={10} icon={"stun_field"} />
            <SegmentedLoadoutProgressBar AchNum={11} icon={"arcmine"} />
            <SegmentedLoadoutProgressBar AchNum={12} icon={"instant_repair"} />
            <SegmentedLoadoutProgressBar AchNum={13} icon={"repair_matrix"} />
            <SegmentedLoadoutProgressBar AchNum={14} icon={"threat_scanner"} />
            <SegmentedLoadoutProgressBar AchNum={15} icon={"energy_barrier"} />
            <SegmentedLoadoutProgressBar AchNum={16} icon={"phaseshift"} />
          </LeftAchievementCollumn>
        </AchievementsContainer>
      ) : null}
      {selectedAchievementType === "weekly" ? (
        <AchievementsContainer>
          <LeftAchievementCollumn>
            <SegmentedLoadoutProgressBar AchNum={22} icon={"pulsar"} />
            <SegmentedLoadoutProgressBar AchNum={23} icon={"nova"} />
            <SegmentedLoadoutProgressBar AchNum={24} icon={"comet"} />
            <SegmentedLoadoutProgressBar AchNum={25} icon={"meteor"} />
            <SegmentedLoadoutProgressBar AchNum={26} icon={"detonator"} />
            <SegmentedLoadoutProgressBar AchNum={27} icon={"stun_field"} />
            <SegmentedLoadoutProgressBar AchNum={28} icon={"arcmine"} />
            <SegmentedLoadoutProgressBar AchNum={29} icon={"instant_repair"} />
            <SegmentedLoadoutProgressBar AchNum={30} icon={"repair_matrix"} />
            <SegmentedLoadoutProgressBar AchNum={31} icon={"threat_scanner"} />
            <SegmentedLoadoutProgressBar AchNum={32} icon={"energy_barrier"} />
            <SegmentedLoadoutProgressBar AchNum={33} icon={"phaseshift"} />
          </LeftAchievementCollumn>

          {/* <RightAchievementCollumn></RightAchievementCollumn> */}
        </AchievementsContainer>
      ) : null}
      {selectedAchievementType === "global" ? (
        <AchievementsContainer>
          <LeftAchievementCollumn>
            <SegmentedLoadoutProgressBar AchNum={44} icon={"pulsar"} />
            <SegmentedLoadoutProgressBar AchNum={45} icon={"nova"} />
            <SegmentedLoadoutProgressBar AchNum={46} icon={"comet"} />
            <SegmentedLoadoutProgressBar AchNum={47} icon={"meteor"} />
            <SegmentedLoadoutProgressBar AchNum={48} icon={"detonator"} />
            <SegmentedLoadoutProgressBar AchNum={49} icon={"stun_field"} />
            <SegmentedLoadoutProgressBar AchNum={50} icon={"arcmine"} />
            <SegmentedLoadoutProgressBar AchNum={51} icon={"instant_repair"} />
            <SegmentedLoadoutProgressBar AchNum={52} icon={"repair_matrix"} />
            <SegmentedLoadoutProgressBar AchNum={53} icon={"threat_scanner"} />
            <SegmentedLoadoutProgressBar AchNum={54} icon={"energy_barrier"} />
            <SegmentedLoadoutProgressBar AchNum={55} icon={"phaseshift"} />
          </LeftAchievementCollumn>
        </AchievementsContainer>
      ) : null}
    </ContainerStyle>
  );
};
