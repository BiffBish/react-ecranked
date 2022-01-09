import styled, { keyframes } from "styled-components";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment-timezone";
const ContainerTitle = styled.div`
  font-size: 36px;
  font-weight: 400;
  margin: 10px 0px;
  text-align: center;
  flex: 0 0 100%;
  color: #fff;
  flex-grow: 0;
`;
const RecentGameFadeIN = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;
const RecentGameStyle = styled.div`
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
  animation: ${RecentGameFadeIN} 0.2s;
`;
const RecentGamesStyle = styled.div`
  padding: 10px 10px 0px;
  margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid white;
  border-radius: 10px;
  flex: 200px 2;
`;
export const RecentGames = ({ replays }) => {
  const [replayList, setReplayList] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function loadInReplayAnimation(replays) {
      var AnimationList = [];
      for (const replay of replays) {
        AnimationList.push(replay);
        setReplayList([...AnimationList]);
        await delay(20);
      }
    }
    loadInReplayAnimation(replays);
  }, [replays]);

  let history = useHistory();
  function recentGameClick(session_id) {
    history.push("/replay/" + session_id);
  }

  return (
    <RecentGamesStyle>
      <ContainerTitle>Replays</ContainerTitle>
      {replayList.map((replay) => {
        const LocalGameTime = moment.unix(replay["start_time"]); // Assumes seconds.  Defaults to local time
        const UtcGameTime = moment.unix(replay["start_time"]).utc(); // Must be separate object b/c utc() just sets a flag
        const UtcNow = moment.utc();
        const dateDiffrence = UtcGameTime.diff(UtcNow, "d");
        const hourDiffrence = UtcGameTime.diff(UtcNow, "h");

        var TimeString = "";

        if (dateDiffrence === 0) {
          TimeString = `${-hourDiffrence}h ago`;
        }
        if (dateDiffrence < 0) {
          TimeString = `${-dateDiffrence} days ago`;
        }
        const OnGameClick = () => {
          recentGameClick(replay["session_id"]);
        };
        return (
          <RecentGameStyle
            key={replay["session_id"]}
            onClick={OnGameClick}
            style={{ opacity: 1 }}
          >
            <p style={{ margin: 0 }}>
              {"{" +
                TimeString +
                "}" +
                "[" +
                moment(LocalGameTime).format("MMM DD LTS") + //+
                "] - " +
                replay["map"].charAt(0).toUpperCase() +
                replay["map"].slice(1)}
            </p>
          </RecentGameStyle>
        );
      })}
    </RecentGamesStyle>
  );
};
