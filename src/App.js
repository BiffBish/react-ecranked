// import React, {useState , useRef, useEffect} from 'react'
import React, { useEffect, useState, useRef, useMemo } from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";

import Nav from "./components/Nav";

import AnimateHeight from "react-animate-height";

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
const UserIcon = styled.img`
  width: 40px;
  height: 40px;
  margin: 20px;
`;
function App() {
  // const history = React.useHistory();
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
          response.json();
          if (response.status === 200) {
            clientData.confirmed_authorized = true;
          } else {
            if (localStorage.getItem("AUTHORIZATION_TOKEN") !== null) {
              alert(
                "You have been logged out. Please log back in or contact a moderator if the problem persists."
              );
            }

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

  useEffect(() => {
    fetch("https://ecranked.ddns.net/status", {
      headers: { Authorization: clientData.authorization_token },
    })
      .then(async (response) => {
        const data = await response.json();
        if (data.maintenance) {
          if (localStorage.getItem("MODERATOR") !== "1") {
            alert("The server is down for maintenance. Please visit later");
            window.location.reload(false);
          }
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("The server unresponsive. Please visit later");
      });
  }, [clientData]);

  const [apiData, setApiData] = React.useState([]);
  const [BannerHeight, setBannerHeight] = useState(400);
  const [BannerText, setBannerTextCallback] = useState("ECRanked");
  const [BannerIconSrc, setBannerIconSrc] = useState(null);

  const setBannerText = (Text, IconSrc) => {
    console.log(Text, IconSrc);
    setBannerTextCallback(Text);
    setBannerIconSrc(IconSrc);
  };
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
  const Hint = useMemo(() => {
    var RandomHints = [
      "...Are you ready?",
      "...Let's gooo!!!",
      "...Do you have what it takes?",
      "...Are you ready?",
      "...Let's gooo!!!",
      "...Do you have what it takes?",
      "...Something big is coming",
      "...Exclusive to Echo Combat",
      "...The first of its kind for Echo VR",
      "...Do you have what it takes?",
      "...UwU",
      "...It is time",
      "...Not Echo Pass!",
      "...Get ready",
      "...For love of the community!",
      "...For love of the game!",
      "...Launch day!",
      "...Pew pew pew! like never before!",
      "...Years in the making",
      "...Push yourself to the limit",
      "...Fight your way to the top",
      "...Who will win?",
      "...The path to pro begins here...",
      "...Hype!!!",
      "...Save the date!",
      "...Let nothing stand in your way",
      "...Ready the Payload!",
      "...Soar into action!",
      "...Fly free in zero-g",
      "...Blue squad, ready",
      "...Orange squad, ready",
      "...Unleash your arsenal",
      "...Make magnificent mayhem!",
      "...Join the battle!",
    ];
    return RandomHints[Math.floor(Math.random() * RandomHints.length)];
  }, []);

  var BannerIconTitle = "";
  if (BannerIconSrc === "/images/moderator_icon.png") {
    BannerIconTitle = "Moderator";
  }
  if (BannerIconSrc === "/images/verified_icon.png") {
    BannerIconTitle = "Verified User";
  }
  if (BannerIconSrc === "/images/capture_point_crown_green.png") {
    BannerIconTitle = "Certified Cutie";
  }
  return (
    <Router>
      <Nav clientData={clientData} style={{ height: "10px" }} />
      <PageBody>
        <Banner
          id="example-panel"
          duration={500}
          height={BannerHeight}
          style={{
            backgroundImage: `url(${combatBackground})`,
            overflow: "visible",
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {BannerText}
            {BannerIconSrc ? (
              <UserIcon title={BannerIconTitle} src={BannerIconSrc} />
            ) : (
              ""
            )}
          </div>
        </Banner>
        <div style={{ padding: "100px" }}>
          <div className="rounded padded">
            <h2>ECRANKED.COM HAS BEEN TAKEN DOWN TEMPORARLY</h2>
            <p>Expect it to be online soon</p>
          </div>
        </div>
      </PageBody>
    </Router>
  );
}

function DiscordOAuthCallback({ callbackCode, onFinish }) {
  const hasFetchedData = useRef(false);
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
          if (data["token"] === undefined) {
            alert(
              "Your discord has not been linked yet to ECRanked. Join the discord server from the navigation bar and contact a moderator to link your account."
            );
            return;
          }
          console.log(data);

          localStorage.setItem("AUTHORIZATION_TOKEN", data["token"]);
          localStorage.setItem("OCULUS_ID", data["oculus_id"]);
          // eslint-disable-next-line
          if (data["moderator"] == 1) {
            localStorage.setItem("MODERATOR", data["moderator"]);
          }
          onFinish();
        });
    }
  };
  useEffect(() => {
    getAuthToken();
    // eslint-disable-next-line
  }, []);

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
