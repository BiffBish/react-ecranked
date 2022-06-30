import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";

import Replay from "./pages/Replay";
import User from "./pages/User";
import Home from "./pages/Home";
import ApproveImagesModeration from "./pages/Moderation/ApproveImagesModeration";
import Moderator from "./pages/Moderator";
import Nav from "./components/Nav";
import OasisDashboard from "./pages/reticle/OasisDashboard";
import Team from "./pages/Team";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import Changelog from "./pages/Changelog";

// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";
import UncontactedUsersModeration from "./pages/Moderation/UncontactedModeration";
import MakeTeam from "./pages/MakeTeam";
import Teams from "./pages/Teams";

import Component from "./pages/Testing";
import AchievementLeaderboard from "./pages/AchievementLeaderboard";
import Contact from "./pages/Contact";
import DeveloperGuide from "./pages/DeveloperGuide";
import { DiscordOAuthCallback } from "./pages/auth/DiscordOAuthCallback";
import { OasisDashboardPopup } from "./pages/reticle/OasisDashboardPopup";

import { useDispatch } from "react-redux";
import { setHeight, setIconSrc, setText } from "./stores/banner";
import { Banner } from "./components/Banner";
import api from "./api";
import LinkUsers from "./pages/Moderation/LinkUsers";

const PageBody = styled.div`
  position: absolute;
  width: 100%;
  z-index: -1;
  background-color: #222;
  min-height: 1000px;
`;



function Routes() {
  // const user = useSelector((state: State) => state.user);
  const dispatch = useDispatch()

  useEffect(() => {
    api.refreshToken()
  }, [dispatch]);

  useEffect(() => {
    fetch("https://ecranked.ddns.net/status")
      .then(async (response) => {
        const data = await response.json();
        if (data.maintenance) {
          if (localStorage.getItem("MODERATOR") !== "true") {
            alert("The server is down for maintenance. Please visit later");
            // window.location.reload(false);
          }
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("The server unresponsive. Please visit later");
      });
  }, []);

  function setBannerHeight(height: number) {
    dispatch(setHeight(height))
  }
  const setBannerText = (Text: string, IconSrc?: string) => {
    console.log(Text, IconSrc);
    // dispatch(setHeight())
    dispatch(setText(Text))
    if (IconSrc)
      dispatch(setIconSrc(IconSrc))
  };



  let history = useHistory();
  console.log(history);

  return (
    <Router>
      {/* <ApiCallHelper /> */}
      <Nav />
      <Banner />
      <PageBody>

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
            return <Home />;
          }}
        />
        <Route
          path={`/leaderboard/challenges`}
          render={(props) => {
            setBannerHeight(100);
            const setBannerTextCallback = (username: string) => {
              console.log(username);
              setBannerText(username);
            };
            console.log("Leaderboard");
            return (
              <div style={{ padding: "10px 100px" }}>
                <AchievementLeaderboard
                  setBannerCallback={setBannerTextCallback}
                />
              </div>
            );
          }}
        />
        <Route
          path={`/user/:username/:subDomain`}
          render={(props) => {
            setBannerHeight(100);
            const setBannerTextCallback = (username: string, iconSRC: string | undefined) => {
              console.log(username);
              setBannerText(username, iconSRC);
            };
            console.log("User");
            return (
              <User
                username={props.match.params.username}
                setBannerCallback={setBannerTextCallback}
              />
            );
          }}
        />
        <Route
          path={`/team/:name/:subDomain`}
          render={(props) => {
            setBannerHeight(100);
            const setBannerTextCallback = (username: string, iconSRC: string) => {
              console.log(username);
              setBannerText(username, iconSRC);
            };
            console.log("User");
            return (
              <Team
                teamname={props.match.params.name}
                setBannerCallback={setBannerTextCallback}
              // subDomain={props.match.params.subDomain}
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
            return <MakeTeam
            />;
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
            console.log("Leaderboard");
            setBannerText("Leaderboard");

            return (
              <Leaderboard
                leaderboardStatistic={props.match.params.leaderboardStatistic}
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
          path={`/Moderator/LinkUsers`}
          render={() => {
            setBannerHeight(100);
            setBannerText("Moderation");
            return <LinkUsers />;
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
            setBannerHeight(100);
            setBannerText("Redirecting");
            return <OasisDashboardPopup url={"/reticle/dashboard"} />;
          }}
        />
        <Route
          exact
          path={`/reticle/:sub_code/:id`}
          render={(props) => {
            console.log("[23] Open");
            return <OasisDashboard joinCode={props.match.params.id} subJoinPath={props.match.params.sub_code} />;
          }}
        />
        <Route
          exact
          path={`/reticle/popout/:sub_code/:id`}
          render={(props) => {
            console.log("[23] Open");
            return <OasisDashboardPopup url={"/reticle/" + props.match.params.sub_code + "/" + props.match.params.id
            } />;
          }}
        />
      </PageBody>
    </Router>
  );
}

export default Routes;
