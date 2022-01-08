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
  border: 1px solid white;
  border-radius: 10px;
  line-height: 0;
  font-size: 15px;
  line-height: 1.5;
  &:hover {
    background-color: #555;
    color: #000;
  }
  cursor: pointer;
`;
export default function Moderator() {
  return (
    <div>
      <Button to={"Moderator/UnapprovedImages"}>Unapproved Images</Button>
      <Button to={"Moderator/UncontactedUsers"}>Uncontacted Users</Button>
    </div>
  );
}
