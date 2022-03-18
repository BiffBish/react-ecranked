import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AchievementHeaderButton } from "./achievements/AchievementHeaderButton";
import { AchievementLoadoutStats } from "./achievements/AchievementLoadoutStats";
import { MasterAchievementBar } from "./MasterAchievementBar";
import AchievementLeaderboard from "../pages/AchievementLeaderboard";
var achievementFormattingData = require("./AchievementData.json");

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
export const LeftAchievementColumn = styled.div`
  display: flex;
  flex: 200px 2;
  background-color: transparent;
  margin: 0px ${AchievementGap}px 0px 0px;
  gap: ${AchievementGap}px 0px;
  flex-wrap: wrap;
  flex-direction: column;
`;

export default function Achievements({ userData, screenWidth }) {
  const [achievementData, setAchievementData] = useState(undefined);

  useEffect(() => {
    const exportAchievementData = {};
    var totalPercentage = 0;
    var communityTotal = 0;

    var dailyTotal = 0;
    var weeklyTotal = 0;
    var seasonTotal = 0;
    let achievementIcons = [
      "pulsar",
      "nova",
      "comet",
      "meteor",
      "detonator",
      "stun_field",
      "arc_mine",
      "instant_repair",
      "repair_matrix",
      "threat_scanner",
      "energy_barrier",
      "phaseshift",
      "loadout",
      "deaths",
      "capture_point",
      "payload",
      "team_proximity",
      "enemy_proximity",
      "speed",
      "inverted",
      "dyson",
      "combustion",
      "fission",
      "surge",
      "pubs",
    ];
    for (let index = 0; index < 80; index++) {
      var element = userData?.achievements?.[index];
      if (element === undefined) {
        element = 0;
      }
      let pubCount = 0;

      totalPercentage += element;
      if (index < 5) {
        communityTotal += element;
      } else if (index < 29) {
        dailyTotal += element;
      } else if (index < 54) {
        weeklyTotal += element;
        pubCount = userData?.weekly_stats?.total_games ?? 0;
      } else if (index < 79) {
        seasonTotal += element;
        pubCount = userData?.achievement_stats?.total_games ?? 0;
      }

      let chosenIcon = "community";
      if (index > 4) {
        chosenIcon = achievementIcons[(index - 5) % 25];
      }
      exportAchievementData[index] = {
        id: index,
        value: element,
        locked: false,
        formatting: achievementFormattingData[index],
        pubCount: pubCount,
        icon: chosenIcon,
      };
    }
    exportAchievementData.totalPercentage = totalPercentage / 79;
    exportAchievementData.communityTotal = communityTotal / 79;
    exportAchievementData.dailyTotal = dailyTotal / 79;
    exportAchievementData.weeklyTotal = weeklyTotal / 79;
    exportAchievementData.seasonTotal = seasonTotal / 79;
    exportAchievementData.oculus_id = userData?.achievements?.oculus_id ?? null;

    if (userData && userData.daily_stats && userData.daily_stats.top_loadout) {
      userData.daily_stats.top_loadout.every((element) => {
        if (element[1] < 0.01) return false;
        let loadoutNumber = parseInt(element[0]);

        if (loadoutNumber >> 4 !== 0) exportAchievementData[5].locked = true;
        if (loadoutNumber >> 4 !== 1) exportAchievementData[6].locked = true;
        if (loadoutNumber >> 4 !== 2) exportAchievementData[7].locked = true;
        if (loadoutNumber >> 4 !== 3) exportAchievementData[8].locked = true;

        if (((loadoutNumber >> 2) & 3) !== 0)
          exportAchievementData[9].locked = true;
        if (((loadoutNumber >> 2) & 3) !== 1)
          exportAchievementData[10].locked = true;
        if (((loadoutNumber >> 2) & 3) !== 2)
          exportAchievementData[11].locked = true;
        if (((loadoutNumber >> 2) & 3) !== 3)
          exportAchievementData[12].locked = true;

        if ((loadoutNumber & 3) !== 0) exportAchievementData[13].locked = true;
        if ((loadoutNumber & 3) !== 1) exportAchievementData[14].locked = true;
        if ((loadoutNumber & 3) !== 2) exportAchievementData[15].locked = true;
        if ((loadoutNumber & 3) !== 3) exportAchievementData[16].locked = true;
        return true;
      });
    }
    if (
      userData &&
      userData.weekly_stats &&
      userData.weekly_stats.top_loadout
    ) {
      userData.weekly_stats.top_loadout.every((element) => {
        if (element[1] < 0.01) return false;
        let loadoutNumber = parseInt(element[0]);

        if (loadoutNumber >> 4 !== 0) exportAchievementData[30].locked = true;
        if (loadoutNumber >> 4 !== 1) exportAchievementData[31].locked = true;
        if (loadoutNumber >> 4 !== 2) exportAchievementData[32].locked = true;
        if (loadoutNumber >> 4 !== 3) exportAchievementData[33].locked = true;

        if (((loadoutNumber >> 2) & 3) !== 0)
          exportAchievementData[34].locked = true;
        if (((loadoutNumber >> 2) & 3) !== 1)
          exportAchievementData[35].locked = true;
        if (((loadoutNumber >> 2) & 3) !== 2)
          exportAchievementData[36].locked = true;
        if (((loadoutNumber >> 2) & 3) !== 3)
          exportAchievementData[37].locked = true;

        if ((loadoutNumber & 3) !== 0) exportAchievementData[38].locked = true;
        if ((loadoutNumber & 3) !== 1) exportAchievementData[39].locked = true;
        if ((loadoutNumber & 3) !== 2) exportAchievementData[40].locked = true;
        if ((loadoutNumber & 3) !== 3) exportAchievementData[41].locked = true;
        return true;
      });
    }
    exportAchievementData[43].pubRequirement = 40;
    exportAchievementData[46].pubRequirement = 40;
    exportAchievementData[47].pubRequirement = 40;
    exportAchievementData[48].pubRequirement = 40;
    exportAchievementData[49].pubRequirement = 40;

    exportAchievementData[71].pubRequirement = 200;
    exportAchievementData[72].pubRequirement = 200;
    exportAchievementData[73].pubRequirement = 200;
    exportAchievementData[74].pubRequirement = 200;

    setAchievementData(exportAchievementData);
  }, [userData]);

  const [wantFAQ, setWantFAQ] = useState(false);
  const [hasFAQ, setHasFAQ] = useState(false);

  const [fullView, setFullView] = useState(false);

  const [selectedAchievementType, setSelectedAchievementType] =
    useState("daily");

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wantFAQ]);

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
            CommunityPercent={achievementData?.communityTotal ?? 0}
            DailyPercent={achievementData?.dailyTotal ?? 0}
            WeeklyPercent={achievementData?.weeklyTotal ?? 0}
            SeasonPercent={achievementData?.seasonTotal ?? 0}
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
            <div
              className="button rounded padded centering fill"
              onClick={() => {
                setWantFAQ(false);
              }}
            >
              <div className="list centering">
                <p
                  className="conthrax"
                  style={{
                    lineHeight: "10px",
                    height: "10px",
                    fontSize: "30px",
                  }}
                >
                  Return
                </p>
              </div>
            </div>
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

            <h2>How do you unlock a challenge?</h2>
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
              className="button rounded padded centering fill"
              onClick={() => {
                setWantFAQ(false);
              }}
            >
              <div className="list centering">
                <p
                  className="conthrax"
                  style={{
                    lineHeight: "10px",
                    height: "10px",
                    fontSize: "30px",
                  }}
                >
                  Return
                </p>
              </div>
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
                  progress={((achievementData?.communityTotal ?? 0) / 4) * 79}
                  progressClass={"community-background"}
                />
                <AchievementHeaderButton
                  selectedAchievementType={selectedAchievementType}
                  setSelectedAchievementType={setSelectedAchievementType}
                  name={"daily"}
                  displayName={"Day"}
                  progress={((achievementData?.dailyTotal ?? 0) / 25) * 79}
                  progressClass={"daily-background"}
                />
                <AchievementHeaderButton
                  selectedAchievementType={selectedAchievementType}
                  setSelectedAchievementType={setSelectedAchievementType}
                  name={"weekly"}
                  displayName={"Week"}
                  progress={((achievementData?.weeklyTotal ?? 0) / 25) * 79}
                  progressClass={"weekly-background"}
                />
                <AchievementHeaderButton
                  selectedAchievementType={selectedAchievementType}
                  setSelectedAchievementType={setSelectedAchievementType}
                  name={"global"}
                  displayName={"Season"}
                  progress={((achievementData?.seasonTotal ?? 0) / 25) * 79}
                  progressClass={"season-background"}
                />
              </div>
              <div
                className="button rounded padded centering fill"
                onClick={() => {
                  setWantFAQ(true);
                }}
              >
                <div className="list centering">
                  <p
                    className="conthrax"
                    style={{
                      lineHeight: "10px",
                      height: "10px",
                      fontSize: "30px",
                    }}
                  >
                    FAQ
                  </p>
                </div>
              </div>
              <AchievementLoadoutStats
                userData={userData}
                selectedAchievementType={selectedAchievementType}
                achievementsData={achievementData}
              />
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
}
