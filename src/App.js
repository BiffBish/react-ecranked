// import React, {useState , useRef, useEffect} from 'react'
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import moment from "moment-timezone";

import Replay from "./pages/Replay";
import User from "./pages/User";
import Nav from "./components/Nav";

import AnimateHeight from "react-animate-height";
import PrivacyPolicy from "./pages/PrivacyPolicy";
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./containers/SignUp";
//import { Button } from "@mui/material";
const PageBody = styled.div`
  position: absolute;
  width: 100%;
  z-index: -1;
  background-color: #222;
  min-height: 1000px;
`;
const combatBackground = "/images/combat_background.jpg";
const Banner = styled(AnimateHeight)`
  text-align: center;
  /* Accent / Default */
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  margin: 0px;
  overflow: visible;
  z-index: -1;
  font-size: 60px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  color: #fff;
`;

const RecentGameFadeIN = keyframes`
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  `;

const RecentGameStyle = styled.div`
  display: flex;
  align-items: center;
  background-color: #333;
  padding: 10px;
  margin: 10px 0px;
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
  animation: ${RecentGameFadeIN} 0.2s;
`;

const RecentGamesStyle = styled.div`
  padding: 10px 10px 0px;
  margin: auto;
  background-color: #222;
  color: white;
  border: 2px solid white;
  border-radius: 10px;
  width: 50%;
  flex: 300px 2;
`;

const ContainerTitle = styled.h2`
  font-size: 36px;
  font-weight: 400;
  margin: 10px 0px;
  text-align: center;
  flex: 0 0 100%;
  color: #fff;
`;

const RecentGames = ({ replays }) => {
  const [replayList, setReplayList] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function loadInReplayAnimation(replays) {
      var AnimationList = [];
      for (const replay of replays) {
        AnimationList.push(replay);
        setReplayList([...AnimationList]);
        await delay(20);
      }
    }
    loadInReplayAnimation(replays);
  }, [replays]);

  let history = useHistory();
  function recentGameClick(session_id) {
    history.push("/replay/" + session_id);
  }

  return (
    <RecentGamesStyle>
      <ContainerTitle>Recent Games</ContainerTitle>
      {replayList.map((replay) => {
        const LocalGameTime = moment.unix(replay["start_time"]); // Assumes seconds.  Defaults to local time
        const UtcGameTime = moment.unix(replay["start_time"]).utc(); // Must be separate object b/c utc() just sets a flag
        const UtcNow = moment.utc();
        const dateDiff = UtcNow.diff(UtcGameTime, "d");
        const hourDiff = UtcNow.diff(UtcGameTime, "h");
        const minuteDiff = UtcNow.diff(UtcGameTime, "m");

        var TimeString = "";

        if (dateDiff > 0) {
          TimeString = `${dateDiff} days ago`;
        } else if (hourDiff > 0) {
          TimeString = `${hourDiff}h ago`;
        } else if (minuteDiff > 0) {
          TimeString = `${minuteDiff}m ago`;
        }

        const OnGameClick = () => {
          recentGameClick(replay["session_id"]);
        };
        return (
          <RecentGameStyle
            key={replay["session_id"]}
            onClick={OnGameClick}
            style={{ opacity: 1 }}
          >
            <p style={{ margin: 0 }}>
              {"{" +
                TimeString +
                "}" +
                "[" +
                moment(LocalGameTime).format("MMM DD LTS") + //+
                "] - " +
                replay["map"]}
            </p>
          </RecentGameStyle>
        );
      })}
    </RecentGamesStyle>
  );
};

function App() {
  const [apiData, setApiData] = React.useState([]);
  const [BannerHeight, setBannerHeight] = useState(400);
  const [BannerText, setBannerText] = useState("ECRanked");

  useEffect(() => {
    fetch("https://ecranked.ddns.net/api/v1/replay/@recent")
      .then(async (response) => {
        const data = await response.json();
        console.log("code:" + response.statusCode);
        if (response.status === 404) {
          console.error("No recent games found!");
        } else {
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          setApiData(data);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  function WhatApiRequest() {
    console.log("APIDATA");
    console.log(apiData);
    if (apiData) {
      return apiData;
    }
    return [];
  }
  let history = useHistory();
  console.log(history);
  return (
    <Router>
      <Nav style={{ height: "10px" }} />
      <PageBody>
        {}
        <Banner
          id="example-panel"
          duration={500}
          height={BannerHeight}
          style={{
            backgroundImage: `url(${combatBackground})`,
            overflow: "visible",
          }}
        >
          {BannerText}
        </Banner>
        <Route
          exact
          path={["/home", "/"]}
          render={(props) => {
            console.log("/");
            setBannerHeight(400);
            setBannerText("ECRanked");
            return <RecentGames replays={WhatApiRequest()} />;
          }}
        />
        <Route
          path={`/user/:username/stats`}
          render={(props) => {
            setBannerHeight(100);
            setBannerText(props.match.params.username);
            console.log("User");
            return <User username={props.match.params.username} />;
          }}
        />
        <Route
          path={`/replay/:session_id`}
          render={(props) => {
            setBannerHeight(100);
            setBannerText("Replay");
            console.log("User");
            return <Replay session_id={props.match.params.session_id} />;
          }}
        />
        <Route
          path={`/auth/discord/callback`}
          render={(props) => {
            const callbackCode = new URLSearchParams(props.location.search).get(
              "code"
            );
            console.log("Callback");
            console.log(callbackCode);

            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                access_token: callbackCode,
              }),
            };
            fetch("https://localhost/api/v1/auth/login", requestOptions)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                props.history.push("/home");
                localStorage.setItem("AUTHORIZATION_TOKEN", data["token"]);
              });
            setBannerHeight(100);
            setBannerText("Sign");
            return <SignUp creation_key={props.match.params.creation_key} />;
          }}
        />
        <Route
          path={`/TermsOfUse`}
          render={() => {
            setBannerHeight(100);
            setBannerText("Terms Of Service");
            return <PrivacyPolicy />;
          }}
        />
      </PageBody>
    </Router>
  );
}

// const Home = () => {
//   return (
//     <div>
//       <h1>Home Page</h1>
//     </div>
//   );
// };

export default App;
