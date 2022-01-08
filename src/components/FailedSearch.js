import styled from "styled-components";
import React, { useEffect, useState } from "react";
import AutoComplete from "./AutoComplete";

const autoCompleteBox = styled.form`
  border: 1px solid white;
  border-radius: 10px;
  display: inline-block;
  float: center;
  margin: 4px;
  background-color: #222;
  z-index: 50;
  float: center;
  overflow: hidden;
`;
const autoCompleteInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 36px;
  padding: 8px;
  font-family: "Montserrat", sans-serif;
  z-index: 50;
`;
const autoCompleteOptionDiv = styled.div`
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 36px;
  padding: 3px 8px;
  z-index: 50;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
  transition-duration: 0.1s;
`;
const FailedSearchBarStyle = styled.div`
  flex-grow: 1;
  height: 0px;
  transition-duration: 1s;
  border-width: 1px
  transition-property: height border margin border-width;
  background-color: #222;
  overflow: hidden;
  border-style: solid;
  
  border-radius: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const FailedSearchBarTitleStyle = styled.h2`
  text-align: center;
  font-size: 41px;
  color: #fff;
  line-height: 1;
`;
export const FailedSearchBar = ({ shown, onFormSubmit }) => {
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

  return (
    <FailedSearchBarStyle
      style={
        shown
          ? {
              height: `600px`,
              border: "1px solid #fff",
              margin: "10px 10px 0px",
            }
          : {
              height: `0px`,
              border: "0px solid #222",
              margin: "0px 10px 0px",
            }
      }
    >
      <FailedSearchBarTitleStyle>Could not find user</FailedSearchBarTitleStyle>
      <AutoComplete
        onFormSubmit={onFormSubmit}
        options={allUsernames}
        maxAllowed={6}
        Box={autoCompleteBox}
        OptionDiv={autoCompleteOptionDiv}
        Input={autoCompleteInput}
      ></AutoComplete>
    </FailedSearchBarStyle>
  );
};
