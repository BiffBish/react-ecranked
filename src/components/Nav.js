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
const TopBarLink = ({ link, text, externalLink }) => {
  if (externalLink) {
    return (
      <ExternalLinkStyle
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

export default function Nav() {
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
  return (
    <TopBar>
      <TopBarLinksDesktop>
        <TopBarLink link="/" text="Home" />
        <TopBarLink
          link="https://echopedia.gg/wiki/Replay_Viewer#Installation"
          text="Replay Viewer"
          externalLink={true}
        />
        <TopBarLink
          link="https://ecranked.ddns.net"
          text="API"
          externalLink={true}
        />
        <TopBarLink
          link="https://ecranked.ddns.net/TermsOfUse"
          text="Terms Of Use"
          externalLink={true}
        />
        <AutoComplete
          options={allUsernames}
          onFormSubmit={whenSearchSubmit}
          Box={autoCompleteBox}
          OptionDiv={autoCompleteOptionDiv}
          Input={autoCompleteInput}
          maxAllowed={12}
        />
        {/* <AutocompleteStyled
          id="Oculus Username"
          freeSolo
          options={top100Films.map((option) => option.title)}
          renderInput={(params) => (
            <TextFieldStyled {...params} label="Oculus Username" />
          )}
        /> */}
      </TopBarLinksDesktop>

      {/* <!-- Navbar on small screens -->
            <div id="navDemo" className="w3-bar-block w3-darkgrey w3-hide w3-hide-large w3-hide-medium w3-large" style ="background-color:#222;color:white">
            <a href="#" className="round w3-button" style = "width:100%">Link 1</a>
            <a href="#" className="round w3-button" style = "width:100%">Link 2</a>
            <a href="#" className="round w3-button" style = "width:100%">Link 3</a>
            <a href="#" className="round w3-button" style = "width:100%">Link 4</a>
            </div> */}
    </TopBar>
  );
}
