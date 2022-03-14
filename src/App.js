// import React, {useState , useRef, useEffect} from 'react'
import React, { useEffect } from "react";
import styled from "styled-components";

import Nav from "./components/Nav";

import AnimateHeight from "react-animate-height";

// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
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

  const BannerHeight = 400;
  const BannerText = "ECRanked";
  const BannerIconSrc = null;

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
            <h2>ECRANKED.COM HAS BEEN TAKEN DOWN TEMPORARLY FOR UPGRADES</h2>
            <p>Expect it to be online soon</p>
          </div>
        </div>
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
