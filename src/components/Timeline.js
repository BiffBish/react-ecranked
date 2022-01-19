import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const Container = styled.div`
  position: relative;
  padding: 10px 10px 0px;
  margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 2px solid white;
  border-radius: 10px;
  flex: 200px 12;
`;
const ContainerTitle = styled.h2`
  font-size: 36px;
  font-weight: 400;
  margin: 10px 0px;
  text-align: center;
  flex: 0 0 100%;
  color: #fff;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  background-color: #333;
  padding: 7px;
  text-decoration: none;
  border: 2px solid white;
  border-radius: 10px;
  line-height: 0;
  font-size: 15px;
  line-height: 1.5;
  &:hover {
    background-color: #555;
    color: #000;
  }
  cursor: pointer;
`;

const UserListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 100px 1;
`;
const UserList = ({ users }) => {
  let history = useHistory();

  function userClick(username) {
    history.push("/user/" + username + "/stats");
  }
  return (
    <UserListStyle>
      {users.map((user) => {
        const onUserClick = () => {
          userClick(user["name"]);
        };
        return (
          <User
            key={user["name"]}
            onClick={onUserClick}
            style={(() => {
              switch (user["team"]) {
                case 0:
                  return { borderColor: "rgb(65, 160, 228)" };
                case 1:
                  return { borderColor: "rgb(230, 167, 50)" };
                default:
                  return { borderColor: "rgb(255, 255, 255)" };
              }
            })()}
          >
            <p style={{ margin: 0 }}>{user["name"]}</p>
          </User>
        );
      })}
    </UserListStyle>
  );
};

const TimelineSubStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  flex: 200px 8;
`;
const TimelineUserList = ({ users, api_data }) => {
  return (
    <TimelineSubStyle>
      {users.map((user) => {
        return <TimelineUserItem user={user} api_data={api_data} />;
      })}
    </TimelineSubStyle>
  );
};
const TimelineUserItemStyle = styled.div`
  position: relative;
  align-items: center;
  background-color: #222;
  text-decoration: none;
  #border: 2px solid white;
  border-radius: 10px;
  line-height: 0;
  font-size: 15px;
  line-height: 1.5;

  cursor: pointer;
  height: 40.5px;
`;
const TimeLineItemActiveBar = styled.div`
  background-color: #333;
  width: 100%;
  height: 10px;
  border: 1px solid #333;
  border-radius: 10px;
  height: 32px;
  overflow: hidden;
`;
const DeathBar = styled.div`
  position: absolute;
  top: 30px;
  background-color: red;
  width: 0.5%;
  height: 10px;
  border: 0px solid red;
  border-radius: 10px;
  height: 3px;
  overflow: hidden;
`;
const GetDeathPoints = ({ user, api_data }) => {
  const totalFrames = api_data["frames"];
  let TotalListOfElements = [];
  for (
    let index = 0;
    index < user["framestamps"]["in_bounds"].length;
    index++
  ) {
    var width = 0.005;

    var startFrame = 0;
    var endFrame = 100;
    if (!user["framestamps"]["in_bounds"][index][1]) {
      //If the in_bound point is false
      if (user["framestamps"]["in_bounds"].length === index + 1) {
        // On the last deathPoint
        endFrame = user["startFrame"] + user["stats"]["total_frames"];
      } else {
        console.log(user["framestamps"]);
        endFrame = user["framestamps"]["in_bounds"][index + 1][0];
      }
      startFrame = user["framestamps"]["in_bounds"][index][0];
      // AT THE LAST DEATH
      // startFrame = 100;
      // endFrame = 600;
      width = (endFrame - startFrame) / totalFrames;

      const transformPercentageHorisontal =
        (startFrame / totalFrames) * 100 * (1 / width);

      TotalListOfElements.push(
        <DeathBar
          style={{
            width: `${width * 100}%`,
            transform: `translate(${transformPercentageHorisontal}%,0%)`,
          }}
        />
      );
    }
  }
  return TotalListOfElements.map((element) => {
    return element;
  });
};
const LoadoutBarItemStyle = styled.div`
  position: absolute;
  top: 2px;
  left: 0px;
  background-color: #444;
  height: 20px;
  width: 0.5%;
  height: 10px;
  border: 0px solid red;
  border-radius: 5px;
  height: 3px;
  height: 26px;
  &:hover {
    background-color: #555;
    color: #000;
  }
`;
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
        style={{ justifyContent: "center", width: "15px", height: "15px" }}
      ></img>
      <img
        src={ordinanceMap[ordinance]}
        alt={"ordinance"}
        style={{ justifyContent: "center", width: "15px", height: "15px" }}
      ></img>
      <img
        src={tacModMap[tacMod]}
        alt={"tacMod"}
        style={{ justifyContent: "center", width: "15px", height: "15px" }}
      ></img>
    </>
  );
};
const LoadoutBarSelectedDivStyle = styled.div`
  color: white;
  background-color: #444;
  position: absolute;
  width: 200px;
  height: 150px;
  bottom: 100%;
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
    <LoadoutBarSelectedDivStyle onMouseEnter={onHover}>
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
const LoadoutBarItem = ({ width, transformHorisontal, loadoutNumber }) => {
  const [onHovered, setOnHovered] = useState(false);
  var HoveredObject = null;

  if (onHovered) {
    HoveredObject = (
      <LoadoutBarSelected
        number={loadoutNumber}
        onHover={() => {
          setOnHovered(false);
        }}
      />
    );
  }
  return (
    <LoadoutBarItemStyle
      // style={{ width: `${width * 100}%` }}
      style={{
        width: `${width * 100}%`,
        left: `${transformHorisontal}%`,
      }}
      onMouseEnter={() => {
        console.log("Twe");

        setOnHovered(true);
      }}
      onMouseLeave={() => {
        setOnHovered(false);
      }}
    >
      <LoadoutImage number={loadoutNumber} />
      {HoveredObject}
    </LoadoutBarItemStyle>
  );
};
const LoadoutBar = ({ user, api_data }) => {
  let LoadoutBarItems = [];
  for (let index = 0; index < user["framestamps"]["loadout"].length; index++) {
    console.debug(user["framestamps"]["loadout"][index][0]);
    const startFrame = user["framestamps"]["loadout"][index][0];
    console.debug(startFrame);

    var endFrame = user["stats"]["total_frames"] + user["startFrame"];
    if (index + 1 < user["framestamps"]["loadout"].length) {
      endFrame = user["framestamps"]["loadout"][index + 1][0];
    }
    const totalFrames = api_data["frames"];
    const width = (endFrame - startFrame) / totalFrames;
    const transformPercentageHorisontal = (startFrame / totalFrames) * 100;

    LoadoutBarItems.push(
      <LoadoutBarItem
        width={width}
        transformHorisontal={transformPercentageHorisontal}
        loadoutNumber={user["framestamps"]["loadout"][index][1]}
      />
    );
  }

  return LoadoutBarItems.map((element) => {
    return element;
  });
};
const TimelineUserItem = ({ user, api_data }) => {
  const startFrame = user["startFrame"];
  const totalFrames = api_data["frames"];
  const totalWidth = user["stats"]["total_frames"] / totalFrames;
  const startPercentage = (startFrame / totalFrames) * (1 / totalWidth);

  return (
    <TimelineUserItemStyle>
      <TimeLineItemActiveBar
        style={{
          width:
            (100 * user["stats"]["total_frames"]) / api_data["frames"] + "%",
          transform: `translate(${startPercentage * 100}%,0)`,
        }}
      />
      <GetDeathPoints user={user} api_data={api_data} />
      <LoadoutBar user={user} api_data={api_data} />
    </TimelineUserItemStyle>
  );
};

export const Timeline = ({ skimData, users }) => {
  const [userList, setUserList] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function loadInReplayAnimation(replays) {
      replays.sort((replay1, replay2) => {
        return replay1.team - replay2.team;
      });

      var AnimationList = [];
      for (const replay of replays) {
        AnimationList.push(replay);
        setUserList([...AnimationList]);
        await delay(20);
      }
    }
    loadInReplayAnimation(users);
  }, [users]);

  if (!users) return null;

  return (
    <Container>
      <ContainerTitle>
        Game over time{" "}
        <p
          style={{
            position: "absolute",
            right: "20px",
            fontSize: "20px",
            top: "0px",
          }}
        >
          red: deaths
        </p>
      </ContainerTitle>
      <div style={{ display: "flex" }}>
        <UserList users={userList} />
        <TimelineUserList users={userList} api_data={skimData} />
      </div>
    </Container>
  );
};
