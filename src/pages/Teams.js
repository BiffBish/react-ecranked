/* eslint-disable */

import React from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const BodyContainer = styled.div`
  margin: auto;
  width: 80%;
`;

export default function Teams() {
  let history = useHistory();

  let [canJoin, setCanJoin] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("OCULUS_ID") === null) {
      // alert("Please log in before attempting to create a team");
      // history.push("/");
      return;
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
            // setCanCreate(true);
          }
        }
      })
      .catch((error) => {
        alert(
          "There was an error. Please contact a moderator immediately. #EPMT60"
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
      //return;
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
    <>
      <p style={{ color: "white", fontSize: "15px" }}>
        {" "}
        This page is in early beta. There may be issues and the layout might
        change. Currently you cannot undo your request to join so be careful.
      </p>
      <BodyContainer>
        <div className="padded list">
          <div className="rounded padded list">
            <h1>Team list!</h1>
            <div
              className="rounded button"
              onClick={() => {
                history.push("/maketeam");
              }}
            >
              <h1>Make your own team!</h1>
            </div>
            {teamList.slice(0, 200).map((teamData) => {
              return (
                <div className="button-container">
                  <NavLink
                    className={"button rounded grow"}
                    to={"/team/" + teamData.name + "/overview"}
                  >
                    {" "}
                    {teamData.name}
                  </NavLink>
                  <div
                    className="rounded button"
                    // onClickCapture={() => {
                    //   // RemoveUser(user.oculus_name);
                    //   const requestOptions = {
                    //     method: "POST",
                    //     headers: {
                    //       Authorization: localStorage.getItem(
                    //         "AUTHORIZATION_TOKEN"
                    //       ),
                    //       "Content-Type": "application/json",
                    //     },
                    //     body: JSON.stringify({}),
                    //   };

                    //   fetch(
                    //     "https://ecranked.ddns.net/api/v1/team/" +
                    //       teamData.name +
                    //       "/request_join",
                    //     requestOptions
                    //   )
                    //     .then((response) => response.json())
                    //     .then((data) => {
                    //       console.log(data);
                    //       window.location.reload(false);
                    //     });
                    // }}
                  >
                    {"Members: "}
                    {teamData.member_count}{" "}
                  </div>
                  {canJoin ? (
                    <div
                      className="rounded button"
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
                            teamData.name +
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
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </BodyContainer>
    </>
  );
}
