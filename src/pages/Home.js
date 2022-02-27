/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import moment from "moment-timezone";
import { NavLink } from "react-router-dom";
import Chart from "react-google-charts";
var funFacts = require("../components/FunFacts.json");

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
  flex-wrap: wrap-reverse;
`;
const AboutContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 300px 2;
  flex-direction: row;
  gap: 20px;
`;
const AboutPage = styled.div`
  flex: 100px 2;
  background-color: #222;
  color: white;
  border: 2px solid white;
  border-radius: 10px;
  padding: 20px;
`;
const AboutPageButton = styled.div`
  flex: 100px 2;
  background-color: #222;
  color: white;
  border: 2px solid white;
  border-radius: 10px;
  padding: 20px;
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
const ContributorLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-size: 30px;
`;
// const histogramData = [["dates"]];
const chartOptions = {
  chartArea: { width: "90%", height: "65%" },
  backgroundColor: { fill: "transparent" },
  legend: "none",
  // legend: { position: "none" },
  bar: { groupWidth: "100%" },
  hAxis: {
    textStyle: { color: "#FFF" },
    baselineColor: "#FFF",
  },
  vAxis: {
    textStyle: { color: "#FFF" },
    baselineColor: "#FFF",
  },
  titleTextStyle: { color: "#FFF" },

  // histogram: {
  //   bucketSize: 60 * 60 * 24,
  //   // minValue: -1,
  //   // maxValue: 1,
  // },
};
const RecentGames = ({ replays }) => {
  const [replayAnimationIndex, setReplayAnimationIndex] = useState(0);
  const [funFactIndex, setFunFactIndex] = useState(
    Math.floor(Math.random() * funFacts.length)
  );

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    setReplayAnimationIndex(0);
    async function loadInReplayAnimation(replays) {
      for (let index = 0; index < replays.length; index++) {
        setReplayAnimationIndex((prev) => prev + 1);
        await delay(20);
      }
    }
    loadInReplayAnimation(replays);
  }, [replays]);

  let history = useHistory();
  function recentGameClick(session_id) {
    history.push("/replay/" + session_id);
  }
  const [replayTimestamps, setReplayTimestamps] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [replayData, setReplayData] = useState([]);

  useEffect(() => {
    fetch("https://ecranked.ddns.net/api/v1/replay/@timestamps")
      .then((response) => response.json())
      .then((data) => {
        SortReplayDataToBins(data, setReplayTimestamps, 93);
      });
  }, []);
  useEffect(() => {
    fetch("https://ecranked.ddns.net/api/v1/replay/@all")
      .then((response) => response.json())
      .then((data) => {
        setReplayData(data);
      });
  }, []);
  useEffect(() => {
    if (localStorage.getItem("MODERATOR") === "1") {
      fetch("https://ecranked.ddns.net/api/v1/user/@joins", {
        headers: { authorization: localStorage.getItem("AUTHORIZATION_TOKEN") },
      })
        .then((response) => response.json())
        .then((data) => {
          SortDataToBins(data, setNewUsers, 93);
        })
        .catch(() => {});
    }
  }, []);
  return (
    <PageContainer>
      <RecentGamesStyle>
        <ContainerTitle>Recent Games</ContainerTitle>
        {replays.map((replay, index) => {
          if (index > replayAnimationIndex) {
            return null;
          }
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
                  replay["map"].charAt(0).toUpperCase() +
                  replay["map"].slice(1)}
              </p>
            </RecentGameStyle>
          );
        })}
      </RecentGamesStyle>
      <AboutContainer>
        <AboutPage style={{ minWidth: "1000px" }}>
          <ContainerTitle>Graphs</ContainerTitle>
          <div style={{ position: "relative", height: "200px" }}>
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: "0",
                left: "0",
              }}
            >
              <Chart
                width={"100%"}
                height={"100%"}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  [
                    "Date",
                    "Combustion Games",
                    { role: "style" },
                    "Dyson Games",
                    { role: "style" },
                    "Fission Games",
                    { role: "style" },
                    "Surge Games",
                    { role: "style" },
                    { label: "Total", type: "number" },
                    { role: "annotation" },
                  ],
                  ...replayTimestamps,
                ]}
                options={{
                  ...chartOptions,
                  title: "Quarterly game review!",
                  isStacked: true,
                  series: {
                    4: {
                      annotations: {
                        stem: {
                          color: "transparent",
                          length: 0,
                        },
                        textStyle: {
                          color: "#fff",
                          fontSize: 10,
                        },
                      },
                      enableInteractivity: false,
                      tooltip: "none",
                      visibleInLegend: false,
                    },
                  },
                }}
                rootProps={{ "data-testid": "5" }}
              />
            </div>
          </div>
          {localStorage.getItem("MODERATOR") === "1" ? (
            <div style={{ position: "relative", height: "200px" }}>
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: "0",
                  left: "0",
                }}
              >
                <Chart
                  width={"100%"}
                  height={"100%"}
                  chartType="ColumnChart"
                  loader={<div>Loading Chart</div>}
                  data={[["Date", "Users", { role: "style" }], ...newUsers]}
                  options={{
                    ...chartOptions,
                    title: "Joins per day! (moderator only)",
                  }}
                  // rootProps={{ "data-testid": "5" }}
                />
              </div>
            </div>
          ) : null}
          {/* <div>
            <Chart
              width={"100%"}
              height={"100%"}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={[["Date", "New Users", { role: "style" }], ...newUsers]}
              options={{ ...chartOptions, title: "Quarterly new user review!" }}
              rootProps={{ "data-testid": "5" }}
            />
          </div> */}
        </AboutPage>
      </AboutContainer>
      <AboutContainer>
        <AboutPageButton
          style={{ minWidth: "80%" }}
          onClick={() => {
            history.push("/leaderboard/loadout/random");
          }}
        >
          <ContainerTitle>Click here to get a random Loadout!</ContainerTitle>
        </AboutPageButton>

        <AboutPage style={{ minWidth: "500px" }}>
          <ContainerTitle>About Us</ContainerTitle>
          We are a collection of passionate Echo Combat Players who thrive to
          build a strong and close community. We've built numerous bots and
          tools to assist both our casual and competitive players to both have
          fun, but also learn and build upon their playstyle.
          <br />
          <br />
          ECRanked is a piece of software that gathers RAW data through the Echo
          Combat API. We then collate and simplify this data into more readable
          data used for player statistics (& more coming soon) for our Echo
          Combat community.
          <br />
          <br />
          If you've played Echo Combat. Feel free to search for your Oculus
          Username above to learn more. Pew pew!
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
        <AboutPage>
          <ContainerTitle>Fun Fact!</ContainerTitle>
          {funFacts[funFactIndex]}
          {/* The combat community as a whole has traveled over{" "}
          {Math.round(
            ((18302.751128 * (replayData?.[0]?.total ?? 0)) / 1000) * 100
          ) / 100}{" "}
          kilometers while playing echo combat! Thats{" "}
          {Math.round(
            ((18302.751128 * (replayData?.[0]?.total ?? 0)) / 1000 / 40075) * 10
          ) / 10}{" "}
          times around the earth. */}
        </AboutPage>
      </AboutContainer>
    </PageContainer>
  );
};

function SortDataToBins(data, setReplayTimestamps, NumOfDays) {
  var todayDateTime = Math.round(Date.now() / 1000);
  let newList = [];
  // const NumOfDays = 93;
  const cutOffTime = todayDateTime - 60 * 60 * 24 * NumOfDays;
  const Offset = 41092;
  for (let index = 0; index < NumOfDays + 1; index++) {
    const dateObject = new Date(
      (cutOffTime + index * 60 * 60 * 24 + Offset) * 1000 - 86400000
    );
    var humanDateYear = dateObject
      .toLocaleString("en-US", {
        // weekday: "long",
        year: "numeric",
        // hour: undefined,
        // minute: undefined,
        // second: undefined,
      })
      .slice(2, 4);

    var humanDateFormat =
      dateObject.toLocaleString("en-US", {
        // weekday: "long",
        month: "numeric",
        day: "numeric",
        // hour: undefined,
        // minute: undefined,
        // second: undefined,
      }) +
      "/" +
      humanDateYear;

    // humanDateFormat = humanDateFormat.slice(0, humanDateFormat.length - 2);
    // const humanDateFormat = cutOffTime + index * 60 * 60 * 24;
    if (index === NumOfDays) {
      newList.push([
        humanDateFormat,
        0,
        "stroke-color: #f00; stroke-opacity: 1; stroke-width: 2; fill-color: #f00; fill-opacity: .1",
      ]);
    }
    newList.push([
      humanDateFormat,
      0,
      "stroke-color: #fff; stroke-opacity: 1; stroke-width: 2; fill-color: #fff; fill-opacity: .1",
    ]);
  }
  // newList.push([currentElement]);
  data.forEach(function (currentElement) {
    if (currentElement > cutOffTime) {
      // console.log(cutOffTime);
      // console.log(currentElement);
      var DateTimeN = Math.floor(
        (currentElement - cutOffTime + Offset) / (60 * 60 * 24)
      );
      // console.log(DateTimeN);
      newList[DateTimeN][1] += 1;
    }
  });
  console.log(newList);
  setReplayTimestamps(newList);
  // return newList;
}

function SortReplayDataToBins(data, setReplayTimestamps, NumOfDays) {
  var todayDateTime = Math.round(Date.now() / 1000);
  let newList = [];
  // const NumOfDays = 93;
  const cutOffTime = todayDateTime - 60 * 60 * 24 * NumOfDays;
  const Offset = 41092;
  for (let index = 0; index < NumOfDays + 1; index++) {
    const dateObject = new Date(
      (cutOffTime + index * 60 * 60 * 24 + Offset) * 1000 - 86400000
    );
    var humanDateYear = dateObject
      .toLocaleString("en-US", {
        // weekday: "long",
        year: "numeric",
        // hour: undefined,
        // minute: undefined,
        // second: undefined,
      })
      .slice(2, 4);

    var humanDateFormat =
      dateObject.toLocaleString("en-US", {
        // weekday: "long",
        month: "numeric",
        day: "numeric",
        // hour: undefined,
        // minute: undefined,
        // second: undefined,
      }) +
      "/" +
      humanDateYear;

    // humanDateFormat = humanDateFormat.slice(0, humanDateFormat.length - 2);
    // const humanDateFormat = cutOffTime + index * 60 * 60 * 24;
    if (index === NumOfDays) {
      newList.push([
        humanDateFormat,
        0,
        "stroke-color: #f00; stroke-opacity: 1; stroke-width: 1; fill-color: #0932EC ; fill-opacity: 1",
        0,
        "stroke-color: #f00; stroke-opacity: 1; stroke-width: 1; fill-color: #F56600; fill-opacity: 1",
        0,
        "stroke-color: #f00; stroke-opacity: 1; stroke-width: 1; fill-color: #ED31B8 ; fill-opacity: 1",
        0,
        "stroke-color: #f00; stroke-opacity: 1; stroke-width: 1; fill-color: #12F840 ; fill-opacity: 1",
        0,
        0,
      ]);
    }
    newList.push([
      humanDateFormat,
      0,
      "stroke-color: #fff; stroke-opacity: 1; stroke-width: 1; fill-color: #0932EC; fill-opacity: 1",

      0,
      "stroke-color: #fff; stroke-opacity: 1; stroke-width: 1; fill-color: #F56600; fill-opacity: 1",

      0,
      "stroke-color: #fff; stroke-opacity: 1; stroke-width: 1; fill-color: #ED31B8; fill-opacity: 1",

      0,
      "stroke-color: #fff; stroke-opacity: 1; stroke-width: 1; fill-color: #12F840; fill-opacity: 1",
      0,
      0,
    ]);
  }
  // newList.push([currentElement]);
  var timestamp = 0;

  data.forEach(function (currentElement) {
    timestamp = currentElement["start_time"];

    if (timestamp > cutOffTime) {
      // console.log(cutOffTime);
      // console.log(currentElement);
      var DateTimeN = Math.floor(
        (timestamp - cutOffTime + Offset) / (60 * 60 * 24)
      );
      var mapPos = 0;
      switch (currentElement["map"]) {
        case "combustion":
          mapPos = 1;
          break;
        case "dyson":
          mapPos = 5;
          break;
        case "fission":
          mapPos = 3;
          break;
        case "surge":
          mapPos = 7;
          break;
        default:
          break;
      }
      // console.log(DateTimeN);
      newList[DateTimeN][mapPos] += 1;
      newList[DateTimeN][10] += 1;
    }
  });
  console.log(newList);
  setReplayTimestamps(newList);
}

export default function Home({ replays }) {
  return <RecentGames replays={replays} />;
}
