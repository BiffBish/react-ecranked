import React, { useRef } from "react";
import styled from "styled-components";

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

const AchievementSize = 40;
const AchievementGap = 5;

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
  height: 1500px;
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
const AchievementWideStyle = styled.div`
  background-color: yellow;
  border: 2px solid white;
  border-radius: 10px;
  width: ${AchievementSize * 5 + AchievementGap * 4 - 4}px;
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

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 110}
              displayValue={`dyson`}
              segments={[
                { percentage: 100 / 110, earned: achievementData["0"] },
              ]}
            />
            <SegmentedProgressBar
              percent={1 / 110}
              displayValue={`combustion`}
              segments={[
                { percentage: 100 / 110, earned: achievementData["0"] },
              ]}
            />
          </AchievementSingleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={0.005 / 0.016}
              displayValue={`MinimumLoadoutUsage`}
              segments={[
                { percentage: 0.5 / 1.6, earned: achievementData["36"] },
                { percentage: 0.75 / 1.6, earned: achievementData["37"] },
                { percentage: 1 / 1.6, earned: achievementData["38"] },
                { percentage: 1.25 / 1.6, earned: achievementData["39"] },
              ]}
            />
          </AchievementDoubleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 28}
              displayValue={`repair matrix`}
              segments={[{ percentage: 25 / 28, earned: achievementData["0"] }]}
            />
            <SegmentedProgressBar
              percent={1 / 28}
              displayValue={`threat scanner`}
              segments={[{ percentage: 25 / 28, earned: achievementData["0"] }]}
            />
          </AchievementSingleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 28}
              displayValue={`detonator`}
              segments={[{ percentage: 25 / 28, earned: achievementData["0"] }]}
            />
            <SegmentedProgressBar
              percent={1 / 28}
              displayValue={`stun field`}
              segments={[{ percentage: 25 / 28, earned: achievementData["0"] }]}
            />
          </AchievementSingleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["weekly_stats"]["average_speed"] / 5}
              displayValue={`${userData["weekly_stats"]["average_speed"]}m/s`}
              segments={[
                { percentage: 3.0 / 5, earned: achievementData["61"] },
                { percentage: 3.5 / 5, earned: achievementData["62"] },
                { percentage: 4.0 / 5, earned: achievementData["63"] },
                { percentage: 4.5 / 5, earned: achievementData["64"] },
              ]}
            />
          </AchievementDoubleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["weekly_stats"]["average_deaths"] / 9}
              displayValue={`${userData["weekly_stats"]["average_deaths"]}`}
              segments={[
                { percentage: 8 / 9, earned: achievementData["81"] },
                { percentage: 7 / 9, earned: achievementData["82"] },
                { percentage: 6 / 9, earned: achievementData["83"] },
                { percentage: 5 / 9, earned: achievementData["84"] },
              ]}
            />
          </AchievementDoubleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["stats"]["total_deaths"] / 4200}
              displayValue={`${userData["stats"]["total_deaths"]}`}
              segments={[
                { percentage: 500 / 4200, earned: achievementData["91"] },
                { percentage: 1000 / 4200, earned: achievementData["92"] },
                { percentage: 2000 / 4200, earned: achievementData["93"] },
                { percentage: 4000 / 4200, earned: achievementData["94"] },
              ]}
            />
          </AchievementDoubleRow>
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

          <AchievementSquare num={96} complete={achievementData["96"]} />
          <AchievementSquare num={97} complete={achievementData["97"]} />
          <AchievementSquare num={45} complete={achievementData["45"]} />
          <AchievementSquare num={98} complete={achievementData["98"]} />
          <AchievementSquare num={99} complete={achievementData["99"]} />

          <AchievementSquare num={36} complete={achievementData["36"]} />
          <AchievementSquare num={37} complete={achievementData["37"]} />
          <AchievementSquare num={50} complete={achievementData["50"]} />
          <AchievementSquare num={52} complete={achievementData["52"]} />
          <AchievementSquare num={51} complete={achievementData["51"]} />

          <AchievementSquare num={38} complete={achievementData["38"]} />
          <AchievementSquare num={39} complete={achievementData["39"]} />
          <AchievementSquare num={55} complete={achievementData["55"]} />
          <AchievementSquare num={54} complete={achievementData["54"]} />
          <AchievementSquare num={53} complete={achievementData["53"]} />

          <AchievementSquare num={56} complete={achievementData["56"]} />
          <AchievementSquare num={57} complete={achievementData["57"]} />
          <AchievementSquare num={60} complete={achievementData["60"]} />
          <AchievementSquare num={58} complete={achievementData["58"]} />
          <AchievementSquare num={59} complete={achievementData["59"]} />

          <AchievementSquare num={71} complete={achievementData["71"]} />
          <AchievementSquare num={72} complete={achievementData["72"]} />
          <AchievementSquare num={65} complete={achievementData["65"]} />
          <AchievementSquare num={73} complete={achievementData["73"]} />
          <AchievementSquare num={74} complete={achievementData["74"]} />

          <AchievementSquare num={61} complete={achievementData["61"]} />
          <AchievementSquare num={62} complete={achievementData["62"]} />
          <AchievementSquare num={70} complete={achievementData["70"]} />
          <AchievementSquare num={77} complete={achievementData["77"]} />
          <AchievementSquare num={76} complete={achievementData["76"]} />

          <AchievementSquare num={63} complete={achievementData["63"]} />
          <AchievementSquare num={64} complete={achievementData["64"]} />
          <AchievementSquare num={75} complete={achievementData["75"]} />
          <AchievementSquare num={79} complete={achievementData["79"]} />
          <AchievementSquare num={78} complete={achievementData["78"]} />

          <AchievementSquare num={81} complete={achievementData["81"]} />
          <AchievementSquare num={82} complete={achievementData["82"]} />
          <AchievementSquare num={80} complete={achievementData["80"]} />
          <AchievementSquare num={87} complete={achievementData["87"]} />
          <AchievementSquare num={86} complete={achievementData["86"]} />

          <AchievementSquare num={83} complete={achievementData["83"]} />
          <AchievementSquare num={84} complete={achievementData["84"]} />
          <AchievementSquare num={85} complete={achievementData["85"]} />
          <AchievementSquare num={89} complete={achievementData["89"]} />
          <AchievementSquare num={88} complete={achievementData["88"]} />

          <AchievementSquare num={91} complete={achievementData["91"]} />
          <AchievementSquare num={92} complete={achievementData["92"]} />
          <AchievementSquare num={90} complete={achievementData["80"]} />
          <AchievementSquare num={67} complete={achievementData["67"]} />
          <AchievementSquare num={66} complete={achievementData["66"]} />

          <AchievementSquare num={93} complete={achievementData["93"]} />
          <AchievementSquare num={94} complete={achievementData["94"]} />
          <AchievementSquare num={95} complete={achievementData["95"]} />
          <AchievementSquare num={69} complete={achievementData["69"]} />
          <AchievementSquare num={68} complete={achievementData["68"]} />
          <AchievementWide num={100} complete={achievementData["100"]} />
          <AchievementWide num={101} complete={achievementData["101"]} />
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

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 110}
              displayValue={`fission`}
              segments={[
                { percentage: 100 / 110, earned: achievementData["0"] },
              ]}
            />
            <SegmentedProgressBar
              percent={1 / 110}
              displayValue={`surge`}
              segments={[
                { percentage: 100 / 110, earned: achievementData["0"] },
              ]}
            />
          </AchievementSingleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["daily_stats"]["top_speed"] / 38}
              displayValue={`${userData["daily_stats"]["top_speed"]}m/s`}
              segments={[
                { percentage: 20 / 38, earned: achievementData["51"] },
                { percentage: 25 / 38, earned: achievementData["52"] },
                { percentage: 30 / 38, earned: achievementData["53"] },
                { percentage: 35 / 38, earned: achievementData["54"] },
              ]}
            />
          </AchievementDoubleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`energy barrier`}
              segments={[{ percentage: 4 / 4.2, earned: achievementData["0"] }]}
            />
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`phase shift`}
              segments={[{ percentage: 4 / 4.2, earned: achievementData["0"] }]}
            />
          </AchievementSingleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`arcmine`}
              segments={[{ percentage: 4 / 4.2, earned: achievementData["0"] }]}
            />
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`instant repair`}
              segments={[{ percentage: 4 / 4.2, earned: achievementData["0"] }]}
            />
          </AchievementSingleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["weekly_stats"]["percent_upsidedown"] / 100}
              displayValue={`${
                userData["weekly_stats"]["percent_upsidedown"] * 100
              }%`}
              segments={[
                { percentage: 5 / 100, earned: achievementData["76"] },
                { percentage: 25 / 100, earned: achievementData["77"] },
                { percentage: 50 / 100, earned: achievementData["78"] },
                { percentage: 75 / 100, earned: achievementData["79"] },
              ]}
            />
          </AchievementDoubleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={0.01 / 0.5}
              displayValue={`0.01%`}
              segments={[
                { percentage: 5 / 50, earned: achievementData["86"] },
                { percentage: 10 / 50, earned: achievementData["87"] },
                { percentage: 25 / 50, earned: achievementData["88"] },
                { percentage: 40 / 50, earned: achievementData["89"] },
              ]}
            />
          </AchievementDoubleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`arcmine`}
              segments={[
                { percentage: 4 / 4.2, earned: achievementData["67"] },
              ]}
            />
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`instant repair`}
              segments={[
                { percentage: 4 / 4.2, earned: achievementData["66"] },
              ]}
            />
          </AchievementSingleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`arcmine`}
              segments={[
                { percentage: 4 / 4.2, earned: achievementData["69"] },
              ]}
            />
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`instant repair`}
              segments={[
                { percentage: 4 / 4.2, earned: achievementData["68"] },
              ]}
            />
          </AchievementSingleRow>
        </RightAchievementCollumn>
      </AchievementsContainer>
    </>
  );
}
