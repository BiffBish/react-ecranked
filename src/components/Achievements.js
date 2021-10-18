import React, { useRef, useState } from "react";
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
  selectedNumbers,
  updateHoverCallback,
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
      onMouseEnter={() => {
        updateHoverCallback(selectedNumbers);
      }}
      onMouseLeave={() => {
        updateHoverCallback([]);
      }}
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
  line-height: ${AchievementSize - 4}px;

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
  border: 2px solid white;
  border-radius: 10px;
  width: ${AchievementSize - 4}px;
  height: ${AchievementSize - 4}px;
  flex: none;
  padding: 0px;
  text-align: center;
  transition-property: background-color;
`;
const AchievementWideStyle = styled.div`
  background-color: yellow;
  border: 2px solid white;
  border-radius: 10px;
  width: ${AchievementSize * 5 + AchievementGap * 4 - 4}px;
  height: ${AchievementSize - 4}px;
  flex: none;
`;

const AchievementSquare = ({ num, complete, hn = [] }) => {
  return (
    <AchievementSquareStyle
      style={
        hn.includes(num)
          ? complete
            ? { backgroundColor: "#4A4" }
            : { backgroundColor: "#fff4" }
          : complete
          ? { backgroundColor: "#008000ff" }
          : { backgroundColor: "#fff0" }
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
  let achData = userData["test"];
  const [hn, setHn] = useState([]);
  return (
    <>
      <div style={{ margin: ` 0px 0px ${AchievementGap}px` }}>
        {" "}
        <SegmentedProgressBar
          percent={userData["daily_stats"]["total_games"] / 53}
          displayValue={`${userData["daily_stats"]["total_games"]}`}
          segments={[
            { percentage: 5 / 53, earned: achData["5"] },
            { percentage: 10 / 53, earned: achData["10"] },
            { percentage: 15 / 53, earned: achData["15"] },
            { percentage: 20 / 53, earned: achData["20"] },
            { percentage: 25 / 53, earned: achData["25"] },
            { percentage: 30 / 53, earned: achData["30"] },
            { percentage: 35 / 53, earned: achData["35"] },
            { percentage: 40 / 53, earned: achData["40"] },
            { percentage: 45 / 53, earned: achData["45"] },
            { percentage: 50 / 53, earned: achData["50"] },
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
              segments={[{ percentage: 4 / 4.2, earned: achData["6"] }]}
              updateHoverCallback={setHn}
              selectedNumbers={[6]}
            />
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`tac-mods`}
              segments={[{ percentage: 4 / 4.2, earned: achData["7"] }]}
              updateHoverCallback={setHn}
              selectedNumbers={[7]}
            />
          </AchievementSingleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["daily_stats"]["total_games"] / 45}
              displayValue={"pulsar:" + userData["daily_stats"]["total_games"]}
              fullWidth={true}
              segments={[
                { percentage: 10 / 45, earned: achData["11"] },
                { percentage: 20 / 45, earned: achData["12"] },
                { percentage: 30 / 45, earned: achData["13"] },
                { percentage: 40 / 45, earned: achData["14"] },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[11, 12, 13, 14]}
            />
          </AchievementDoubleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["daily_stats"]["total_games"] / 45}
              displayValue={"comet:" + userData["daily_stats"]["total_games"]}
              fullWidth={true}
              segments={[
                { percentage: 10 / 45, earned: achData["31"] },
                { percentage: 20 / 45, earned: achData["32"] },
                { percentage: 30 / 45, earned: achData["33"] },
                { percentage: 40 / 45, earned: achData["34"] },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[31, 32, 33, 34]}
            />
          </AchievementDoubleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 28}
              displayValue={`repair matrix`}
              segments={[{ percentage: 25 / 28, earned: achData["51"] }]}
              updateHoverCallback={setHn}
              selectedNumbers={[51]}
            />
            <SegmentedProgressBar
              percent={1 / 28}
              displayValue={`threat scanner`}
              segments={[{ percentage: 25 / 28, earned: achData["52"] }]}
              updateHoverCallback={setHn}
              selectedNumbers={[52]}
            />
          </AchievementSingleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`energy barrier`}
              segments={[{ percentage: 4 / 4.2, earned: achData["53"] }]}
              updateHoverCallback={setHn}
              selectedNumbers={[53]}
            />

            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`phase shift`}
              segments={[{ percentage: 4 / 4.2, earned: achData["54"] }]}
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
                { percentage: 20 / 55, earned: achData["16"] },
                { percentage: 30 / 55, earned: achData["17"] },
                { percentage: 40 / 55, earned: achData["18"] },
                { percentage: 50 / 55, earned: achData["19"] },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[16, 17, 18, 19]}
            />
          </AchievementDoubleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={userData["weekly_stats"]["payload_games"] / 55}
              displayValue={`capture point`}
              segments={[
                { percentage: 25 / 55, earned: achData["36"] },
                { percentage: 50 / 55, earned: achData["37"] },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[36, 37]}
            />
          </AchievementSingleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 110}
              displayValue={`dyson`}
              segments={[{ percentage: 100 / 110, earned: achData["46"] }]}
              updateHoverCallback={setHn}
              selectedNumbers={[46]}
            />
            <SegmentedProgressBar
              percent={1 / 110}
              displayValue={`combustion`}
              segments={[{ percentage: 100 / 110, earned: achData["47"] }]}
              updateHoverCallback={setHn}
              selectedNumbers={[47]}
            />
          </AchievementSingleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={0.01 / 0.5}
              displayValue={`0.01%`}
              segments={[
                { percentage: 5 / 50, earned: achData["56"] },
                { percentage: 10 / 50, earned: achData["57"] },
                { percentage: 25 / 50, earned: achData["58"] },
                { percentage: 40 / 50, earned: achData["59"] },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[56, 57, 58, 59]}
            />
          </AchievementDoubleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["weekly_stats"]["average_speed"] / 5}
              displayValue={`${userData["weekly_stats"]["average_speed"]}m/s`}
              segments={[
                { percentage: 3.0 / 5, earned: achData["81"] },
                { percentage: 3.5 / 5, earned: achData["82"] },
                { percentage: 4.0 / 5, earned: achData["83"] },
                { percentage: 4.5 / 5, earned: achData["84"] },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[81, 82, 83, 84]}
            />
          </AchievementDoubleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["weekly_stats"]["average_deaths"] / 9}
              displayValue={`${userData["weekly_stats"]["average_deaths"]}`}
              segments={[
                { percentage: 8 / 9, earned: achData["76"] },
                { percentage: 7 / 9, earned: achData["77"] },
                { percentage: 6 / 9, earned: achData["78"] },
                { percentage: 5 / 9, earned: achData["79"] },
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
                { percentage: 0.5 / 1.4, earned: achData["96"] },
                { percentage: 0.75 / 1.4, earned: achData["97"] },
                { percentage: 1.0 / 1.4, earned: achData["98"] },
                { percentage: 1.25 / 1.4, earned: achData["99"] },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[96, 97, 98, 99]}
            />
          </AchievementDoubleRow>
        </LeftAchievementCollumn>
        <CenterAchievementCollumn>
          <AchievementSquare num={6} complete={achData["6"]} hn={hn} />
          <AchievementSquare num={7} complete={achData["7"]} hn={hn} />
          <AchievementSquare num={5} complete={achData["5"]} hn={hn} />
          <AchievementSquare num={8} complete={achData["8"]} hn={hn} />
          <AchievementSquare num={9} complete={achData["9"]} hn={hn} />

          <AchievementSquare num={11} complete={achData["11"]} hn={hn} />
          <AchievementSquare num={12} complete={achData["12"]} hn={hn} />
          <AchievementSquare num={10} complete={achData["10"]} hn={hn} />
          <AchievementSquare num={22} complete={achData["22"]} hn={hn} />
          <AchievementSquare num={21} complete={achData["21"]} hn={hn} />

          <AchievementSquare num={13} complete={achData["13"]} hn={hn} />
          <AchievementSquare num={14} complete={achData["14"]} hn={hn} />
          <AchievementSquare num={15} complete={achData["15"]} hn={hn} />
          <AchievementSquare num={24} complete={achData["24"]} hn={hn} />
          <AchievementSquare num={23} complete={achData["23"]} hn={hn} />

          <AchievementSquare num={31} complete={achData["31"]} hn={hn} />
          <AchievementSquare num={32} complete={achData["32"]} hn={hn} />
          <AchievementSquare num={20} complete={achData["20"]} hn={hn} />
          <AchievementSquare num={42} complete={achData["42"]} hn={hn} />
          <AchievementSquare num={41} complete={achData["41"]} hn={hn} />

          <AchievementSquare num={33} complete={achData["33"]} hn={hn} />
          <AchievementSquare num={34} complete={achData["34"]} hn={hn} />
          <AchievementSquare num={25} complete={achData["25"]} hn={hn} />
          <AchievementSquare num={44} complete={achData["44"]} hn={hn} />
          <AchievementSquare num={43} complete={achData["43"]} hn={hn} />

          <AchievementSquare num={51} complete={achData["51"]} hn={hn} />
          <AchievementSquare num={52} complete={achData["52"]} hn={hn} />
          <AchievementSquare num={30} complete={achData["30"]} hn={hn} />
          <AchievementSquare num={61} complete={achData["61"]} hn={hn} />
          <AchievementSquare num={62} complete={achData["62"]} hn={hn} />

          <AchievementSquare num={53} complete={achData["53"]} hn={hn} />
          <AchievementSquare num={54} complete={achData["54"]} hn={hn} />
          <AchievementSquare num={35} complete={achData["35"]} hn={hn} />
          <AchievementSquare num={63} complete={achData["63"]} hn={hn} />
          <AchievementSquare num={64} complete={achData["64"]} hn={hn} />

          <AchievementSquare num={16} complete={achData["16"]} hn={hn} />
          <AchievementSquare num={17} complete={achData["17"]} hn={hn} />
          <AchievementSquare num={40} complete={achData["40"]} hn={hn} />
          <AchievementSquare num={27} complete={achData["27"]} hn={hn} />
          <AchievementSquare num={26} complete={achData["26"]} hn={hn} />

          <AchievementSquare num={18} complete={achData["18"]} hn={hn} />
          <AchievementSquare num={19} complete={achData["19"]} hn={hn} />
          <AchievementSquare num={45} complete={achData["45"]} hn={hn} />
          <AchievementSquare num={29} complete={achData["29"]} hn={hn} />
          <AchievementSquare num={28} complete={achData["28"]} hn={hn} />

          <AchievementSquare num={36} complete={achData["36"]} hn={hn} />
          <AchievementSquare num={37} complete={achData["37"]} hn={hn} />
          <AchievementSquare num={50} complete={achData["50"]} hn={hn} />
          <AchievementSquare num={38} complete={achData["52"]} hn={hn} />
          <AchievementSquare num={39} complete={achData["39"]} hn={hn} />

          <AchievementSquare num={46} complete={achData["46"]} hn={hn} />
          <AchievementSquare num={47} complete={achData["47"]} hn={hn} />
          <AchievementSquare num={55} complete={achData["55"]} hn={hn} />
          <AchievementSquare num={48} complete={achData["48"]} hn={hn} />
          <AchievementSquare num={49} complete={achData["49"]} hn={hn} />

          <AchievementSquare num={56} complete={achData["56"]} hn={hn} />
          <AchievementSquare num={57} complete={achData["57"]} hn={hn} />
          <AchievementSquare num={60} complete={achData["60"]} hn={hn} />
          <AchievementSquare num={58} complete={achData["58"]} hn={hn} />
          <AchievementSquare num={59} complete={achData["59"]} hn={hn} />

          <AchievementSquare num={58} complete={achData["71"]} hn={hn} />
          <AchievementSquare num={59} complete={achData["72"]} hn={hn} />
          <AchievementSquare num={65} complete={achData["65"]} hn={hn} />
          <AchievementSquare num={73} complete={achData["73"]} hn={hn} />
          <AchievementSquare num={74} complete={achData["74"]} hn={hn} />

          <AchievementSquare num={61} complete={achData["61"]} hn={hn} />
          <AchievementSquare num={62} complete={achData["62"]} hn={hn} />
          <AchievementSquare num={70} complete={achData["70"]} hn={hn} />
          <AchievementSquare num={77} complete={achData["77"]} hn={hn} />
          <AchievementSquare num={76} complete={achData["76"]} hn={hn} />

          <AchievementSquare num={63} complete={achData["63"]} hn={hn} />
          <AchievementSquare num={64} complete={achData["64"]} hn={hn} />
          <AchievementSquare num={75} complete={achData["75"]} hn={hn} />
          <AchievementSquare num={79} complete={achData["79"]} hn={hn} />
          <AchievementSquare num={78} complete={achData["78"]} hn={hn} />

          <AchievementSquare num={81} complete={achData["81"]} hn={hn} />
          <AchievementSquare num={82} complete={achData["82"]} hn={hn} />
          <AchievementSquare num={80} complete={achData["80"]} hn={hn} />
          <AchievementSquare num={87} complete={achData["87"]} hn={hn} />
          <AchievementSquare num={86} complete={achData["86"]} hn={hn} />

          <AchievementSquare num={83} complete={achData["83"]} hn={hn} />
          <AchievementSquare num={84} complete={achData["84"]} hn={hn} />
          <AchievementSquare num={85} complete={achData["85"]} hn={hn} />
          <AchievementSquare num={89} complete={achData["89"]} hn={hn} />
          <AchievementSquare num={88} complete={achData["88"]} hn={hn} />

          <AchievementSquare num={91} complete={achData["91"]} hn={hn} />
          <AchievementSquare num={92} complete={achData["92"]} hn={hn} />
          <AchievementSquare num={90} complete={achData["80"]} hn={hn} />
          <AchievementSquare num={67} complete={achData["67"]} hn={hn} />
          <AchievementSquare num={66} complete={achData["66"]} hn={hn} />

          <AchievementSquare num={93} complete={achData["93"]} hn={hn} />
          <AchievementSquare num={94} complete={achData["94"]} hn={hn} />
          <AchievementSquare num={95} complete={achData["95"]} hn={hn} />
          <AchievementSquare num={69} complete={achData["69"]} hn={hn} />
          <AchievementSquare num={68} complete={achData["68"]} hn={hn} />
          <AchievementWide num={100} complete={achData["100"]} hn={hn} />
          <AchievementWide num={101} complete={achData["101"]} hn={hn} />
        </CenterAchievementCollumn>
        <RightAchievementCollumn>
          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`ordnances`}
              segments={[{ percentage: 4 / 4.2, earned: achData["8"] }]}
              updateHoverCallback={setHn}
              selectedNumbers={[8]}
            />
            <SegmentedProgressBar
              percent={1 / 16.4}
              displayValue={`equipables`}
              segments={[{ percentage: 16 / 16.8, earned: achData["9"] }]}
              updateHoverCallback={setHn}
              selectedNumbers={[9]}
            />
          </AchievementSingleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["daily_stats"]["total_games"] / 45}
              displayValue={"nova:" + userData["daily_stats"]["total_games"]}
              fullWidth={true}
              segments={[
                { percentage: 10 / 45, earned: achData["21"] },
                { percentage: 20 / 45, earned: achData["22"] },
                { percentage: 30 / 45, earned: achData["23"] },
                { percentage: 40 / 45, earned: achData["24"] },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[21, 22, 23, 24]}
            />
          </AchievementDoubleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={userData["daily_stats"]["total_games"] / 45}
              displayValue={"meateor:" + userData["daily_stats"]["total_games"]}
              fullWidth={true}
              segments={[
                { percentage: 10 / 45, earned: achData["41"] },
                { percentage: 20 / 45, earned: achData["42"] },
                { percentage: 30 / 45, earned: achData["43"] },
                { percentage: 40 / 45, earned: achData["44"] },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[41, 42, 43, 44]}
            />
          </AchievementDoubleRow>
          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 28}
              displayValue={`detonator`}
              segments={[{ percentage: 25 / 28, earned: achData["61"] }]}
              updateHoverCallback={setHn}
              selectedNumbers={[61]}
            />
            <SegmentedProgressBar
              percent={1 / 28}
              displayValue={`stun field`}
              segments={[{ percentage: 25 / 28, earned: achData["62"] }]}
              updateHoverCallback={setHn}
              selectedNumbers={[62]}
            />
          </AchievementSingleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`arcmine`}
              segments={[{ percentage: 4 / 4.2, earned: achData["63"] }]}
              updateHoverCallback={setHn}
              selectedNumbers={[63]}
            />
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`instant repair`}
              segments={[{ percentage: 4 / 4.2, earned: achData["64"] }]}
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
                { percentage: 1 / 4.2, earned: achData["26"] },
                { percentage: 2 / 4.2, earned: achData["27"] },
                { percentage: 3 / 4.2, earned: achData["28"] },
                { percentage: 4 / 4.2, earned: achData["29"] },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[26, 27, 28, 29]}
            />
          </AchievementDoubleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={userData["weekly_stats"]["payload_games"] / 55}
              displayValue={`payload`}
              segments={[
                { percentage: 25 / 55, earned: achData["38"] },
                { percentage: 50 / 55, earned: achData["39"] },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[38, 39]}
            />
          </AchievementSingleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 110}
              displayValue={`fission`}
              segments={[{ percentage: 100 / 110, earned: achData["48"] }]}
              updateHoverCallback={setHn}
              selectedNumbers={[48]}
            />
            <SegmentedProgressBar
              percent={1 / 110}
              displayValue={`surge`}
              segments={[{ percentage: 100 / 110, earned: achData["49"] }]}
              updateHoverCallback={setHn}
              selectedNumbers={[49]}
            />
          </AchievementSingleRow>

          <AchievementDoubleRow>
            <SegmentedProgressBar
              percent={0 / 50}
              displayValue={`Both hands stuff`}
              segments={[
                { percentage: 5 / 50, earned: achData["91"] },
                { percentage: 10 / 50, earned: achData["92"] },
                { percentage: 25 / 50, earned: achData["93"] },
                { percentage: 40 / 50, earned: achData["94"] },
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
                { percentage: 20 / 38, earned: achData["71"] },
                { percentage: 25 / 38, earned: achData["72"] },
                { percentage: 30 / 38, earned: achData["73"] },
                { percentage: 35 / 38, earned: achData["74"] },
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
                { percentage: 500 / 4200, earned: achData["56"] },
                { percentage: 1000 / 4200, earned: achData["57"] },
                { percentage: 2000 / 4200, earned: achData["58"] },
                { percentage: 4000 / 4200, earned: achData["59"] },
              ]}
              updateHoverCallback={setHn}
              selectedNumbers={[56, 57, 58, 59]}
            />
          </AchievementDoubleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`arcmine`}
              segments={[{ percentage: 4 / 4.2, earned: achData["67"] }]}
              updateHoverCallback={setHn}
              selectedNumbers={[67]}
            />
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`instant repair`}
              segments={[{ percentage: 4 / 4.2, earned: achData["66"] }]}
              updateHoverCallback={setHn}
              selectedNumbers={[66]}
            />
          </AchievementSingleRow>

          <AchievementSingleRow>
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`arcmine`}
              segments={[{ percentage: 4 / 4.2, earned: achData["69"] }]}
              updateHoverCallback={setHn}
              selectedNumbers={[69]}
            />
            <SegmentedProgressBar
              percent={1 / 4.2}
              displayValue={`instant repair`}
              segments={[{ percentage: 4 / 4.2, earned: achData["68"] }]}
              updateHoverCallback={setHn}
              selectedNumbers={[68]}
            />
          </AchievementSingleRow>
        </RightAchievementCollumn>
      </AchievementsContainer>
    </>
  );
}
