/* eslint-disable */

import { height } from "@mui/system";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AchievementHeaderButton } from "./achievements/AchievementHeaderButton";
import { AchievementLoadoutStats } from "./achievements/AchievementLoadoutStats";
import { MasterAchievementBar } from "./MasterAchievementBar";
import { SegmentedProgressBar } from "./SegmentedProgressBar";
import AchievementLeaderboard from "../pages/AchievementLeaderboard";
var achievementFormatingData = require("./AchievementData.json");
function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}
var collectedAchievementData = {};
export const AchievementSize = 40;
const AchievementGap = 5;

export const AchievementsContainer = styled.div`
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
export const LeftAchievementCollumn = styled.div`
  display: flex;
  flex: 200px 2;
  background-color: transparent;
  margin: 0px ${AchievementGap}px 0px 0px;
  gap: ${AchievementGap}px 0px;
  flex-wrap: wrap;
  flex-direction: column;
`;

export default function Achievements({ userData, screenWidth }) {
  let achievementData = { values: userData["achievements"], locked: {} };
  if (userData["achievements"] === undefined) achievementData.values = {};

  let dailyLoadoutData = userData["daily_stats"]["top_loadout"];

  collectedAchievementData["total_games"] = 4;

  let totalPercentage = 0;
  for (let index = 0; index < 63; index++) {
    totalPercentage += achievementData.values[index.toString()];
  }

  let lockedAchievements = [];
  if (userData.daily_stats.top_loadout) {
    userData.daily_stats.top_loadout.every((element) => {
      if (element[1] < 0.01) return false;
      let loadoutNumber = parseInt(element[0]);

      if (!(loadoutNumber >> 4 == 0)) lockedAchievements[5] = true;
      if (!(loadoutNumber >> 4 == 1)) lockedAchievements[6] = true;
      if (!(loadoutNumber >> 4 == 2)) lockedAchievements[7] = true;
      if (!(loadoutNumber >> 4 == 3)) lockedAchievements[8] = true;

      if (!(((loadoutNumber >> 2) & 3) == 0)) lockedAchievements[9] = true;
      if (!(((loadoutNumber >> 2) & 3) == 1)) lockedAchievements[10] = true;
      if (!(((loadoutNumber >> 2) & 3) == 2)) lockedAchievements[11] = true;
      if (!(((loadoutNumber >> 2) & 3) == 3)) lockedAchievements[12] = true;

      if (!((loadoutNumber & 3) == 0)) lockedAchievements[13] = true;
      if (!((loadoutNumber & 3) == 1)) lockedAchievements[14] = true;
      if (!((loadoutNumber & 3) == 2)) lockedAchievements[15] = true;
      if (!((loadoutNumber & 3) == 3)) lockedAchievements[16] = true;
      return true;
    });
  }
  if (userData.weekly_stats.top_loadout) {
    userData.weekly_stats.top_loadout.every((element) => {
      if (element[1] < 0.01) return false;
      let loadoutNumber = parseInt(element[0]);

      if (!(loadoutNumber >> 4 == 0)) lockedAchievements[30] = true;
      if (!(loadoutNumber >> 4 == 1)) lockedAchievements[31] = true;
      if (!(loadoutNumber >> 4 == 2)) lockedAchievements[32] = true;
      if (!(loadoutNumber >> 4 == 3)) lockedAchievements[33] = true;

      if (!(((loadoutNumber >> 2) & 3) == 0)) lockedAchievements[34] = true;
      if (!(((loadoutNumber >> 2) & 3) == 1)) lockedAchievements[35] = true;
      if (!(((loadoutNumber >> 2) & 3) == 2)) lockedAchievements[36] = true;
      if (!(((loadoutNumber >> 2) & 3) == 3)) lockedAchievements[37] = true;

      if (!((loadoutNumber & 3) == 0)) lockedAchievements[38] = true;
      if (!((loadoutNumber & 3) == 1)) lockedAchievements[39] = true;
      if (!((loadoutNumber & 3) == 2)) lockedAchievements[40] = true;
      if (!((loadoutNumber & 3) == 3)) lockedAchievements[41] = true;
      return true;
    });
  }
  const [wantFAQ, setWantFAQ] = useState(false);
  const [hasFAQ, setHasFAQ] = useState(false);

  const [fullView, setFullView] = useState(false);

  const [selectedAchievementType, setSelectedAchievementType] =
    useState("daily");
  useEffect(async () => {
    function delay(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }
    if (!fullView) return;
    async function FAQAnimation() {
      setFullView(false);
      await delay(500);
      setHasFAQ(wantFAQ);
      setFullView(true);
    }
    FAQAnimation();
  }, [wantFAQ]);

  var communityTotal = 0;
  for (let index = 1; index <= 4; index++) {
    if (achievementData.values[index] === undefined) {
      communityTotal += 0;
    } else {
      communityTotal += achievementData.values[index];
    }
  }
  communityTotal /= 4;

  var dailyTotal = 0;
  for (let index = 5; index <= 29; index++) {
    if (achievementData.values[index] === undefined) {
      dailyTotal += 0;
    } else {
      dailyTotal += achievementData.values[index];
    }
  }
  dailyTotal /= 25;

  var weeklyTotal = 0;
  for (let index = 30; index <= 54; index++) {
    if (achievementData.values[index] === undefined) {
      weeklyTotal += 0;
    } else {
      weeklyTotal += achievementData.values[index];
    }
  }
  weeklyTotal /= 25;

  var alltimeTotal = 0;
  for (let index = 55; index <= 79; index++) {
    if (achievementData.values[index] === undefined) {
      alltimeTotal += 0;
    } else {
      alltimeTotal += achievementData.values[index];
    }
  }
  alltimeTotal /= 25;
  let containerHeight = 50;

  return (
    <div
      className="padded rounded list"
      style={{
        maxHeight: fullView ? 1500 : 50,
        ...(fullView
          ? { padding: "10px 20px 20px", gap: "20px" }
          : { padding: "0px", gap: "0px" }),
        transitionProperty: "padding,max-height,gap",
        transitionDuration: "0.5s",
      }}
    >
      <div
        style={{ color: "white", cursor: "pointer" }}
        onClick={() => {
          setFullView(!fullView);
        }}
      >
        <div
          className=""
          style={{
            margin: "-1px 0px 0px 0px",
            gap: fullView ? "" : "0px",
          }}
        >
          <MasterAchievementBar
            CommunityPercent={(communityTotal * 4) / 79}
            DailyPercent={(dailyTotal * 25) / 79}
            WeeklyPercent={(weeklyTotal * 25) / 79}
            SeasonPercent={(alltimeTotal * 25) / 79}
            // Percentage={achievementData.values["63"]}
            Title={""}
            Height={"50px"}
            EnableBorder={true}
            clickMe={true}
          />
        </div>
      </div>
      {screenWidth < 700 ? (
        <div>
          Challenges cannot be viewed on mobile. Please move to a desktop
        </div>
      ) : hasFAQ ? (
        <div className="centering">
          <div
            className="rounded padded light-background list"
            style={{ width: "50%" }}
          >
            <h2>THE FLAMINGO CHALLENGE FAQ</h2>
            <p>
              Echo Combat Lounge and ECRanked announce the release of The
              Flamingo Challenge, an ongoing/regular event for Echo Combat (an
              in-app purchase for Echo VR by Ready at Dawn for the Oculus/Meta
              platform) running parallel to Echo VR's Echo Pass from start to
              end of each season. Season 1 begins March 15th, 2022 and ends May
              31st, 2022, the same days as Echo Pass Season 5.
            </p>

            <h2>Can you lose progress?</h2>
            <p>
              Nope! You never lose progress on challenges. However a challenge
              can become "locked" meaning that you are unable to progress
              further until it becomes unlocked.
            </p>

            <h2>How do you unlock a challange?</h2>
            <p>
              By waiting! When a daily challenge gets locked you have to wait
              till tomorrow for it to become unlocked. Meaning you have to start
              over to gain any more progress. Same with weekly challenges. You
              have to wait till monday of the next week for it to reset for the
              challenge to become unlocked
            </p>
            <h2>How do weekly and daily challenges work?</h2>
            <p>
              Daily challenges are determined by statistics that reset every day
              at midnight PST, 3am EST, 7pm GMT. Weekly challenges are
              determined by statistics that reset every week monday at midnight.
              So when games start on monday all weekly stats reset.
            </p>
            <div
              className="button rounded padded centering"
              onClick={() => {
                setWantFAQ(false);
              }}
            >
              Return
            </div>
          </div>
        </div>
      ) : (
        <div className="horizontal-container" style={{ display: "flex" }}>
          {/* <div style={{ flexBasis: 0, flexGrow: 1 }}>
            <div
              className="button padded rounded centering"
              onClick={() => {
                setWantFAQ(true);
              }}
            >
              SEE FAQ
            </div>
          </div> */}
          <div style={{ flexBasis: 0, flexGrow: 5 }}>
            <div className="list" style={{ width: "100%", margin: "0 auto" }}>
              <div className="horizontal-container">
                <AchievementHeaderButton
                  selectedAchievementType={selectedAchievementType}
                  setSelectedAchievementType={setSelectedAchievementType}
                  name={"community"}
                  displayName={"Community"}
                  progress={communityTotal}
                  progressClass={"community-background"}
                />
                <AchievementHeaderButton
                  selectedAchievementType={selectedAchievementType}
                  setSelectedAchievementType={setSelectedAchievementType}
                  name={"daily"}
                  displayName={"Day"}
                  progress={dailyTotal}
                  progressClass={"daily-background"}
                />
                <AchievementHeaderButton
                  selectedAchievementType={selectedAchievementType}
                  setSelectedAchievementType={setSelectedAchievementType}
                  name={"weekly"}
                  displayName={"Week"}
                  progress={weeklyTotal}
                  progressClass={"weekly-background"}
                />
                <AchievementHeaderButton
                  selectedAchievementType={selectedAchievementType}
                  setSelectedAchievementType={setSelectedAchievementType}
                  name={"global"}
                  displayName={"Season"}
                  progress={alltimeTotal}
                  progressClass={"season-background"}
                />
              </div>
              <AchievementLoadoutStats
                userData={userData}
                selectedAchievementType={selectedAchievementType}
                achievementData={achievementData}
                lockedAchievements={lockedAchievements}
              />
              <div
                className="button rounded padded"
                onClick={() => {
                  setWantFAQ(true);
                }}
              >
                FAQ
              </div>
            </div>
          </div>
          {screenWidth < 1000 ? null : (
            <div style={{ flexBasis: 0, flexGrow: 1.5 }}>
              {userData.oculus_id ? (
                <AchievementLeaderboard
                  setBannerCallback={() => {}}
                  surroundID={userData.oculus_id}
                  limit={6}
                />
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );

  // return (
  //   <div
  //     className="padded rounded list"
  //     style={{
  //       height: fullView ? 2000 : 50,
  //       ...(fullView
  //         ? { padding: "10px 20px 20px", gap: "20px" }
  //         : { padding: "0px", gap: "0px" }),
  //       transitionProperty: "padding,height,gap",
  //       transitionDuration: "0.5s",
  //     }}
  //   >
  //     <div
  //       style={{ color: "white", cursor: "pointer" }}
  //       onClick={() => {
  //         setFullView(!fullView);
  //       }}
  //     >
  //       <div
  //         className="horizontal-container"
  //         style={{
  //           gap: fullView ? "" : "0px",
  //         }}
  //       >
  //         <MasterAchievementBar
  //           CommunityPercent={(communityTotal * 5) / 80}
  //           DailyPercent={(dailyTotal * 25) / 80}
  //           WeeklyPercent={(weeklyTotal * 25) / 80}
  //           SeasonPercent={(alltimeTotal * 25) / 80}
  //           // Percentage={achievementData.values["63"]}
  //           Title={""}
  //           Height={"50px"}
  //           EnableBorder={fullView}
  //         />

  //         <h3
  //           style={{
  //             margin: fullView ? "auto 10px" : "auto 0px",
  //             width: fullView ? "90px" : "0px",
  //             flexBasis: 0,
  //             transitionProperty: "margin,width",
  //             transitionDuration: "0.5s",
  //           }}
  //         ></h3>
  //       </div>
  //     </div>
  //     <div className="list" style={{ width: "70%", margin: "0 auto" }}>
  //       <div className="horizontal-container">
  //         <AchievementHeaderButton
  //           selectedAchievementType={selectedAchievementType}
  //           setSelectedAchievementType={setSelectedAchievementType}
  //           name={"community"}
  //           displayName={"Community"}
  //           progress={communityTotal}
  //           progressClass={"community-background"}
  //         />
  //         <AchievementHeaderButton
  //           selectedAchievementType={selectedAchievementType}
  //           setSelectedAchievementType={setSelectedAchievementType}
  //           name={"daily"}
  //           displayName={"Daily"}
  //           progress={dailyTotal}
  //           progressClass={"daily-background"}
  //         />
  //         <AchievementHeaderButton
  //           selectedAchievementType={selectedAchievementType}
  //           setSelectedAchievementType={setSelectedAchievementType}
  //           name={"weekly"}
  //           displayName={"Weekly"}
  //           progress={weeklyTotal}
  //           progressClass={"weekly-background"}
  //         />
  //         <AchievementHeaderButton
  //           selectedAchievementType={selectedAchievementType}
  //           setSelectedAchievementType={setSelectedAchievementType}
  //           name={"global"}
  //           displayName={"Season"}
  //           progress={alltimeTotal}
  //           progressClass={"season-background"}
  //         />
  //       </div>
  //       <AchievementLoadoutStats
  //         userData={userData}
  //         selectedAchievementType={selectedAchievementType}
  //         achievementData={achievementData}
  //         lockedAchievements={lockedAchievements}
  //       />
  //     </div>
  //   </div>
  // );
}
