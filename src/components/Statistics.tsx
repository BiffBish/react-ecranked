import styled from "styled-components";
import { Dispatch, useEffect, useState } from "react";
import { LoadoutBox } from "./LoadoutBox";
import { Heatmap } from "./Heatmap";
import { GrowToFullScreen } from "./GrowToFullScreen";
import { Types, User } from "@ecranked/api";
import { UserStats } from "./UserStats";

export function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
// import { SideBySideMagnifier } from "react-image-magnifiers";
export function map_range(value: number, low1: number, high1: number, low2: number, high2: number) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}
export const ContainerTitle = styled.div`
  font-size: 36px;
  font-weight: 400;
  margin: 10px 0px;
  text-align: center;
  flex: 0 0 100%;
  color: #fff;
  flex-grow: 0;
`;
const LoadoutStyle = styled.div`
  flex-wrap: wrap;

  display: flex;
  padding: 10px 10px 10px;
  background-color: #282828;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
`;
const LoadoutExpandButtonStyle = styled.div`
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  flex-grow: 1;
  margin: 10px;
  height: 40px;
  text-align: center;
  cursor: pointer;
`;

type LoadoutProps = {
  user_id: string | null;
  top_loadout: Types.Stats["top_loadout"]
}
const Loadout = ({ user_id, top_loadout }: LoadoutProps) => {
  const [numOfEntrys, setNumOfEntrys] = useState(5);
  const [scaledLoadoutData, setScaledLoadoutData] = useState<[string, number][]>([]);

  useEffect(() => {
    //Scale each value by the total of all the values
    const total = top_loadout.reduce((acc, cur) => acc + cur[1], 0);
    setScaledLoadoutData(top_loadout.map(([name, value]) => [name, value / total]));
  }, [top_loadout]);


  return (
    <>
      <LoadoutStyle>
        {scaledLoadoutData.slice(0, numOfEntrys).map((loadout) => {
          return (
            <LoadoutBox
              user_id={user_id}
              number={loadout[0]}
              frequency={loadout[1]}
              key={loadout[0]}
            />
          );
        }, 4)}{" "}
        <LoadoutExpandButtonStyle
          onClick={() => {
            setNumOfEntrys(numOfEntrys * 2);
          }}
        >
          {" "}
          Click to show more{" "}
        </LoadoutExpandButtonStyle>
      </LoadoutStyle>
    </>
  );
};

const CenterColumnStyle = styled.div`
  // background-color: #282828;
  float: left;
  display: flex;
  flex: 400px 4;
  gap: 10px;
`;
const StatChoiceStyle = styled.div`
  padding: 0px;
  background-color: #333;
  color: white;
  float: left;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 0px 10px;
`;
const StatChoiceButton = styled.div`
  padding: 10px 10px 0px;
  background-color: #282828;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
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
`;

enum StatChoiceOptions {
  weekly_stats = "weekly_stats",
  daily_stats = "daily_stats",
  monthly_stats = "monthly_stats",
  stats = "stats"
}

interface StatChoiceProps {
  currentSelected: StatChoiceOptions,
  onClick: (arg0: StatChoiceOptions) => void
}

const StatChoice = ({ currentSelected, onClick }: StatChoiceProps) => {
  return (
    <StatChoiceStyle>
      <StatChoiceButton
        style={
          currentSelected === "weekly_stats" ? { backgroundColor: "#333" } : {}
        }
        onClick={() => {
          onClick(StatChoiceOptions.weekly_stats);
        }}
      >
        7 Days
      </StatChoiceButton>
      <StatChoiceButton
        style={
          currentSelected === "monthly_stats"
            ? { backgroundColor: "#333" }
            : {}
        }
        onClick={() => {
          onClick(StatChoiceOptions.monthly_stats);
        }}
      >
        Monthly
      </StatChoiceButton>
      <StatChoiceButton
        style={currentSelected === "stats" ? { backgroundColor: "#333" } : {}}
        onClick={() => {
          onClick(StatChoiceOptions.stats);
        }}
      >
        All time
      </StatChoiceButton>
    </StatChoiceStyle>
  );
};
const LeftCenterSection = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
`;

interface StatisticsProps {
  userData: User | null,
}
export const Statistics = ({ userData }: StatisticsProps) => {
  const [statChoice, setStatChoice] = useState<StatChoiceOptions>(StatChoiceOptions.stats);

  return (
    <CenterColumnStyle>
      <LeftCenterSection>
        <StatChoice
          currentSelected={statChoice}
          onClick={(table) => {
            setStatChoice(table);
          }}
        />
        <UserStats userData={userData} statChoice={statChoice} />
        <GrowToFullScreen defaultState={{ selectedHeatmap: 0 }}>
          <Heatmap userData={userData} isFullscreenComponent={false} isAnimating={false} useFullscreenState={function (): [boolean, Dispatch<boolean>] {
            throw new Error("Function not implemented.");
          }} useSharedState={function <T>(): [T, Dispatch<T>] {
            throw new Error("Function not implemented.");
          }} />
        </GrowToFullScreen>
        <Loadout
          user_id={userData?.oculus_id ?? null}
          top_loadout={
            userData?.[statChoice]?.["top_loadout"] ?? []
          }
        />
      </LeftCenterSection>
    </CenterColumnStyle>
  );
};
