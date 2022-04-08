import styled from "styled-components";
import React, { useState } from "react";

const ContainerTitle = styled.h2`
  font-size: 36px;
  font-weight: 400;
  margin: 10px 0px;
  text-align: center;
  flex: 0 0 100%;
  color: #fff;
`;
const LeftBar = styled.div`
  padding: 10px 10px 0px;
  margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 2px solid transparent;
  border-radius: 10px;
  flex: 100px 2;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;
const DownloadContainerStyle = styled.div`
  padding: 10px 10px 0px;
  margin: -12px -12px 0px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  cursor: pointer;
  flex-grow: 0;
  height: 80px;
  transition-duration: 0.5s;
  transition-property: height;
  overflow: hidden;
`;
const DownloadRatelimitStyle = styled.p`
  padding: 0px;
  margin: 0px;
  height: 60px;
  overflow: hidden;
  transition-duration: 0.5f;
  transition-property: transparency height;
`;
export const Download = ({ session_id }) => {
  const [isRateLimit, setIsRateLimit] = useState(false);
  const [rateLimitTime, setRateLimitTime] = useState(0);

  const onButtonClick = () => {
    fetch(
      "https://ecranked.ddns.net/api/v1/replay/" + session_id + "/trydownload"
    )
      .then(async (response) => {
        const data = await response.json();
        console.log("data", data);
        console.log("code:", response.status);
        if (response.status === 429) {
          console.error("RateLimit!");
          setIsRateLimit(true);
          setRateLimitTime(data["ratelimit"]);
        } else {
          setIsRateLimit(false);
          window.location.assign(
            "https://ecranked.ddns.net/api/v1/replay/" +
              session_id +
              "/download"
          );
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
        }
      })
      .catch((error) => {
        setIsRateLimit(true);
        console.error("There was an error!", error);
      });

    // //ecranked.ddns.net/replay/91915B74-295B-4B06-AA18-A1440BD1A4E6/trydownload
    // https: window.location.assign(
    //   "https://ecranked.ddns.net/replay/" + session_id + "/download"
    // );
  };
  const onViewReplayButtonClick = () => {
    window.location.assign(
      "https://replayviewer.ecranked.com/#replay=" + session_id
    );
  };
  return (
    <LeftBar>
      <DownloadContainerStyle
        onClick={onButtonClick}
        style={isRateLimit ? { height: "100px" } : { height: "80px" }}
      >
        <ContainerTitle>Download</ContainerTitle>
        <DownloadRatelimitStyle
          style={isRateLimit ? { height: "60px" } : { height: "0px" }}
        >
          please wait {rateLimitTime} seconds
        </DownloadRatelimitStyle>
      </DownloadContainerStyle>
      <DownloadContainerStyle
        onClick={onViewReplayButtonClick}
        style={{ height: "45px", padding: "0px" }}
      >
        <ContainerTitle style={{ fontSize: "30px", margin: "0px" }}>
          [Beta] View Replay
        </ContainerTitle>
        <DownloadRatelimitStyle
          style={isRateLimit ? { height: "60px" } : { height: "0px" }}
        >
          please wait {rateLimitTime} seconds
        </DownloadRatelimitStyle>
      </DownloadContainerStyle>
    </LeftBar>
  );
};
