import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Button = styled(NavLink)`
  display: flex;
  align-items: center;
  background-color: #333;
  padding: 10px;
  margin: 10px 0px;
  text-decoration: none;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  line-height: 0;
  font-size: 15px;
  line-height: 1.5;
  &:hover {
    background-color: #555;
    color: #000;
  }
  cursor: pointer;
  color: white;
`;
export default function Moderator() {
  return (
    <div>
      <Button to={"Moderator/UnapprovedImages"}>Unapproved Images</Button>
      <Button to={"Moderator/UncontactedUsers"}>Uncontacted Users</Button>
      <Button
        to={"Moderator"}
        onClick={() => {
          fetch("https://ecranked.ddns.net/status", {
            method: "PUT",
            headers: {
              Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ maintenance: true }),
          });
        }}
      >
        Set Maintenance True
      </Button>
      <Button
        to={"Moderator"}
        onClick={() => {
          fetch("https://ecranked.ddns.net/status", {
            method: "PUT",
            headers: {
              Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ maintenance: false }),
          });
        }}
      >
        Set Maintenance False
      </Button>
    </div>
  );
}
