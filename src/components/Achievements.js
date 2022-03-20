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

    const todayValues = [
      /* 0 */ "",
      /* 1 */ "",
      /* 2 */ "",
      /* 3 */ "",
      /* 4 */ "",
      /* 5 */ userData.daily_stats.total_games,
      /* 6 */ userData.daily_stats.total_games,
      /* 7 */ userData.daily_stats.total_games,
      /* 8 */ userData.daily_stats.total_games,
      /* 9 */ userData.daily_stats.total_games,
      /* 10 */ userData.daily_stats.total_games,
      /* 11 */ userData.daily_stats.total_games,
      /* 12 */ userData.daily_stats.total_games,
      /* 13 */ userData.daily_stats.total_games,
      /* 14 */ userData.daily_stats.total_games,
      /* 15 */ userData.daily_stats.total_games,
      /* 16 */ userData.daily_stats.total_games,
      /* 17 */ Math.round(exportAchievementData[17] * 12),
      /* 18 */ "",
      /* 19 */ "",
      /* 20 */ "",
      /* 21 */ "",
      /* 22 */ "",
      /* 23 */ "",
      /* 24 */ "",
      /* 25 */ "",
      /* 26 */ "",
      /* 27 */ "",
      /* 28 */ "",
      /* 29 */ "",
      /* 30 */ userData.weekly_stats.total_games,
      /* 31 */ userData.weekly_stats.total_games,
      /* 32 */ userData.weekly_stats.total_games,
      /* 33 */ userData.weekly_stats.total_games,
      /* 34 */ userData.weekly_stats.total_games,
      /* 35 */ userData.weekly_stats.total_games,
      /* 36 */ userData.weekly_stats.total_games,
      /* 37 */ userData.weekly_stats.total_games,
      /* 38 */ userData.weekly_stats.total_games,
      /* 39 */ userData.weekly_stats.total_games,
      /* 40 */ userData.weekly_stats.total_games,
      /* 41 */ userData.weekly_stats.total_games,
    ];
    const todayProgress = [
      /* 0 */ "",
      /* 1 */ "",
      /* 2 */ "",
      /* 3 */ "",
      /* 4 */ "",
      /* 5 */ userData.daily_stats.total_games / 15,
      /* 6 */ userData.daily_stats.total_games / 15,
      /* 7 */ userData.daily_stats.total_games / 15,
      /* 8 */ userData.daily_stats.total_games / 15,
      /* 9 */ userData.daily_stats.total_games / 15,
      /* 10 */ userData.daily_stats.total_games / 15,
      /* 11 */ userData.daily_stats.total_games / 15,
      /* 12 */ userData.daily_stats.total_games / 15,
      /* 13 */ userData.daily_stats.total_games / 15,
      /* 14 */ userData.daily_stats.total_games / 15,
      /* 15 */ userData.daily_stats.total_games / 15,
      /* 16 */ userData.daily_stats.total_games / 15,
      /* 17 */ Math.round(exportAchievementData[17] * 12),
      /* 18 */ "",
      /* 19 */ "",
      /* 20 */ "",
      /* 21 */ "",
      /* 22 */ "",
      /* 23 */ "",
      /* 24 */ "",
      /* 25 */ "",
      /* 26 */ "",
      /* 27 */ "",
      /* 28 */ "",
      /* 29 */ "",
      /* 30 */ userData.weekly_stats.total_games / 40,
      /* 31 */ userData.weekly_stats.total_games / 40,
      /* 32 */ userData.weekly_stats.total_games / 40,
      /* 33 */ userData.weekly_stats.total_games / 40,
      /* 34 */ userData.weekly_stats.total_games / 40,
      /* 35 */ userData.weekly_stats.total_games / 40,
      /* 36 */ userData.weekly_stats.total_games / 40,
      /* 37 */ userData.weekly_stats.total_games / 40,
      /* 38 */ userData.weekly_stats.total_games / 40,
      /* 39 */ userData.weekly_stats.total_games / 40,
      /* 40 */ userData.weekly_stats.total_games / 40,
      /* 41 */ userData.weekly_stats.total_games / 40,
    ];

    for (let index = 0; index < 80; index++) {
      var element = userData?.achievements?.[index];
      if (element === undefined) {
        element = 0;
      }
      let pubCount = 0;
      if (index > 0) {
        totalPercentage += element;
      }

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

    todayValues.forEach((element, index) => {
      exportAchievementData[index].todayValue = element;
    });

    todayProgress.forEach((element, index) => {
      exportAchievementData[index].todayProgress = element;
    });

    console.log("#110", totalPercentage / 79);
    exportAchievementData.totalPercentage = totalPercentage / 79;
    exportAchievementData.communityTotal = communityTotal / 79;
    exportAchievementData.dailyTotal = dailyTotal / 79;
    exportAchievementData.weeklyTotal = weeklyTotal / 79;
    exportAchievementData.seasonTotal = seasonTotal / 79;
    exportAchievementData.oculus_id = userData?.achievements?.oculus_id ?? null;
    if (!userData) return null;
    if (userData && userData.daily_stats && userData.daily_stats.top_loadout) {
      userData.daily_stats.top_loadout.every((element) => {
        if (element[1] < 0.01) return false;
        let loadoutNumber = parseInt(element[0]);

        if (loadoutNumber >> 4 !== 0) exportAchievementData[5].locked = true;
        else exportAchievementData[5].inProgress = true;
        if (loadoutNumber >> 4 !== 1) exportAchievementData[6].locked = true;
        else exportAchievementData[6].inProgress = true;
        if (loadoutNumber >> 4 !== 2) exportAchievementData[7].locked = true;
        else exportAchievementData[7].inProgress = true;
        if (loadoutNumber >> 4 !== 3) exportAchievementData[8].locked = true;
        else exportAchievementData[8].inProgress = true;

        if (((loadoutNumber >> 2) & 3) !== 0) exportAchievementData[9].locked = true;
        else exportAchievementData[9].inProgress = true;
        if (((loadoutNumber >> 2) & 3) !== 1) exportAchievementData[10].locked = true;
        else exportAchievementData[10].inProgress = true;
        if (((loadoutNumber >> 2) & 3) !== 2) exportAchievementData[11].locked = true;
        else exportAchievementData[11].inProgress = true;
        if (((loadoutNumber >> 2) & 3) !== 3) exportAchievementData[12].locked = true;
        else exportAchievementData[12].inProgress = true;

        if ((loadoutNumber & 3) !== 0) exportAchievementData[13].locked = true;
        else exportAchievementData[13].inProgress = true;
        if ((loadoutNumber & 3) !== 1) exportAchievementData[14].locked = true;
        else exportAchievementData[14].inProgress = true;
        if ((loadoutNumber & 3) !== 2) exportAchievementData[15].locked = true;
        else exportAchievementData[15].inProgress = true;
        if ((loadoutNumber & 3) !== 3) exportAchievementData[16].locked = true;
        else exportAchievementData[16].inProgress = true;

        return true;
      });
    }

    if (userData?.weekly_stats?.top_loadout) {
      userData.weekly_stats.top_loadout.every((element) => {
        if (element[1] < 0.01) return false;
        let loadoutNumber = parseInt(element[0]);

        if (loadoutNumber >> 4 !== 0) exportAchievementData[30].locked = true;
        else exportAchievementData[30].inProgress = true;
        if (loadoutNumber >> 4 !== 1) exportAchievementData[31].locked = true;
        else exportAchievementData[31].inProgress = true;
        if (loadoutNumber >> 4 !== 2) exportAchievementData[32].locked = true;
        else exportAchievementData[32].inProgress = true;
        if (loadoutNumber >> 4 !== 3) exportAchievementData[33].locked = true;
        else exportAchievementData[33].inProgress = true;

        if (((loadoutNumber >> 2) & 3) !== 0) exportAchievementData[34].locked = true;
        else exportAchievementData[34].inProgress = true;
        if (((loadoutNumber >> 2) & 3) !== 1) exportAchievementData[35].locked = true;
        else exportAchievementData[35].inProgress = true;
        if (((loadoutNumber >> 2) & 3) !== 2) exportAchievementData[36].locked = true;
        else exportAchievementData[36].inProgress = true;
        if (((loadoutNumber >> 2) & 3) !== 3) exportAchievementData[37].locked = true;
        else exportAchievementData[37].inProgress = true;

        if ((loadoutNumber & 3) !== 0) exportAchievementData[38].locked = true;
        else exportAchievementData[38].inProgress = true;
        if ((loadoutNumber & 3) !== 1) exportAchievementData[39].locked = true;
        else exportAchievementData[39].inProgress = true;
        if ((loadoutNumber & 3) !== 2) exportAchievementData[40].locked = true;
        else exportAchievementData[40].inProgress = true;
        if ((loadoutNumber & 3) !== 3) exportAchievementData[41].locked = true;
        else exportAchievementData[41].inProgress = true;

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

    exportAchievementData[30].todayValueText = "";

    function setMessage(achievementData, timeframe, word, otherWordList) {
      const id = achievementData.id;
      if (timeframe === "week") timeframe = "this week";
      if (timeframe === "day") timeframe = "today";
      if (achievementData.locked && achievementData.inProgress) {
        achievementData.formatting.Locked =
          "You have used " +
          word +
          " " +
          timeframe +
          ", however since you also used " +
          otherWordList.join("/") +
          " this challenge is locked.";
      }
      if (achievementData.locked) {
        achievementData.formatting.Locked =
          "You have not used " +
          word +
          " " +
          timeframe +
          ", however since you also used " +
          otherWordList.join("/") +
          " this challenge is locked.";
      }
      if (achievementData.inProgress) {
        if (timeframe === "this week") timeframe = "This week";
        if (timeframe === "today") timeframe = "Today";

        if (achievementData.todayProgress < achievementData.value) {
          achievementData.formatting.Progress =
            "You are currently only using " +
            word +
            ". " +
            timeframe +
            "s progress is " +
            todayValues[id] +
            " games. The white bar is your highest record. Keep playing games using only detonator to surpass your record and keep progressing.";
        } else {
          achievementData.formatting.Progress =
            "You are currently only using " +
            word +
            ". " +
            timeframe +
            "s progress is " +
            todayValues[id] +
            " games. Keep playing games using only " +
            word +
            " to continue progressing.";
        }

        return;
      }

      achievementData.formatting.Progress =
        "You have not used " + word + " " + timeframe + ". Play a game using only meteor to start progressing.";
    }

    let dailyWeaponsList = [];
    let dailyOrdsList = [];
    let dailyTechsList = [];
    if (exportAchievementData[5].inProgress) dailyWeaponsList.push("pulsar");
    if (exportAchievementData[6].inProgress) dailyWeaponsList.push("nova");
    if (exportAchievementData[7].inProgress) dailyWeaponsList.push("comet");
    if (exportAchievementData[8].inProgress) dailyWeaponsList.push("meteor");
    if (exportAchievementData[9].inProgress) dailyOrdsList.push("detonator");
    if (exportAchievementData[10].inProgress) dailyOrdsList.push("stun field");
    if (exportAchievementData[11].inProgress) dailyOrdsList.push("arc mine");
    if (exportAchievementData[12].inProgress) dailyOrdsList.push("instant repair");
    if (exportAchievementData[13].inProgress) dailyTechsList.push("repair matrix");
    if (exportAchievementData[14].inProgress) dailyTechsList.push("threat scanner");
    if (exportAchievementData[15].inProgress) dailyTechsList.push("energy barrier");
    if (exportAchievementData[16].inProgress) dailyTechsList.push("phase shift");

    let weeklyWeaponsList = [];
    let weeklOrdsList = [];
    let weeklyTechsList = [];
    if (exportAchievementData[30].inProgress) weeklyWeaponsList.push("pulsar");
    if (exportAchievementData[31].inProgress) weeklyWeaponsList.push("nova");
    if (exportAchievementData[32].inProgress) weeklyWeaponsList.push("comet");
    if (exportAchievementData[33].inProgress) weeklyWeaponsList.push("meteor");
    if (exportAchievementData[34].inProgress) weeklOrdsList.push("detonator");
    if (exportAchievementData[35].inProgress) weeklOrdsList.push("stun field");
    if (exportAchievementData[36].inProgress) weeklOrdsList.push("arc mine");
    if (exportAchievementData[37].inProgress) weeklOrdsList.push("instant repair");
    if (exportAchievementData[38].inProgress) weeklyTechsList.push("repair matrix");
    if (exportAchievementData[39].inProgress) weeklyTechsList.push("threat scanner");
    if (exportAchievementData[40].inProgress) weeklyTechsList.push("energy barrier");
    if (exportAchievementData[41].inProgress) weeklyTechsList.push("phase shift");

    setMessage(exportAchievementData[30], "week", "pulsar", weeklyWeaponsList);
    setMessage(exportAchievementData[31], "week", "nova", weeklyWeaponsList);
    setMessage(exportAchievementData[32], "week", "comet", weeklyWeaponsList);
    setMessage(exportAchievementData[33], "week", "meteor", weeklyWeaponsList);
    setMessage(exportAchievementData[34], "week", "detonator", weeklOrdsList);
    setMessage(exportAchievementData[35], "week", "stun field", weeklOrdsList);
    setMessage(exportAchievementData[36], "week", "arc mine", weeklOrdsList);
    setMessage(exportAchievementData[37], "week", "instant repair", weeklOrdsList);
    setMessage(exportAchievementData[38], "week", "repair matrix", weeklyTechsList);
    setMessage(exportAchievementData[39], "week", "threat scanner", weeklyTechsList);
    setMessage(exportAchievementData[40], "week", "energy barrier", weeklyTechsList);
    setMessage(exportAchievementData[41], "week", "phase shift", weeklyTechsList);

    setMessage(exportAchievementData[5], "day", "pulsar", dailyWeaponsList);
    setMessage(exportAchievementData[6], "day", "nova", dailyWeaponsList);
    setMessage(exportAchievementData[7], "day", "comet", dailyWeaponsList);
    setMessage(exportAchievementData[8], "day", "meteor", dailyWeaponsList);
    setMessage(exportAchievementData[9], "day", "detonator", dailyOrdsList);
    setMessage(exportAchievementData[10], "day", "stun field", dailyOrdsList);
    setMessage(exportAchievementData[11], "day", "arc mine", dailyOrdsList);
    setMessage(exportAchievementData[12], "day", "instant repair", dailyOrdsList);
    setMessage(exportAchievementData[13], "day", "repair matrix", dailyTechsList);
    setMessage(exportAchievementData[14], "day", "threat scanner", dailyTechsList);
    setMessage(exportAchievementData[15], "day", "energy barrier", dailyTechsList);
    setMessage(exportAchievementData[16], "day", "phase shift", dailyTechsList);

    setAchievementData(exportAchievementData);
  }, [userData]);

  const [wantFAQ, setWantFAQ] = useState(false);
  const [hasFAQ, setHasFAQ] = useState(false);

  const [fullView, setFullView] = useState(false);

  const [selectedAchievementType, setSelectedAchievementType] = useState("daily");

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
        ...(fullView ? { padding: "10px 20px 20px", gap: "20px" } : { padding: "0px", gap: "0px" }),
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
            totalPercent={achievementData?.totalPercentage ?? 0}
            // Percentage={achievementData.values["63"]}
            Title={""}
            Height={"50px"}
            EnableBorder={true}
            clickMe={true}
          />
        </div>
      </div>
      {screenWidth < 700 ? (
        <div>Challenges cannot be viewed on mobile. Please move to a desktop</div>
      ) : hasFAQ ? (
        <div className="centering">
          <div className="rounded padded light-background list" style={{ width: "50%" }}>
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
              Echo Combat Lounge and ECRanked announce the release of The Flamingo Challenge, an ongoing/regular event
              for Echo Combat (an in-app purchase for Echo VR by Ready at Dawn for the Oculus/Meta platform) running
              parallel to Echo VR's Echo Pass from start to end of each season. Season 1 begins March 15th, 2022 and
              ends May 31st, 2022, the same days as Echo Pass Season 5.
            </p>
            <h2>Can you lose progress?</h2>
            <p>
              Nope! You never lose progress on challenges. However, a challenge can become "locked," meaning you are
              unable to progress further until it becomes unlocked.
            </p>
            <h2>How do you unlock a challenge?</h2>
            <p>
              By waiting! When a DAY challenge gets locked you have to wait until tomorrow for it to become unlocked.
              This means you have to start over again (the count of games from zero) to gain any more progress. Same
              with WEEK challenges. You have to wait until Monday of the next week for it to reset for the challenge to
              become unlocked.
            </p>
            <h2>How do week and day challenges work?</h2>
            <p>
              DAY challenges are determined by statistics that reset everyday at midnight PDT/3am EDT/7pm GMT. WEEK
              challenges are determined by statistics that reset every Monday of a week at midnight. So, when games
              start on Monday all WEEK statistics have been reset, which means if something became locked the prior week
              it is now unlocked and you can attempt it again.
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

              <AchievementLoadoutStats
                userData={userData}
                selectedAchievementType={selectedAchievementType}
                achievementsData={achievementData}
                setWantFAQ={setWantFAQ}
              />
            </div>
          </div>
          {screenWidth < 1000 ? null : (
            <div style={{ flexBasis: 0, flexGrow: 1.5, display: "flex" }}>
              {userData.oculus_id ? (
                <AchievementLeaderboard setBannerCallback={() => {}} surroundID={userData.oculus_id} limit={6} />
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
