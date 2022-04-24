/* eslint-disable */

import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
// import GlobalUserState from "../contexts/GlobalUserState";
import { Link } from "react-router-dom";
import { makeApiCall } from "../helpers/api/index";
import { useSelector } from "react-redux";
import { State } from "../stores/store";

const BodyContainer = styled.div`
  margin: auto;
  width: 80%;
`;

export default function Teams() {
  let history = useHistory();

  const userData = useSelector((state: State) => state.user.userData);

  let canJoin = true;
  let showRequestButtons = false;
  if (userData) {
    canJoin =
      !userData.requested_team_id &&
      !userData.team_id;

    showRequestButtons = userData.requested_team_id != null
  }



  let [teamList, setTeamList] = useState<Api.Team.All>([]);
  useEffect(() => {
    makeApiCall("v1/team/@all")
      .then((response) => {
        let json = response.json as Api.Team.All;
        setTeamList(json);
      })
  }, []);

  const JoinTeam = (teamname: string) => {
    makeApiCall("v1/team/" + teamname + "/request_join", "POST").then(() => {
      window.location.reload();
    });
  };
  const CancelTeam = (teamname: string) => {
    makeApiCall("v1/team/" + teamname + "/cancel_join", "POST").then(() => {
      window.location.reload();
    });
  };

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
            {canJoin ? (
              <Link className="rounded button" to={"/maketeam"}>
                <h1>Make your own team!</h1>
              </Link>
            ) : null}

            {teamList.slice(0, 200).map((teamData: Api.Team.SimpleTeam) => {
              let disabled = false;
              if (!canJoin) disabled = true;
              if (teamData.id == userData?.requested_team_id)
                disabled = false;
              return (
                <div className="button-container">
                  <NavLink
                    className={"button rounded grow"}
                    to={"/team/" + teamData.name + "/overview"}
                  >
                    {" "}
                    {teamData.name}
                  </NavLink>
                  <div className="rounded text-container">
                    {"Members: "}
                    {teamData.member_count}{" "}
                  </div>
                  {showRequestButtons ? (
                    <div
                      className={
                        "rounded " + (disabled ? "disabled-button" : "button")
                      }
                      onClickCapture={() => {
                        if (disabled) return;
                        if (canJoin) return JoinTeam(teamData.name);
                        CancelTeam(teamData.name);
                      }}
                    >
                      {teamData.id == userData?.requested_team_id
                        ? "Cancel Request"
                        : "Request To join"}
                    </div>
                  ) : null}
                  {/* <div
                    className={
                      "rounded " + (canJoin ? "button" : "disabled-button")
                    }
                    onClickCapture={() => {
                      if (canJoin) JoinTeam(teamData.name);
                    }}
                  ></div> */}
                </div>
              );
            })}
          </div>
        </div>
      </BodyContainer>
    </>
  );
}
