import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
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

  if (windowDimensions.width > 850) {
    return (
      <TopBar>
        <TopBarLinksDesktop>
          <TopBarLink link="/home" text="Home" />
        </TopBarLinksDesktop>
      </TopBar>
    );
  } else {
    return (
      <TopBar>
        <TopBarLinksMobile style={{}}>
          <div style={{ display: "flex" }}>
            <TopBarLink link="/" text="Home" />
          </div>
        </TopBarLinksMobile>
      </TopBar>
    );
  }
}
