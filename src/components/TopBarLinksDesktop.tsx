import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";


export const TopBarLinksMobile = styled.div`
  width: 100%;
  width: auto;
  background-color: #222;
  height: 50.67px;
  display: flex;
  flex-direction: column;
`;
export const ButtonLink = styled.div`
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
export const LinkLikeButtonStyle = styled.div`
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
export const LogoutButton = styled.div`
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
interface LinkProps {
    link: string;
    text: string;
    externalLink?: boolean;
    floatRight?: boolean;
}

export const TopBarLink = ({ link, text, externalLink, floatRight }: LinkProps) => {
    if (externalLink) {
        return (
            <ExternalLinkStyle
                style={floatRight ? { float: "right" } : {}}
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
        // onClick={() => {
        //     window.location.href = "https://google.com/contact";
        // }}
        >
            {text}
        </LinkStyle>
    );
};
