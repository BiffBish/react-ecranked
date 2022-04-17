import React, { useEffect, useState, useRef, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";

import Replay from "./pages/Replay";
import User from "./pages/User";
import Home from "./pages/Home";
import ApproveImagesModeration from "./pages/Moderation/ApproveImagesModeration";
import Moderator from "./pages/Moderator";
import Nav from "./components/Nav";
import OasisDashboard from "./pages/OasisDashboard";
import Team from "./pages/Team";

import AnimateHeight from "react-animate-height";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Changelog from "./pages/Changelog";

// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";
import UncontactedUsersModeration from "./pages/Moderation/UncontactedModeration";
import MakeTeam from "./pages/MakeTeam";
import Teams from "./pages/Teams";

import Component from "./pages/Testing";
import GlobalUserState from "./contexts/GlobalUserState";
import makeApiCall, { ApiCallHelper } from "./helpers/makeApiCall";
import AchievementLeaderboard from "./pages/AchievementLeaderboard";
import Contact from "./pages/Contact";
import DeveloperGuide from "./pages/DeveloperGuide";
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
function Routes() {
  const [globalUserState, setGlobalUserState] = useContext(GlobalUserState);
  // const [clientData, setClientData] = React.useState({
  //   oculus_id: localStorage.getItem("OCULUS_ID"),
  //   authorization_token: localStorage.getItem("AUTHORIZATION_TOKEN"),
  //   confirmed_authorized: false,
  //   moderator: localStorage.getItem("MODERATOR"),
  // });
  useEffect(() => {
    setGlobalUserState((state) => ({
      ...state,
      oculus_id: localStorage.getItem("OCULUS_ID"),
      moderator: localStorage.getItem("MODERATOR"),
      authorization_token: localStorage.getItem("AUTHORIZATION_TOKEN"),
    }));
    let authorization_token = localStorage.getItem("AUTHORIZATION_TOKEN");
    if (authorization_token) {
      makeApiCall("v1/user/@me")
        .then(async (response) => {
          let data = response.json;
          if (response.status === 200) {
            console.log("#R82", data);
            setGlobalUserState((state) => ({
              ...state,
              ...data,
              oculus_id: data.oculus_id,
              moderator: data.moderator,
            }));
            localStorage.setItem("OCULUS_ID", data.oculus_id);
            localStorage.setItem("MODERATOR", data.moderator);
          } else {
            if (localStorage.getItem("AUTHORIZATION_TOKEN") !== null) {
              alert(
                "You have been logged out. Please log back in or contact a moderator if the problem persists."
              );
            }
            localStorage.removeItem("AUTHORIZATION_TOKEN");
            localStorage.removeItem("OCULUS_ID");
            localStorage.removeItem("MODERATOR");
            setGlobalUserState((prev) => ({}));
            window.location.reload(false);
          }
        })
        .catch((error) => {
          localStorage.removeItem("AUTHORIZATION_TOKEN");
          localStorage.removeItem("OCULUS_ID");
          localStorage.removeItem("MODERATOR");
          setGlobalUserState((prev) => ({
            ...prev,
            userData: null,
            oculus_id: null,
            moderator: null,
          }));
          alert(
            "There was an error when authenticating you. Please contact a moderator"
          );
          console.error(
            "There was an error when authenticating you. Please contact a moderator",
            error
          );
        });
    }
  }, [setGlobalUserState]);

  useEffect(() => {
    fetch("https://ecranked.ddns.net/status")
      .then(async (response) => {
        const data = await response.json();
        if (data.maintenance) {
          if (localStorage.getItem("MODERATOR") !== "true") {
            alert("The server is down for maintenance. Please visit later");
            window.location.reload(false);
          }
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("The server unresponsive. Please visit later");
      });
  }, [globalUserState.authorization_token]);

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
      <ApiCallHelper />
      <Nav style={{ height: "10px" }} />
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
        <Route exact path={["/"]}>
          <Redirect to="/home" />
        </Route>

        <Route
          exact
          path={["/contact"]}
          render={(props) => {
            setBannerHeight(200);
            setBannerText("Contact");
            return <Contact />;
          }}
        />

        <Route
          exact
          path={["/achievementguide"]}
          render={(props) => {
            setBannerHeight(200);
            setBannerText("Guide");
            return <DeveloperGuide />;
          }}
        />

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
          path={`/leaderboard/challenges`}
          render={(props) => {
            setBannerHeight(100);
            const setBannerTextCallback = (username) => {
              console.log(username);
              setBannerText(username);
            };
            console.log("Leaderboard");
            return (
              <div style={{ padding: "10px 100px" }}>
                <AchievementLeaderboard
                  leaderboardStatistic={props.match.params.leaderboardStatistic}
                  setBannerCallback={setBannerTextCallback}
                  subDomain={props.match.params.subDomain}
                />
              </div>
            );
          }}
        />
        <Route
          path={`/user/:username/:subDomain`}
          render={(props) => {
            setBannerHeight(100);
            const setBannerTextCallback = (username, iconSRC) => {
              console.log(username);
              setBannerText(username, iconSRC);
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
          path={`/team/:name/:subDomain`}
          render={(props) => {
            setBannerHeight(100);
            const setBannerTextCallback = (username, iconSRC) => {
              console.log(username);
              setBannerText(username, iconSRC);
            };
            console.log("User");
            return (
              <Team
                teamname={props.match.params.name}
                setBannerCallback={setBannerTextCallback}
                subDomain={props.match.params.subDomain}
              />
            );
          }}
        />
        <Route
          path={`/maketeam`}
          render={(props) => {
            setBannerHeight(100);
            setBannerText("Make a team!");

            console.log("User");
            return <MakeTeam />;
          }}
        />
        <Route
          path={"/teams"}
          render={(props) => {
            setBannerHeight(100);
            setBannerText("Teams");

            console.log("Teams");
            return <Teams />;
          }}
        />
        <Route
          path={`/leaderboard/:leaderboardStatistic/:subDomain`}
          render={(props) => {
            setBannerHeight(100);
            const setBannerTextCallback = (username) => {
              console.log(username);
              setBannerText(username);
            };
            console.log("Leaderboard");
            return (
              <Leaderboard
                leaderboardStatistic={props.match.params.leaderboardStatistic}
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
                  var redirectLink = localStorage.getItem("REDIRECT_URI");

                  window.location.href = redirectLink ? redirectLink : "/home";
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
            setBannerText("Changelog");
            return <Changelog />;
          }}
        />
        <Route
          path={`/Moderator/UnapprovedImages`}
          render={() => {
            setBannerHeight(100);
            setBannerText("Moderation");
            return <ApproveImagesModeration />;
          }}
        />
        <Route
          path={`/Moderator/UncontactedUsers`}
          render={() => {
            setBannerHeight(100);
            setBannerText("Moderation");
            return <UncontactedUsersModeration />;
          }}
        />
        <Route
          path={"/Testing"}
          render={() => {
            return <Component />;
          }}
        />
        <Route
          exact
          path={`/Moderator`}
          render={() => {
            setBannerHeight(100);
            setBannerText("Moderation");
            return <Moderator />;
          }}
        />
        <Route
          exact
          path={`/reticle/dashboard`}
          render={() => {
            setBannerHeight(100);
            setBannerText("Reticle Dashboard");
            return <OasisDashboard />;
          }}
        />
        <Route
          exact
          path={`/reticle/dashboard/open`}
          render={() => {
            console.log("[23] Open");
            return <OasisDashboardPopup />;
          }}
        />
      </PageBody>
    </Router>
  );
}

const OasisDashboardPopup = ({}) => {
  console.log("[23] Running useEffect");
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    async function getUser() {
      const hasPopupsEnabled = await new Promise((resolve, reject) => {
        console.log("Running Promise");
        var popupBlockerChecker = {
          check: function (popup_window) {
            var _scope = this;
            if (popup_window) {
              if (/chrome/.test(navigator.userAgent.toLowerCase())) {
                setTimeout(function () {
                  resolve(_scope._is_popup_blocked(_scope, popup_window));
                }, 200);
              } else {
                popup_window.onload = function () {
                  resolve(_scope._is_popup_blocked(_scope, popup_window));
                };
              }
            } else {
              _scope._displayError();
              resolve(false);
            }
          },
          _is_popup_blocked: function (scope, popup_window) {
            if (popup_window.innerHeight > 0 == false) {
              scope._displayError();
              return false;
            }
            return true;
          },
          _displayError: function () {
            alert(
              "Popup Blocker is enabled! Please add this site to your exception list."
            );
          },
        };
        let popup = window.open("/reticle/dashboard", "", "popup");
        popupBlockerChecker.check(popup);
      });
      setIsEnabled(hasPopupsEnabled);
      if (hasPopupsEnabled) {
        window.opener = null;
        window.open("", "_self");
        window.close();
        window.close();
        return <Redirect to={"/"} />;
      }
    }
    getUser();
  }, []);
  if (isEnabled) return null;
  return (
    <div className="rounded border padded centered" style={{ margin: "50px" }}>
      <h1>Popups are disabled. Please enable them and refresh the page.</h1>
    </div>
  );
};

export default Routes;
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
      fetch("https://ecranked.ddns.net/api/v2/auth/login", requestOptions)
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
