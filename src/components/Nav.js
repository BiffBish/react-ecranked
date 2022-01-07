import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import AutoComplete from "./AutoComplete";
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
  border: 2px solid white;
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
const AuthorizeButton = ({ userData }) => {
  const logout = () => {
    localStorage.removeItem("AUTHORIZATION_TOKEN");
    localStorage.removeItem("OCULUS_ID");
    localStorage.removeItem("MODERATOR");

    window.location.reload(false);
  };
  // console.log(userData.authorization_token);
  if (userData.authorization_token == null) {
    return (
      <TopBarLink
        link="https://discord.com/api/oauth2/authorize?client_id=852660826710999051&redirect_uri=https%3A%2F%2Fecranked.com%2Fauth%2Fdiscord%2Fcallback&response_type=code&scope=identify"
        text="Login with discord"
        externalLink={true}
        floatRight={true}
      />
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

  const [allUsernames, setAllUsernames] = useState(null);
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
  const whenSearchSubmit = (text) => {
    console.log(text);
    history.push("/user/" + text + "/stats");
    //Change url without reloading: /user/{text}/stats
  };
  const [navigationPopupOut, setNavigationPopupOut] = useState(false);
  if (windowDimensions.width > 850) {
    return (
      <TopBar>
        <TopBarLinksDesktop>
          <TopBarLink link="/" text="Home" />
          <TopBarLink
            link="https://ecranked.ddns.net"
            text="API"
            externalLink={true}
          />

          <TopBarLink link="/TermsOfUse" text="Terms Of Use" />
          {clientData.moderator ? (
            <TopBarLink link="/Moderator/UnapprovedImages" text="Moderator" />
          ) : (
            ""
          )}
          <AuthorizeButton userData={clientData} />
          <AutoComplete
            options={allUsernames}
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
              options={allUsernames}
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
              <TopBarLink link="/" text="Home" />
              <TopBarLink
                link="https://ecranked.ddns.net"
                text="API"
                externalLink={true}
              />

              <TopBarLink link="/TermsOfUse" text="Terms Of Use" />
              {clientData.moderator ? (
                <TopBarLink
                  link="/Moderator/UnapprovedImages"
                  text="Moderator"
                />
              ) : (
                ""
              )}
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
