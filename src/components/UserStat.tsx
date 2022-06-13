import styled from "styled-components";
import React from "react";
import { ProgressBar } from "./ProgressBar";

const UserStatStyle = styled.div`
  margin: 1px;
  float: left;
  background-color: #282828;
  color: white;
  z-index: 3;
  font-size: 20px;
  flex-basis: 0;
  flex-grow: 1;
  min-width: 200px;
  font-size: 14px;
  text-align: center;
  line-height: 1.5;
`;
interface UserStatProps {
  name: string;
  value: number;
  displayValue: string | number;
}
export const UserStat = ({ name, value, displayValue }: UserStatProps) => {
  return (
    <UserStatStyle>
      {name}
      <ProgressBar percent={value} displayValue={displayValue} />
    </UserStatStyle>
  );
};
