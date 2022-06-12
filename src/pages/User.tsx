import styled from "styled-components";
import React, { useEffect, useState } from "react";

import { FailedSearchBar } from "../components/FailedSearch";
import { AboutMe } from "../components/AboutMe";
import { Statistics } from "../components/Statistics";
import { RecentGames } from "../components/RecentGames";
import Achievements from "../components/Achievements";
import UserPubLeaderboard from "../components/UserPubLeaderboard";
import * as API from "@ecranked/api";

const StatChoiceStyle = styled.div`
  padding: 0px;
  background-color: #222;
  color: white;
  float: left;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 0px 10px;
`;
const StatChoiceButton = styled.div`
  padding: 10px 10px 0px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  gap: 0px 10px;
  flex-grow: 1;
  text-align: center;
  height: 20px;
  &:hover {achievementData
    background-color: #555;
    color: #000;
  }
  cursor: pointer;
  line-height: 20px;
`;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

interface StatChoiceProps {
  currentSelected: string;
  onClick: (option: string) => void;
}
const StatChoice = ({ currentSelected, onClick }: StatChoiceProps) => {
  return (
    <StatChoiceStyle>
      <StatChoiceButton
        style={currentSelected === "replays" ? { backgroundColor: "#333" } : {}}
        onClick={() => {
          onClick("replays");
        }}
      >
        Replays
      </StatChoiceButton>
      <StatChoiceButton
        style={
          currentSelected === "public_games" ? { backgroundColor: "#333" } : {}
        }
        onClick={() => {
          onClick("public_games");
        }}
      >
        Monthly Pub Leaderboard
      </StatChoiceButton>
    </StatChoiceStyle>
  );
};

const LeftSideStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 200px 1;
`;

type LeftSideProps = {
  user: API.User | null
}


const LeftSide = ({ user }: LeftSideProps) => {
  const [selectedOption, setSelectedOption] = React.useState("public_games");
  return (
    <LeftSideStyle>
      <StatChoice
        currentSelected={selectedOption}
        onClick={setSelectedOption}
      ></StatChoice>
      {selectedOption === "public_games" ? (
        <UserPubLeaderboard oculus_name={user?.oculus_name} />
      ) : (
        <RecentGames replays={user?.recent_games ?? []} />
      )}
    </LeftSideStyle>
  );
};

function getIcon(user: API.User) {
  if (user.oculus_name === "BiffBish") return "/images/happy_cubesat.png";
  if (user.discord_name !== null) return "/images/verified_icon.png";
  if (user.moderator === true) return "/images/icons/moderator_icon.png";
  return undefined;
}

interface userProps {
  username: string,
  setBannerCallback: (name: string, icon: string | undefined) => void
}



export default function User({ username, setBannerCallback }: userProps) {

  const [randomUsernameOverride, setRandomUsernameOverride] =
    React.useState<string | null>(null);

  if (
    randomUsernameOverride !== null &&
    (username === "random_async" || username === "random")
  ) {
    username = randomUsernameOverride;
  }

  if (username === "random") {
    setRandomUsernameOverride("random_async");
    username = "random_async";
    API.User.fetchAll().then(
      allUsernames => {
        setRandomUsernameOverride(
          allUsernames[Math.floor(Math.random() * allUsernames.length)]
        );
      }
    )

  }




  const { user, isLoading } = API.useUser(username)

  const [failedToLoad, setFailedToLoad] = useState(false);

  useEffect(() => {
    if (user === null && !isLoading) {
      setFailedToLoad(true);
    } else {
      setFailedToLoad(false);
    }
  }, [user, isLoading]);



  // if (user && username !== user?.oculus_name) {
  //   history.push("/user/" + user?.oculus_name + "/stats");
  // }

  useEffect(() => {
    if (user !== null) {
      setBannerCallback(user.oculus_name, getIcon(user));
    }
  }, [user, setBannerCallback]);


  function fetchUserData() {
    // if (!user) return
    // if (username !== user?.oculus_name) {
    //   history.push("/user/" + user?.oculus_name + "/stats");
    // }
  }
  useEffect(() => {
    if (username === "random") {
      return;
    }
    if (username === "random_async") {
      return;
    }
    fetchUserData()
    // eslint-disable-next-line
  }, [username]);

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <FailedSearchBar shown={failedToLoad} />

      <div
        className="list padded"
        style={
          failedToLoad ? { height: "0px", margin: "0px", opacity: "0%" } : {}
        }
      >
        <h3
          className="conthrax centered"
          style={{
            fontSize: windowDimensions.width < 1000 ? "20px" : "50px",
            // letterSpacing: "20px",
            letterSpacing:
              windowDimensions.width < 1000
                ? "calc(-16px + 3.9vw)"
                : "calc(-39px + 3.8vw)",
            lineHeight: "10px",
          }}
        >
          {/* --- FLAMINGO CHALLENGE --- */}
          {isLoading}
        </h3>
        <Achievements
          userData={user}
          // screenWidth={windowDimensions.width}
          fetchUserData={fetchUserData}
        />
        {/* <div> */}
        {/* <MetaTags>
          <title>{username}'s Page!</title>
          <meta name="description" content={"Visit " + username + "'s Page!"} />
          <meta property="og:title" content="MyApp" />
          <meta property="og:image" content="path/to/image.jpg" />
        </MetaTags> */}
        <div className="horizontal-container">

          <LeftSide user={user} />
          <Statistics userData={user} />

          <AboutMe user={user} />
        </div>
      </div>
    </>
  );
}
