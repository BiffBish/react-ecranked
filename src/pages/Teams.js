/* eslint-disable */

import React from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

// const Button = styled(NavLink)`
//   display: flex;
//   align-items: center;
//   background-color: #333;
//   padding: 10px;
//   margin: 10px 0px;
//   text-decoration: none;
//   border: 1px solid white;
//   border-radius: 10px;
//   line-height: 0;
//   font-size: 15px;
//   line-height: 1.5;
//   &:hover {
//     background-color: #555;
//     color: #000;
//   }
//   cursor: pointer;
//   color: white;
// `;

const UserContainer = styled.div`
  background-color: #222;
  color: white;
  float: left;
  flex: 20px 2;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: stretch;
  // height: 20px;
  height: 52px;
`;
const AllUsersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 10px 0px;
  margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  // border: 1px solid white;
  // border-radius: 10px;
  flex-direction: column;
  margin: auto;
  width: 98%;
`;
const ApproveImagesContainer = styled.div`
  color: white;
  float: center;
  border: 1px solid white;
  border-radius: 10px;
  flex-grow: 1;
`;
const UserLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-size: 20px;
  border: 1px solid white;
  border-radius: 10px;
  height: 30px;
  flex: 50px 1;
  padding: 10px;
  &:hover {
    background-color: #555;
    color: #000;
  }
`;
const Button = styled.div`
  text-decoration: none;
  color: white;
  font-size: 20px;
  border: 1px solid white;
  border-radius: 10px;
  flex: 200px 0;
  cursor: pointer;
  &:hover {
    background-color: #555;
    color: #000;
  }
  padding: 10px;
  height: 30px;
`;
const NotClickableButton = styled.div`
  text-decoration: none;
  color: white;
  font-size: 15px;
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px;
  height: 30px;
  width: 200px;
`;
const BodyContainer = styled.div`
  margin: auto;
  width: 80%;
  min-width: 400px;
  display: flex;
`;
export default function Teams() {
  let history = useHistory();

  let [canJoin, setCanJoin] = useState(false);
  let [canCreate, setCanCreate] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("OCULUS_ID") === null) {
      // alert("Please log in before attempting to create a team");
      // history.push("/");
      // return;
    }
    fetch(
      "https://ecranked.ddns.net/api/v1/user/" +
        localStorage.getItem("OCULUS_ID"),
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        const data = await response.json();
        console.log("code:" + response.statusCode);
        if (response.status === 404) {
          console.error("User not found!");
          // alert(
          //   "There was an error. Please contact a moderator immediately. #EPMT134"
          // );
          // history.push("/");
          return;
        } else {
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          if (data.team_id === null && data.requested_team_id === null) {
            setCanJoin(true);
            setCanCreate(true);
          }
        }
      })
      .catch((error) => {
        alert(
          "There was an error. Please contact a moderator immediately. #EPMT167"
        );
        console.error("There was an error!", error);
        return;
      });
  }, []);
  let [teamList, setTeamList] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("OCULUS_ID") === null) {
      // alert("Please log in before attempting to create a team");
      // history.push("/");
      // return;
    }
    fetch("https://ecranked.ddns.net/api/v1/team/@all", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const data = await response.json();
        console.log("code:" + response.statusCode);
        if (response.status === 404) {
          console.error("User not found!");
          // alert(
          //   "There was an error. Please contact a moderator immediately. #EPMT134"
          // );
          // history.push("/");
          return;
        } else {
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          setTeamList(data);
        }
      })
      .catch((error) => {
        alert(
          "There was an error. Please contact a moderator immediately. #EPMT167"
        );
        console.error("There was an error!", error);
        return;
      });
  }, []);
  return (
    <BodyContainer>
      <ApproveImagesContainer>
        <h1>Team list!</h1>
        <AllUsersContainer>
          {teamList.slice(0, 200).map((teamname) => {
            return (
              <UserContainer>
                {/* <Button
                  onClick={() => {
                    navigator.clipboard.writeText(user.oculus_name);
                  }}
                >
                  Copy
                </Button> */}
                <UserLink to={"/team/" + teamname + "/overview"}>
                  {" "}
                  {teamname}
                </UserLink>
                <Button
                  onClickCapture={() => {
                    // RemoveUser(user.oculus_name);
                    const requestOptions = {
                      method: "POST",
                      headers: {
                        Authorization: localStorage.getItem(
                          "AUTHORIZATION_TOKEN"
                        ),
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({}),
                    };

                    fetch(
                      "https://ecranked.ddns.net/api/v1/team/" +
                        teamname +
                        "/request_join",
                      requestOptions
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(data);
                        window.location.reload(false);
                      });
                  }}
                >
                  Request to join
                </Button>
              </UserContainer>
            );
          })}
        </AllUsersContainer>
      </ApproveImagesContainer>
    </BodyContainer>
  );
}
