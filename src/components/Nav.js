import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import AutoComplete from "./AutoComplete";
import GlobalUserState from "../contexts/GlobalUserState";

const TopBar = styled.div`
  height: 100%;
  z-index: 100;
  background-color: #222;
  margin: 0px;
  padding: 0px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  height: 50.67px;
  box-sizing: inherit;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
`;

const TopBarLinksDesktop = styled.div`
  width: 100%;
  width: auto;
  background-color: #222;
  height: 50.67px;
`;
const TopBarLinksMobile = styled.div`
  width: 100%;
  width: auto;
  background-color: #222;
  height: 50.67px;
  display: flex;
  flex-direction: column;
`;
const ButtonLink = styled.div`
  text-align: center;
  color: #fff;
  background-color: #222;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: 200;
  float: left;
  text-decoration: none;
  &:hover {
    background-color: #555;
    color: #000;
  }
  transition-duration: 0.1s;
  cursor: pointer;
`;

const LinkStyle = styled(NavLink)`
  text-align: center;
  color: #fff;
  background-color: #222;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: 200;
  float: left;
  text-decoration: none;
  &:hover {
    background-color: #555;
    color: #000;
  }
  transition-duration: 0.1s;
`;
const LinkLikeButtonStyle = styled.div`
  text-align: center;
  color: #fff;
  background-color: #222;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: 200;
  float: left;
  text-decoration: none;
  &:hover {
    background-color: #555;
    color: #000;
  }
  transition-duration: 0.1s;
`;
const LogoutButton = styled.div`
  text-align: center;
  color: #fff;
  background-color: #222;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: 200;
  float: left;
  text-decoration: none;
  &:hover {
    background-color: #555;
    color: #000;
  }
  transition-duration: 0.1s;
  float: right;
  cursor: pointer;
`;
const ExternalLinkStyle = styled.a`
  text-align: center;
  color: #fff;
  background-color: #222;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: 200;
  float: left;
  text-decoration: none;
  &:hover {
    background-color: #555;
    color: #000;
  }
  transition-duration: 0.1s;
  cursor: pointer;
`;
const TopBarLink = ({ link, text, externalLink, floatRight }) => {
  if (externalLink) {
    return (
      <ExternalLinkStyle
        style={floatRight ? { float: "right" } : {}}
        activeStyle={{ backgroundColor: "#fff", color: "#000" }}
        href={link}
      >
        {text}
      </ExternalLinkStyle>
    );
  }
  return (
    <LinkStyle
      activeStyle={{ backgroundColor: "#fff", color: "#000" }}
      to={link}
      onclick={() => {
        window.location.href = "https://google.com/contact";
      }}
    >
      {text}
    </LinkStyle>
  );
};

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
const AuthorizeButton = ({ loggedIn }) => {
  const logout = () => {
    localStorage.removeItem("AUTHORIZATION_TOKEN");
    localStorage.removeItem("OCULUS_ID");
    localStorage.removeItem("MODERATOR");

    window.location.reload(false);
  };
  // console.log(userData.authorization_token);
  if (!loggedIn) {
    return (
      <ButtonLink
        style={{ float: "right" }}
        onClick={() => {
          console.log("TEST");
          localStorage.setItem("REDIRECT_URI", window.location);
          window.location.href =
            "https://discord.com/api/oauth2/authorize?client_id=852660826710999051&redirect_uri=https%3A%2F%2Fecranked.com%2Fauth%2Fdiscord%2Fcallback&response_type=code&scope=identify";
        }}
      >
        Login
      </ButtonLink>
    );
  } else {
    return <LogoutButton onClick={logout}>Logout</LogoutButton>;
  }
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
export default function Nav({ clientData }) {
  const [globalUserState] = useContext(GlobalUserState);
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

  const [allUsernames, setAllUsernames] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  useEffect(() => {
    fetch("https://ecranked.ddns.net/api/v1/user/@all")
      .then(async (response) => {
        const data = await response.json();
        console.log("allUsernames code:" + response.statusCode);
        if (response.status === 404) {
        } else {
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          console.log(data);
          setAllUsernames(data);
        }
      })
      .catch((error) => {
        console.error("SetAllUsernames => There was an error!", error);
      });
  }, []);
  useEffect(() => {
    fetch("https://ecranked.ddns.net/api/v1/team/@all")
      .then(async (response) => {
        const data = await response.json();
        console.log("allUsernames code:" + response.statusCode);
        if (response.status === 404) {
        } else {
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          console.log(data);
          setAllTeams(data.map((element) => element.name));
        }
      })
      .catch((error) => {
        console.error("SetAllUsernames => There was an error!", error);
      });
  }, []);
  const whenSearchSubmit = (text) => {
    console.log(text);

    if (allTeams.includes(text)) {
      history.push("/team/" + text + "/overview");
    } else {
      history.push("/user/" + text + "/stats");
    }
    //Change url without reloading: /user/{text}/stats
  };
  const [navigationPopupOut, setNavigationPopupOut] = useState(false);
  if (windowDimensions.width > 850) {
    return (
      <TopBar>
        <TopBarLinksDesktop>
          <TopBarLink link="/home" text="Home" />
          <TopBarLink
            link="https://ecranked.ddns.net/docs"
            text="API"
            externalLink={true}
          />
          <TopBarLink
            link="https://discord.gg/4fxM7tPRdZ"
            text="Join us on Discord"
            externalLink={true}
          />
          <TopBarLink link="/TermsOfUse" text="Terms Of Use" />
          <TopBarLink link="/Changelog" text="Changelog" />
          {globalUserState.moderator ? (
            <TopBarLink link="/Moderator" text="Moderator" />
          ) : (
            ""
          )}
          <AuthorizeButton loggedIn={globalUserState.authorization_token} />
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

              {clientData.moderator ? (
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
              <AuthorizeButton userData={clientData} />
            </>
          ) : (
            <></>
          )}
        </TopBarLinksMobile>
      </TopBar>
    );
  }
}
