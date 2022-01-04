// import React, {useState , useRef, useEffect} from 'react'
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Replay from "./pages/Replay";
import User from "./pages/User";
import Home from "./pages/Home";
import Moderator from "./pages/Moderator";
import Nav from "./components/Nav";

import AnimateHeight from "react-animate-height";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Changelog from "./pages/Changelog";

// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
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

function App() {
  const [clientData, setClientData] = React.useState({
    oculus_id: localStorage.getItem("OCULUS_ID"),
    authorization_token: localStorage.getItem("AUTHORIZATION_TOKEN"),
    confirmed_authorized: false,
    moderator: localStorage.getItem("MODERATOR"),
  });

  useEffect(() => {
    if (clientData.authorization_token && !clientData.confirmed_authorized) {
      fetch("https://ecranked.ddns.net/api/v1/user/@me", {
        headers: { Authorization: clientData.authorization_token },
      })
        .then(async (response) => {
          if (response.status === 200) {
            clientData.confirmed_authorized = true;
          } else {
            localStorage.removeItem("AUTHORIZATION_TOKEN");
            localStorage.removeItem("OCULUS_ID");
            localStorage.removeItem("MODERATOR");
            setClientData((prev) => ({
              ...prev,
              oculus_id: null,
              authorization_token: null,
              moderator: null,
            }));
            window.location.reload(false);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [clientData]);

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
      <Nav clientData={clientData} style={{ height: "10px" }} />
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
            return <Home replays={WhatApiRequest()} />;
          }}
        />
        <Route
          path={`/user/:username/:subDomain`}
          render={(props) => {
            setBannerHeight(100);
            const setBannerTextCallback = (username) => {
              console.log(username);
              setBannerText(username);
            };
            console.log("User");
            return (
              <User
                username={props.match.params.username}
                setBannerCallback={setBannerTextCallback}
                subDomain={props.match.params.subDomain}
              />
            );
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
            setBannerText("Redirecting");
            setBannerHeight(100);

            return (
              <DiscordOAuthCallback
                callbackCode={callbackCode}
                onFinish={() => {
                  props.history.push("/home");
                  window.location.reload(false);
                }}
              />
            );
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
        <Route
          path={`/Changelog`}
          render={() => {
            setBannerHeight(100);
            setBannerText("Terms Of Service");
            return <Changelog />;
          }}
        />
        <Route
          path={`/Moderator/UnapprovedImages`}
          render={() => {
            setBannerHeight(100);
            setBannerText("Moderation");
            return <Moderator />;
          }}
        />
      </PageBody>
    </Router>
  );
}

function DiscordOAuthCallback({ callbackCode, onFinish }) {
  const hasFetchedData = useRef(false);
  useEffect(() => {
    const getAuthToken = () => {
      if (!hasFetchedData.current) {
        hasFetchedData.current = true;
        console.log("Callback");
        console.log(callbackCode);

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token: callbackCode,
          }),
        };
        fetch("https://ecranked.ddns.net/api/v1/auth/login", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            onFinish();
            localStorage.setItem("AUTHORIZATION_TOKEN", data["token"]);
            localStorage.setItem("OCULUS_ID", data["oculus_id"]);
            // eslint-disable-next-line
            if (data["moderator"] == 1) {
              localStorage.setItem("MODERATOR", data["moderator"]);
            }
          });
      }
    };
    getAuthToken();
  }, [callbackCode, onFinish]);
  return null;
}

// const Home = () => {
//   return (
//     <div>
//       <h1>Home Page</h1>
//     </div>
//   );
// };

export default App;
