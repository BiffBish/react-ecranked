import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import moment from "moment-timezone";
import { NavLink } from "react-router-dom";

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
  border: 2px solid white;
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
  margin: auto;
  background-color: #222;
  color: white;
  border: 2px solid white;
  border-radius: 10px;
  width: 50%;
  flex: 300px 2;
`;

const ContainerTitle = styled.h2`
  font-size: 36px;
  font-weight: 400;
  margin: 10px 0px;
  text-align: center;
  flex: 0 0 100%;
  color: #fff;
`;
const PageContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
`;
const AboutContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 300px 2;
  flex-direction: row;
  gap: 20px;
`;
const AboutPage = styled.div`
  flex: 300px 2;
  background-color: #222;
  color: white;
  border: 2px solid white;
  border-radius: 10px;
  padding: 20px;
`;
const ContributorLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-size: 30px;
`;
const RecentGames = ({ replays }) => {
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
    <PageContainer>
      <AboutContainer>
        <AboutPage>
          <ContainerTitle>About Us</ContainerTitle>
          We are a collection of passionate Echo Combat Players that thrives to
          build a strong and close community. We've built numerous bots and
          tools to assist both our casual and competitive players to both have
          fun, but also learn and build upon their play style.
          <br />
          <br />
          ECRanked is a piece of software that gather RAW data through the Echo
          Combat API. We then collate and simplified this data into more
          readable data, which we use for player statistics (& more coming soon)
          for our Echo Combat community.
          <br />
          <br />
          If you've played Echo Combat. Feel free to search for your Oculus
          Username above to learn more.
        </AboutPage>
        <AboutPage style={{ fontSize: "20px", fontWeight: "100" }}>
          <ContainerTitle>Collaborators</ContainerTitle>
          <ContributorLink to={"/user/BiffBish/stats"}>
            BiffBish
          </ContributorLink>
          - Head creator
          <br />
          <ContributorLink to={"/user/rev2600/stats"}>rev2600</ContributorLink>
          - Contributor
          <br />
          <ContributorLink to={"/user/Vibinator/stats"}>
            Vibinator
          </ContributorLink>
          - Hosting and Support
          <br />
          <ContributorLink to={"/user/codasleuth/stats"}>
            codasleuth
          </ContributorLink>
          - Moderator and Creative control
          <br />
        </AboutPage>
      </AboutContainer>
      <RecentGamesStyle>
        <ContainerTitle>Recent Games</ContainerTitle>
        {replayList.map((replay) => {
          const LocalGameTime = moment.unix(replay["start_time"]); // Assumes seconds.  Defaults to local time
          const UtcGameTime = moment.unix(replay["start_time"]).utc(); // Must be separate object b/c utc() just sets a flag
          const UtcNow = moment.utc();
          const dateDiff = UtcNow.diff(UtcGameTime, "d");
          const hourDiff = UtcNow.diff(UtcGameTime, "h");
          const minuteDiff = UtcNow.diff(UtcGameTime, "m");

          var TimeString = "";

          if (dateDiff > 0) {
            TimeString = `${dateDiff} days ago`;
          } else if (hourDiff > 0) {
            TimeString = `${hourDiff}h ago`;
          } else if (minuteDiff > 0) {
            TimeString = `${minuteDiff}m ago`;
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
                  replay["map"]}
              </p>
            </RecentGameStyle>
          );
        })}
      </RecentGamesStyle>
    </PageContainer>
  );
};

export default function Home({ replays }) {
  return <RecentGames replays={replays} />;
}
