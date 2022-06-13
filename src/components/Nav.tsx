import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import AutoComplete from "./AutoComplete";
import { ButtonLink, LogoutButton, TopBarLink, TopBarLinksMobile, LinkLikeButtonStyle } from "./TopBarLinksDesktop";
import { useMe, User, Team } from "@ecranked/api";
import api from "../api";
// import GlobalUserState from "../contexts/GlobalUserState";
export const TopBarLinksDesktop = styled.div`
  width: 100%;
  width: auto;
  background-color: #222;
  height: 50.67px;
`;
const TopBar = styled.div`
  height: 10px;
  z-index: 100;
  background-color: #222;
  margin: 0px;
  padding: 0px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  height: 50.67px;
  box-sizing: inherit;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
`;

const autoCompleteBox = styled.form`
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  display: inline-block;
  float: right;
  margin: 4px;
  background-color: #222;
  z-index: 50;
  overflow: hidden;
`;
const autoCompleteInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 18px;
  padding: 8px;
  font-family: "Montserrat", sans-serif;
  z-index: 50;
`;
const autoCompleteOptionDiv = styled.div`
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 18px;
  padding: 3px 8px;
  z-index: 50;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
  transition-duration: 0.1s;
`;
const AuthorizeButton = (): JSX.Element => {
  const { me, isLoading } = useMe();

  const logout = async () => {
    await api.logout()
    window.location.reload();

  };
  // console.log(userData.authorization_token);
  var buttonText = "Login";
  if (isLoading) buttonText = "Loading...";
  if (me?.oculus_id) buttonText = "Logout (" + me.oculus_name + ")";
  if (!me?.oculus_id) {
    return (
      <ButtonLink
        style={{ float: "right" }}
        onClick={() => {
          console.log("TEST");
          localStorage.setItem("REDIRECT_URI", window.location.toString());
          if (process.env.NODE_ENV === "production") {
            window.location.href =
              "https://discord.com/api/oauth2/authorize?client_id=852660826710999051&redirect_uri=https%3A%2F%2Fecranked.com%2Fauth%2Fdiscord%2Fcallback&response_type=code&scope=identify";
          } else {
            window.location.href =
              "https://discord.com/api/oauth2/authorize?client_id=852660826710999051&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fcallback&response_type=code&scope=identify";
          }


        }}
      >
        {buttonText}
      </ButtonLink>
    );
  } else {
    return <LogoutButton onClick={logout}>{buttonText
    }</LogoutButton>;
  }
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function Nav() {
  const { me } = useMe();
  // const [globalUserState] = useContext(GlobalUserState);
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
  let history = useHistory();

  const [allUsernames, setAllUsernames] = useState<string[]>([]);
  const [allTeams, setAllTeams] = useState<string[]>([]);


  useEffect(() => {
    User.fetchAll().then((response) => {
      setAllUsernames(response);
    })
      .catch((error) => {
        console.error("SetAllUsernames => There was an error!", error);
      });
  }, []);
  useEffect(() => {
    Team.fetchAll()
      .then((data) => {
        setAllTeams(data.map((element) => element.name));
      })
      .catch((error) => {
        console.error("SetAllTeamnames => There was an error!", error);
      });
  }, []);

  const whenSearchSubmit = (text: string) => {
    if (allTeams.includes(text)) {
      history.push("/team/" + text + "/overview");
    } else {
      history.push("/user/" + text + "/stats");
    }
  };

  const [navigationPopupOut, setNavigationPopupOut] = useState(false);
  if (windowDimensions.width > 850) {
    return (
      <TopBar>
        <TopBarLinksDesktop>
          <TopBarLink link="/home" text="Home" />
          {/* <TopBarLink
            link="https://ecranked.ddns.net/docs"
            text="API"
            externalLink={true}
          /> */}
          <TopBarLink
            link="https://discord.gg/4fxM7tPRdZ"
            text="Join us on Discord"
            externalLink={true}
          />
          {/* <TopBarLink link="/TermsOfUse" text="Terms Of Use" />
          <TopBarLink link="/Changelog" text="Changelog" /> */}
          {/* {globalUserState.moderator ? (
            <TopBarLink link="/Moderator" text="Moderator" />
          ) : (
            ""
          )} */}
          <TopBarLink link="/contact" text="Contact me" />
          {/* <AuthorizeButton loggedIn={globalUserState.authorization_token} /> */}
          <AuthorizeButton />
          <AutoComplete
            options={allUsernames.concat(allTeams)}
            onFormSubmit={whenSearchSubmit}
            Box={autoCompleteBox}
            OptionDiv={autoCompleteOptionDiv}
            Input={autoCompleteInput}
            maxAllowed={12}
          />
        </TopBarLinksDesktop>
      </TopBar>
    );
  } else {
    return (
      <TopBar>
        <TopBarLinksMobile style={{}}>
          <div style={{ display: "flex" }}>
            <TopBarLink link="/" text="Home" />
            <AutoComplete
              options={allUsernames.concat(allTeams)}
              onFormSubmit={whenSearchSubmit}
              Box={autoCompleteBox}
              OptionDiv={autoCompleteOptionDiv}
              Input={autoCompleteInput}
              maxAllowed={12}
            />
            <LinkLikeButtonStyle
              style={{ float: "right" }}
              onClickCapture={() => {
                setNavigationPopupOut(!navigationPopupOut);
              }}
            >
              ≡
            </LinkLikeButtonStyle>
          </div>
          {navigationPopupOut ? (
            <>
              <TopBarLink link="/home" text="Home" />
              <TopBarLink
                link="https://ecranked.ddns.net"
                text="API"
                externalLink={true}
              />

              <TopBarLink link="/TermsOfUse" text="Terms Of Use" />
              <TopBarLink link="/Changelog" text="Changelog" />

              {me?.moderator ? (
                <TopBarLink
                  link="/Moderator/UnapprovedImages"
                  text="Moderator"
                />
              ) : (
                ""
              )}
              <TopBarLink
                link="https://discord.gg/4fxM7tPRdZ"
                text="Join us on Discord"
                externalLink={true}
              />
              <AuthorizeButton />
            </>
          ) : (
            <></>
          )}
        </TopBarLinksMobile>
      </TopBar>
    );
  }
}
