import React, { useRef } from "react";
import styled from "styled-components";

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

const AchievementSize = 40;
const AchievementGap = 20;

const ProgressDivStyle = styled.div`
  position: relative;

  border-radius: 0.5rem;
  border: 2px solid white;
  border-radius: 10px;
  height: 30px;
  overflow: hidden;
  flex-grow: 1;
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
  margin: -26px 10px;
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
  width: 4px;
  position: absolute;
  height: ${AchievementSize}px;
  z-index: 10;
  opacity: 100%;
  background-color: white;
  margin: -10px 0px;
`;
export var SegmentedProgressBar = ({
  percent,
  displayValue,
  segments,
  fullWidth = false,
  height = AchievementSize - 4,
}) => {
  const [value, setValue] = React.useState(0);
  const barRef = useRef();
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
    <ProgressDivStyle
      className="progress-div"
      style={fullWidth ? { height: height, width: "100%" } : { height: height }}
      ref={barRef}
    >
      <ProgressBarStyle
        style={{ width: `${map_range(value, 0, 100, 0, 200)}%` }}
        className="progress"
      ></ProgressBarStyle>
      <ProgressBarTextStyle>{displayValue}</ProgressBarTextStyle>
      {segments.map((segment) => {
        return (
          <SegmentOfProgressBar
            style={{
              backgroundColor: segment.earned ? `green` : `white`,
              transform: `translate(${
                segment.percentage * 100 * 0.25 * getWidth()
              }%, 0%)`,
            }}
          />
        );
      })}
    </ProgressDivStyle>
  );
};

const AchievementsContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  overflow: hidden;
  transition-duration: 1s;
  opacity: 100%
  transition-property: height margin opacity;
  color: white;
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
  background-color: yellow;
  border: 2px solid white;
  border-radius: 10px;
  width: ${AchievementSize - 4}px;
  height: ${AchievementSize - 4}px;
  flex: none;
`;

const AchievementSquare = ({ num, complete }) => {
  return (
    <AchievementSquareStyle
      style={
        complete
          ? { backgroundColor: "green" }
          : { backgroundColor: "transparent" }
      }
    >
      {num}
    </AchievementSquareStyle>
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
export default function Achievements({ userData }) {
  let achievementData = userData["test"];
  return (
    <>
      <div style={{ margin: ` 0px 0px ${AchievementGap}px` }}>
        {" "}
        <SegmentedProgressBar
          percent={userData["daily_stats"]["total_games"] / 53}
          displayValue={`${userData["daily_stats"]["total_games"]}`}
          segments={[
            { percentage: 5 / 53, earned: achievementData["5"] },
            { percentage: 10 / 53, earned: achievementData["10"] },
            { percentage: 15 / 53, earned: achievementData["15"] },
            { percentage: 20 / 53, earned: achievementData["20"] },
            { percentage: 25 / 53, earned: achievementData["25"] },
            { percentage: 30 / 53, earned: achievementData["30"] },
            { percentage: 35 / 53, earned: achievementData["35"] },
            { percentage: 40 / 53, earned: achievementData["40"] },
            { percentage: 45 / 53, earned: achievementData["45"] },
            { percentage: 50 / 53, earned: achievementData["50"] },
          ]}
        />
      </div>

      <AchievementsContainer>
        <LeftAchievementCollumn>
          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`weapons`}
              segments={[{ percentage: 4 / 4.2, earned: achievementData["0"] }]}
            />
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`tac-mods`}
              segments={[{ percentage: 4 / 4.2, earned: achievementData["0"] }]}
            />
          </AchievementSingleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["daily_stats"]["total_games"] / 45}
              displayValue={"pulsar:" + userData["daily_stats"]["total_games"]}
              fullWidth={true}
              segments={[
                { percentage: 10 / 45, earned: achievementData["11"] },
                { percentage: 20 / 45, earned: achievementData["21"] },
                { percentage: 30 / 45, earned: achievementData["31"] },
                { percentage: 40 / 45, earned: achievementData["41"] },
              ]}
            />
          </AchievementDoubleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["daily_stats"]["total_games"] / 45}
              displayValue={"comet:" + userData["daily_stats"]["total_games"]}
              fullWidth={true}
              segments={[
                { percentage: 10 / 45, earned: achievementData["13"] },
                { percentage: 20 / 45, earned: achievementData["23"] },
                { percentage: 30 / 45, earned: achievementData["33"] },
                { percentage: 40 / 45, earned: achievementData["43"] },
              ]}
            />
          </AchievementDoubleRow>
          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["weekly_stats"]["percent_close_mate"] / 0.55}
              displayValue={`${
                userData["weekly_stats"]["percent_close_mate"] * 100
              }%`}
              segments={[
                { percentage: 20 / 55, earned: achievementData["16"] },
                { percentage: 30 / 55, earned: achievementData["17"] },
                { percentage: 40 / 55, earned: achievementData["18"] },
                { percentage: 50 / 55, earned: achievementData["19"] },
              ]}
            />
          </AchievementDoubleRow>
          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={userData["weekly_stats"]["payload_games"] / 55}
              displayValue={`capture point`}
              segments={[
                { percentage: 25 / 55, earned: achievementData["26"] },
                { percentage: 50 / 55, earned: achievementData["27"] },
              ]}
            />
          </AchievementSingleRow>
        </LeftAchievementCollumn>
        <CenterAchievementCollumn>
          <AchievementSquare num={6} complete={achievementData["6"]} />
          <AchievementSquare num={7} complete={achievementData["7"]} />
          <AchievementSquare num={5} complete={achievementData["5"]} />
          <AchievementSquare num={8} complete={achievementData["8"]} />
          <AchievementSquare num={9} complete={achievementData["9"]} />

          <AchievementSquare num={11} complete={achievementData["11"]} />
          <AchievementSquare num={21} complete={achievementData["21"]} />
          <AchievementSquare num={10} complete={achievementData["10"]} />
          <AchievementSquare num={22} complete={achievementData["22"]} />
          <AchievementSquare num={12} complete={achievementData["12"]} />

          <AchievementSquare num={31} complete={achievementData["31"]} />
          <AchievementSquare num={41} complete={achievementData["41"]} />
          <AchievementSquare num={15} complete={achievementData["15"]} />
          <AchievementSquare num={42} complete={achievementData["42"]} />
          <AchievementSquare num={32} complete={achievementData["32"]} />

          <AchievementSquare num={13} complete={achievementData["13"]} />
          <AchievementSquare num={23} complete={achievementData["23"]} />
          <AchievementSquare num={20} complete={achievementData["20"]} />
          <AchievementSquare num={24} complete={achievementData["24"]} />
          <AchievementSquare num={14} complete={achievementData["14"]} />

          <AchievementSquare num={33} complete={achievementData["33"]} />
          <AchievementSquare num={43} complete={achievementData["43"]} />
          <AchievementSquare num={25} complete={achievementData["25"]} />
          <AchievementSquare num={44} complete={achievementData["44"]} />
          <AchievementSquare num={34} complete={achievementData["33"]} />

          <AchievementSquare num={16} complete={achievementData["16"]} />
          <AchievementSquare num={17} complete={achievementData["17"]} />
          <AchievementSquare num={30} complete={achievementData["30"]} />
          <AchievementSquare num={47} complete={achievementData["47"]} />
          <AchievementSquare num={46} complete={achievementData["46"]} />

          <AchievementSquare num={18} complete={achievementData["18"]} />
          <AchievementSquare num={19} complete={achievementData["19"]} />
          <AchievementSquare num={35} complete={achievementData["35"]} />
          <AchievementSquare num={49} complete={achievementData["49"]} />
          <AchievementSquare num={48} complete={achievementData["48"]} />

          <AchievementSquare num={26} complete={achievementData["26"]} />
          <AchievementSquare num={27} complete={achievementData["27"]} />
          <AchievementSquare num={40} complete={achievementData["40"]} />
          <AchievementSquare num={28} complete={achievementData["28"]} />
          <AchievementSquare num={29} complete={achievementData["29"]} />
        </CenterAchievementCollumn>
        <RightAchievementCollumn>
          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`ordnances`}
              segments={[{ percentage: 4 / 4.2, earned: achievementData["0"] }]}
            />
            <SegmentedProgressBar
              percent={1 / 16.4}
              displayValue={`equipables`}
              segments={[
                { percentage: 16 / 16.8, earned: achievementData["0"] },
              ]}
            />
          </AchievementSingleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["daily_stats"]["total_games"] / 45}
              displayValue={"nova:" + userData["daily_stats"]["total_games"]}
              fullWidth={true}
              segments={[
                { percentage: 10 / 45, earned: achievementData["12"] },
                { percentage: 20 / 45, earned: achievementData["22"] },
                { percentage: 30 / 45, earned: achievementData["23"] },
                { percentage: 40 / 45, earned: achievementData["24"] },
              ]}
            />
          </AchievementDoubleRow>
          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["daily_stats"]["total_games"] / 45}
              displayValue={"meateor:" + userData["daily_stats"]["total_games"]}
              fullWidth={true}
              segments={[
                { percentage: 10 / 45, earned: achievementData["14"] },
                { percentage: 20 / 45, earned: achievementData["23"] },
                { percentage: 30 / 45, earned: achievementData["34"] },
                { percentage: 40 / 45, earned: achievementData["44"] },
              ]}
            />
          </AchievementDoubleRow>
          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["weekly_stats"]["percent_close_enemy"] / 0.042}
              displayValue={`${
                userData["weekly_stats"]["percent_close_enemy"] * 100
              }%`}
              segments={[
                { percentage: 1 / 4.2, earned: achievementData["46"] },
                { percentage: 2 / 4.2, earned: achievementData["47"] },
                { percentage: 3 / 4.2, earned: achievementData["48"] },
                { percentage: 4 / 4.2, earned: achievementData["49"] },
              ]}
            />
          </AchievementDoubleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={userData["weekly_stats"]["payload_games"] / 55}
              displayValue={`payload`}
              segments={[
                { percentage: 25 / 55, earned: achievementData["28"] },
                { percentage: 50 / 55, earned: achievementData["29"] },
              ]}
            />
          </AchievementSingleRow>
        </RightAchievementCollumn>
      </AchievementsContainer>
    </>
  );
}
