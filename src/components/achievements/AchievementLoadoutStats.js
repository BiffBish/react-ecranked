import React, { useState } from "react";

import styled from "styled-components";
import { SegmentedProgressBar } from "../SegmentedProgressBar";

const AchievementPopupStyle = styled.div`
  box-sizing: border-box;

  // position: absolute;
  color: white;
  padding: 10px;
  // margin: 20px 10px 20px;
  background-color: #222;
  color: white;

  z-index: 10;
`;

const AchievementPopup = ({
  achievementData,
  visible,
  percentage = 0,
  locked,
  floatLeft = false,
  floatTop = false,
  DialogBoxOverride = null,
  pubRequirement = null,
}) => {
  let SelectedAchievementFormat = achievementData?.formatting;
  if (SelectedAchievementFormat == null) return null;

  let CurrentStepNumber = SelectedAchievementFormat.parts.length;
  for (let index = 0; index < SelectedAchievementFormat.parts.length; index++) {
    const element = SelectedAchievementFormat.parts[index];

    if (element.Percent > achievementData?.value) {
      CurrentStepNumber = index;
      break;
    }
  }

  // console.log(selectedNumber, CurrentStepNumber);
  let ShowHelperBox = true;
  let AchievementStatus = "In Progress";
  let totalAchievements = SelectedAchievementFormat.parts.length;
  if (locked) AchievementStatus = "Challenge Locked";
  if (achievementData?.value === 1) AchievementStatus = "Completed";

  let iconSRC = "lock_clear_no_square";
  if (CurrentStepNumber / totalAchievements >= 0.25) {
    iconSRC = "white";
  }
  if (CurrentStepNumber / totalAchievements >= 0.5) {
    iconSRC = "bronze";
  }
  if (CurrentStepNumber / totalAchievements >= 0.75) {
    iconSRC = "silver";
  }
  if (CurrentStepNumber / totalAchievements >= 1) {
    ShowHelperBox = false;
    iconSRC = "gold";
  } else if (locked && iconSRC !== "lock_clear_no_square") {
    iconSRC += "_lock";
  }

  let partOffset = 0;

  if (SelectedAchievementFormat.parts.length > 4) {
    if (CurrentStepNumber < 17) {
      if (CurrentStepNumber < 17 && CurrentStepNumber > 1) {
        partOffset = CurrentStepNumber - 1;
      }
    } else {
      partOffset = SelectedAchievementFormat.parts.length - 4;
    }
  }

  return (
    <div
      style={{ position: "relative", display: !visible ? "none" : undefined }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: 1000,
          right: floatLeft ? 0 : undefined,
          left: !floatLeft ? 0 : undefined,
          bottom: floatTop ? "30px" : undefined,
        }}
      >
        <AchievementPopupStyle
          className="rounded horizontal-container"
          onMouseLeave={() => {
            // visibilityCallback(false);
          }}
          style={{
            width: 600,
          }}
        >
          <div className="list grow">
            <h3 className="centered conthrax">
              {SelectedAchievementFormat.Title}
            </h3>
            <div className="horizontal-container">
              <div className="grow">
                {partOffset !== 0 ? (
                  <div
                    className="horizontal-container"
                    style={
                      {
                        // transform: "scale(" + scalePercent + "%)",
                        // transformOrigin: "left",
                        // height: scalePercent / 2 + "px",
                      }
                    }
                  >
                    {partOffset} hidden...
                  </div>
                ) : null}

                {SelectedAchievementFormat.parts
                  .slice(partOffset, partOffset + 4)
                  .map((element, index) => {
                    let scalePercent = 0.5;
                    if (CurrentStepNumber === index + partOffset)
                      scalePercent = 1.0;
                    if (CurrentStepNumber === index + partOffset + 1)
                      scalePercent = 0.7;
                    if (CurrentStepNumber === index + partOffset - 1)
                      scalePercent = 0.7;
                    // if (CurrentStepNumber == index + 2) scalePercent = 60;
                    // if (CurrentStepNumber == index - 2) scalePercent = 60;
                    let earned = element.Percent <= percentage;
                    return (
                      <>
                        <div
                          className="horizontal-container"
                          style={{
                            gap: 0,
                            opacity: !earned && locked ? "50%" : "100%",
                          }}
                        >
                          <img
                            src={
                              "/images/" +
                              (earned
                                ? "neon_green_checkmark"
                                : locked
                                ? "neon_red_x"
                                : "lock_clear_no_square") +
                              ".png"
                            }
                            alt="iconImage"
                            style={{
                              height: 40 * scalePercent + "px",
                              width: 40 * scalePercent + "px",
                            }}
                          />
                          {/* <div
              className="rounded"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor:
                  element.Percent <= displayedValue ? "green" : "red",
              }}
            >
              
              </div> */}

                          <div>
                            <div style={{ fontSize: 20 * scalePercent }}>
                              {element.Title}
                            </div>
                            <div
                              style={{
                                fontSize: 10 * scalePercent,
                                padding: "0px 0px 10px",
                              }}
                            >
                              {element.Description}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                {/* <div style={{}}>
        <PopupProgressBar />{" "}
        
      </div> */}
                {SelectedAchievementFormat.parts.length - partOffset - 4 > 0 ? (
                  <div
                    className="horizontal-container"
                    style={
                      {
                        // transform: "scale(" + scalePercent + "%)",
                        // transformOrigin: "left",
                        // height: scalePercent / 2 + "px",
                      }
                    }
                  >
                    {SelectedAchievementFormat.parts.length - partOffset - 4}{" "}
                    more...
                  </div>
                ) : null}
              </div>
              <div className="centering">
                <img
                  style={{ width: "150px", backgroundColor: "transparent" }}
                  src={"/images/series_10_crown/" + iconSRC + ".png"}
                  alt={iconSRC}
                ></img>
              </div>

              {/* <div style={{ fontSize: 10 }}>{uncompletedStatement}</div> */}
            </div>
          </div>
        </AchievementPopupStyle>
        {DialogBoxOverride != null ? (
          <DialogBoxOverride />
        ) : (
          <>
            {achievementData?.pubRequirement ? (
              <AchievementPopupStyle
                className="rounded padded list horizontal-container"
                style={{
                  display: ShowHelperBox ? undefined : "none",
                  width: 600,
                  // margin: "0 0 0 200px",
                }}
              >
                <h3>Secondary Pub Requirement</h3>
                {/* <div className="centering">
              </div> */}
                <p>
                  There is a secondary pub requirement for this challenge.
                  Aswell as the normal requirement you must complete{" "}
                  {achievementData?.pubRequirement} games in the challenges
                  timeframe. You can see a secondary grey bar that represents
                  your secondary progress. if you only partially complete the
                  secondary requirement you will only get partial challenge
                  credit.
                </p>
              </AchievementPopupStyle>
            ) : null}
            <AchievementPopupStyle
              className="rounded padded list horizontal-container"
              style={{
                display: ShowHelperBox ? undefined : "none",
                width: 600,
                // margin: "0 0 0 200px",
              }}
            >
              <h3>{AchievementStatus}</h3>
              {/* <div className="centering">
              </div> */}
              <p>
                {locked
                  ? SelectedAchievementFormat.Locked
                  : SelectedAchievementFormat.Progress}
              </p>
            </AchievementPopupStyle>
          </>
        )}
      </div>
    </div>
  );
};

const SegmentedLProgressBar = ({
  achievementData = null,
  pubRequirement = null,
  totalGames = 0,
  type,
  onLeft = false,
  onTop = false,
  DialogBoxOverride = null,
  centeredIcon = false,
  titleStyle = {},
}) => {
  const [visible, setVisible] = useState(false);

  if (achievementData?.value === undefined) {
    return null;
  }
  const locked = achievementData.locked;

  let DisplayedTitle = "Completed!";
  if (achievementData) {
    for (
      let index = 0;
      index < achievementData?.formatting?.parts?.length;
      index++
    ) {
      const element = achievementData?.formatting?.parts[index];
      if (element.Percent > achievementData?.value) {
        DisplayedTitle = element.Title;
        break;
      }
    }
  } else {
  }

  return (
    <div
      style={{
        height: centeredIcon ? "60px" : "30px",
        overflow: "visible",
        flexBasis: 0,
      }}
    >
      {centeredIcon ? (
        <div className="centering">
          <img
            src={"/images/" + (achievementData?.icon ?? "pulsar") + ".png"}
            alt="iconImage"
            style={{ height: "28px", width: "28px" }}
          />
        </div>
      ) : null}
      <div
        style={{
          display: "flex",
          opacity: locked ? 0.5 : 1,
          position: "relative",
          height: "30px",

          flexDirection: onLeft ? "row-reverse" : "row",
        }}
      >
        {!centeredIcon ? (
          <img
            src={"/images/" + (achievementData?.icon ?? "pulsar") + ".png"}
            alt="iconImage"
            style={{ height: "28px", width: "28px" }}
          />
        ) : null}

        <div
          style={{ flexGrow: 1 }}
          onMouseEnter={() => {
            setVisible(true);
          }}
          onMouseLeave={() => {
            setVisible(false);
          }}
        >
          <SegmentedProgressBar
            Title={DisplayedTitle}
            Percentage={achievementData?.value ?? 0}
            SecondaryPercentage={
              achievementData?.pubRequirement
                ? Math.min(
                    achievementData?.pubCount /
                      (achievementData?.pubRequirement ?? 1),
                    1
                  )
                : 0
            }
            Height={15}
            ProgressBarClass={type + "-background"}
            centeredTitle={centeredIcon}
            leftTitle={onLeft}
            titleStyle={titleStyle}
          />
        </div>
      </div>
      <AchievementPopup
        width={100}
        visible={visible}
        achievementData={achievementData}
        selectedNumber={achievementData?.id ?? 0}
        percentage={achievementData?.value ?? 0}
        locked={locked}
        floatLeft={onLeft}
        floatTop={onTop}
        DialogBoxOverride={DialogBoxOverride}
        pubRequirement={pubRequirement}
      />
    </div>
  );
};
const LoadoutImage = ({ number }) => {
  const tacMod = number % 4;
  const ordinance = ((number - tacMod) % 16) / 4;
  const weapon = ((number - (tacMod + ordinance * 4)) % 64) / 16;

  const tacModMap = [
    "/images/repair_matrix.png",
    "/images/threat_scanner.png",
    "/images/energy_barrier.png",
    "/images/phaseshift.png",
  ];
  const ordinanceMap = [
    "/images/detonator.png",
    "/images/stun_field.png",
    "/images/arcmine.png",
    "/images/instant_repair.png",
  ];
  const weaponMap = [
    "/images/pulsar.png",
    "/images/nova.png",
    "/images/comet.png",
    "/images/meteor.png",
  ];

  return (
    <>
      <img
        src={weaponMap[weapon]}
        alt={"weapon"}
        // style={{ justifyContent: "center" }}
      ></img>
      <img
        src={ordinanceMap[ordinance]}
        alt={"ordinance"}
        // style={{ justifyContent: "center" }}
      ></img>
      <img
        src={tacModMap[tacMod]}
        alt={"tacMod"}
        // style={{ justifyContent: "center" }}
      ></img>
    </>
  );
};
const LoadoutBarSelectedDivStyle = styled.div`
  color: white;
  background-color: #444;
  position: absolute;
  // width: 200px;
  // height: 150px;
  // bottom: 100%;
  border: 2px solid #555;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const LoadoutBarSelected = ({ number, onHover }) => {
  const tacMod = number % 4;
  const ordinance = ((number - tacMod) % 16) / 4;
  const weapon = ((number - (tacMod + ordinance * 4)) % 64) / 16;

  const tacModMap = [
    "/images/repair_matrix.png",
    "/images/threat_scanner.png",
    "/images/energy_barrier.png",
    "/images/phaseshift.png",
  ];
  const ordinanceMap = [
    "/images/detonator.png",
    "/images/stun_field.png",
    "/images/arcmine.png",
    "/images/instant_repair.png",
  ];
  const weaponMap = [
    "/images/pulsar.png",
    "/images/nova.png",
    "/images/comet.png",
    "/images/meteor.png",
  ];
  const tacModMapName = [
    "Repair Matrix",
    "Threat Scanner",
    "Energy Barrier",
    "Phaseshift",
  ];
  const ordinanceMapName = [
    "Detonator",
    "Stun Field",
    "Arcmine",
    "Instant Repair",
  ];
  const weaponMapName = ["Pulsar", "Nova", "Comet", "Meteor"];

  return (
    <LoadoutBarSelectedDivStyle>
      <p style={{ margin: "0px" }}>
        <img
          src={weaponMap[weapon]}
          alt={"weapon"}
          style={{ justifyContent: "center", width: "40px", height: "40px" }}
        />
        {weaponMapName[weapon]}
      </p>
      <p style={{ margin: "0px" }}>
        <img
          src={ordinanceMap[ordinance]}
          alt={"ordinance"}
          style={{ justifyContent: "center", width: "40px", height: "40px" }}
        />
        {ordinanceMapName[ordinance]}
      </p>
      <p style={{ margin: "0px" }}>
        <img
          src={tacModMap[tacMod]}
          alt={"tacMod"}
          style={{ justifyContent: "center", width: "40px", height: "40px" }}
        />
        {tacModMapName[tacMod]}
      </p>
    </LoadoutBarSelectedDivStyle>
  );
};
const LoadoutBarItem = ({ loadoutNumber }) => {
  const [onHovered, setOnHovered] = useState(false);
  return (
    <div
      className="rounded list hoverable"
      onMouseEnter={() => {
        console.log("Twe");

        setOnHovered(true);
      }}
      onMouseLeave={() => {
        setOnHovered(false);
      }}
    >
      <LoadoutImage number={loadoutNumber} />
      <div style={{ position: "relative" }}>
        {onHovered ? (
          <LoadoutBarSelected
            number={loadoutNumber}
            onHover={() => {
              setOnHovered(false);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export const AchievementLoadoutStats = ({
  userData,
  selectedAchievementType = "daily",
  achievementsData,
  cb = () => {},
  setHn = () => {},
}) => {
  if (achievementsData == null || userData == null) {
    return null;
  }

  const AllLoadoutHelper = () => {
    let numOfHelpers = 0;
    return (
      <AchievementPopupStyle
        className="rounded padded list horizontal-container"
        style={{
          width: 600,
          // margin: "0 0 0 200px",
        }}
      >
        <h3>{"In Progress"}</h3>
        {/* <div className="centering">
    </div> */}
        <p>
          Play with loadouts you have never used before. Listed below are some
          loadouts you have not used before. Give them a try!
        </p>
        <div className="horizontal-container">
          {Object.entries(userData.stats.loadout).map((element) => {
            if (element[1] > 3 * 60 * 30) return null;
            numOfHelpers += 1;
            if (numOfHelpers >= 10) return null;
            return (
              <LoadoutBarItem
                width={0.1}
                loadoutNumber={parseInt(element[0])}
              />
            );
          })}
        </div>
      </AchievementPopupStyle>
    );
  };
  console.log("#788", achievementsData);

  if (selectedAchievementType === "daily") {
    return (
      <div className="list rounded-overflow padded light-background fill">
        <div className={"centering grow"} style={{ width: "100%" }}>
          <div style={{ width: "70%" }}>
            <SegmentedLProgressBar
              achievementData={achievementsData[29]}
              type={"daily"}
              centeredIcon={true}
            />
          </div>
        </div>

        <div className="container">
          <div className="wide-gap horizontal-container">
            <div className="list grow">
              {Object.values(achievementsData)
                .slice(5, 17)
                .map((element, index) => {
                  return (
                    <SegmentedLProgressBar
                      type={"daily"}
                      key={index}
                      achievementData={element}
                      onTop={index > 4}
                    />
                  );
                })}
            </div>
            <div className="list grow">
              {Object.values(achievementsData)
                .slice(17, 29)
                .map((element, index) => {
                  return (
                    <SegmentedLProgressBar
                      key={index}
                      type={"daily"}
                      achievementData={element}
                      onTop={index > 4}
                      onLeft={true}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (selectedAchievementType === "weekly") {
    return (
      <div className="list rounded-overflow padded light-background fill">
        <div className={"centering grow"} style={{ width: "100%" }}>
          <div style={{ width: "70%" }}>
            <SegmentedLProgressBar
              achievementData={achievementsData[54]}
              type={"weekly"}
              centeredIcon={true}
            />
          </div>
        </div>
        <div className="container">
          <div className="wide-gap horizontal-container">
            <div className="list grow">
              {Object.values(achievementsData)
                .slice(30, 42)
                .map((element, index) => {
                  return (
                    <SegmentedLProgressBar
                      key={index}
                      type={"weekly"}
                      achievementData={element}
                      onTop={index > 4}
                    />
                  );
                })}
            </div>
            <div className="list grow">
              {Object.values(achievementsData)
                .slice(42, 54)
                .map((element, index) => {
                  return (
                    <SegmentedLProgressBar
                      key={index}
                      type={"weekly"}
                      achievementData={element}
                      onTop={index > 4}
                      onLeft={true}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (selectedAchievementType === "global") {
    return (
      <div className="list rounded-overflow padded light-background fill">
        <div className={"centering grow"} style={{ width: "100%" }}>
          <div style={{ width: "70%" }}>
            <SegmentedLProgressBar
              achievementData={achievementsData[79]}
              centeredIcon={true}
              type={"season"}
            />
          </div>
        </div>
        <div className="container">
          <div className="wide-gap horizontal-container">
            <div className="list grow">
              {Object.values(achievementsData)
                .slice(55, 67)
                .map((element, index) => {
                  return (
                    <SegmentedLProgressBar
                      key={index}
                      type={"season"}
                      achievementData={element}
                      onTop={index > 4}
                    />
                  );
                })}
            </div>

            <div className="list grow">
              {Object.values(achievementsData)
                .slice(67, 79)
                .map((element, index) => {
                  return (
                    <SegmentedLProgressBar
                      key={index}
                      type={"season"}
                      achievementData={element}
                      onTop={index + 1 > 4}
                      onLeft={true}
                      DialogBoxOverride={
                        index === 0 ? AllLoadoutHelper : undefined
                      }
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (selectedAchievementType === "community") {
    return (
      <div className="list rounded-overflow padded light-background fill">
        <div style={{ width: "50%" }}>
          <div className="list padded light-background">
            <SegmentedLProgressBar
              type={"community"}
              achievementData={achievementsData[1]}
            />
            <SegmentedLProgressBar
              type={"community"}
              achievementData={achievementsData[2]}
            />{" "}
            <SegmentedLProgressBar
              type={"community"}
              achievementData={achievementsData[3]}
            />{" "}
            <SegmentedLProgressBar
              type={"community"}
              achievementData={achievementsData[4]}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
  // return (
  //   <div className="list rounded padded light-background">
  //     {/* <h2>Challenges</h2> */}
  //     {selectedAchievementType === "weekly" ? (
  //       <>
  //         <SegmentedLProgressBar AchNum={54} icon={"pubs"} />

  //         <div className="horizontal-container">
  //           <div className="list grow">
  //             <SegmentedLProgressBar AchNum={30} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={31} icon={"nova"} />
  //             <SegmentedLProgressBar AchNum={32} icon={"comet"} />
  //             <SegmentedLProgressBar AchNum={33} icon={"meteor"} />
  //             <SegmentedLProgressBar AchNum={34} icon={"detonator"} />
  //             <SegmentedLProgressBar AchNum={35} icon={"stun_field"} />
  //             <SegmentedLProgressBar AchNum={36} icon={"arcmine"} />
  //             <SegmentedLProgressBar AchNum={37} icon={"instant_repair"} />
  //             <SegmentedLProgressBar AchNum={38} icon={"repair_matrix"} />
  //             <SegmentedLProgressBar AchNum={39} icon={"threat_scanner"} />
  //             <SegmentedLProgressBar AchNum={40} icon={"energy_barrier"} />
  //             <SegmentedLProgressBar AchNum={41} icon={"phaseshift"} />
  //           </div>
  //           <div className="list grow">
  //             <SegmentedLProgressBar AchNum={42} icon={"pulsar"} />
  //             <SegmentedLProgressBar
  //               AchNum={43}
  //               icon={"pulsar"}
  //               pubRequirement={25}
  //               totalGames={userData["weekly_stats"]["total_games"]}
  //             />
  //             <SegmentedLProgressBar AchNum={44} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={45} icon={"pulsar"} />
  //             <SegmentedLProgressBar
  //               AchNum={46}
  //               icon={"pulsar"}
  //               pubRequirement={25}
  //               totalGames={userData["weekly_stats"]["total_games"]}
  //             />
  //             <SegmentedLProgressBar
  //               AchNum={47}
  //               icon={"pulsar"}
  //               pubRequirement={25}
  //               totalGames={userData["weekly_stats"]["total_games"]}
  //             />
  //             <SegmentedLProgressBar
  //               AchNum={48}
  //               icon={"pulsar"}
  //               pubRequirement={25}
  //               totalGames={userData["weekly_stats"]["total_games"]}
  //             />
  //             <SegmentedLProgressBar
  //               AchNum={49}
  //               icon={"pulsar"}
  //               pubRequirement={25}
  //               totalGames={userData["weekly_stats"]["total_games"]}
  //             />
  //             <SegmentedLProgressBar AchNum={50} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={51} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={52} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={53} icon={"pulsar"} />
  //           </div>
  //         </div>
  //       </>
  //     ) : null}
  //     {selectedAchievementType === "global" ? (
  //       <>
  //         <SegmentedLProgressBar AchNum={79} icon={"pubs"} />

  //         <div className="horizontal-container">
  //           <div className="list grow">
  //             <SegmentedLProgressBar AchNum={55} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={56} icon={"nova"} />
  //             <SegmentedLProgressBar AchNum={57} icon={"comet"} />
  //             <SegmentedLProgressBar AchNum={58} icon={"meteor"} />
  //             <SegmentedLProgressBar AchNum={59} icon={"detonator"} />
  //             <SegmentedLProgressBar AchNum={60} icon={"stun_field"} />
  //             <SegmentedLProgressBar AchNum={61} icon={"arcmine"} />
  //             <SegmentedLProgressBar AchNum={62} icon={"instant_repair"} />
  //             <SegmentedLProgressBar AchNum={63} icon={"repair_matrix"} />
  //             <SegmentedLProgressBar AchNum={64} icon={"threat_scanner"} />
  //             <SegmentedLProgressBar AchNum={65} icon={"energy_barrier"} />
  //             <SegmentedLProgressBar AchNum={66} icon={"phaseshift"} />
  //           </div>
  //           <div className="list grow">
  //             <SegmentedLProgressBar AchNum={67} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={68} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={69} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={70} icon={"pulsar"} />
  //             <SegmentedLProgressBar
  //               AchNum={71}
  //               icon={"pulsar"}
  //               pubRequirement={50}
  //               totalGames={userData["stats"]["total_games"]}
  //             />
  //             <SegmentedLProgressBar
  //               AchNum={72}
  //               icon={"pulsar"}
  //               pubRequirement={50}
  //               totalGames={userData["stats"]["total_games"]}
  //             />
  //             <SegmentedLProgressBar
  //               AchNum={73}
  //               icon={"pulsar"}
  //               pubRequirement={50}
  //               totalGames={userData["stats"]["total_games"]}
  //             />
  //             <SegmentedLProgressBar
  //               AchNum={74}
  //               icon={"pulsar"}
  //               pubRequirement={50}
  //               totalGames={userData["stats"]["total_games"]}
  //             />
  //             <SegmentedLProgressBar AchNum={75} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={76} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={77} icon={"pulsar"} />
  //             <SegmentedLProgressBar AchNum={78} icon={"pulsar"} />
  //           </div>
  //         </div>
  //       </>
  //     ) : null}
  //   </div>
  // );
};
