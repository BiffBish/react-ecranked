import styled from "styled-components";

import React, { useEffect } from "react";
import { Download } from "../components/Download";
import { Timeline } from "../components/Timeline";

const ReplayBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    overflow: hidden;
    transition-duration: 1s;
    opacity: 100%
    transition-property: height margin opacity;
  `;

export default function Replay({ session_id }) {
  const EMPTYREQUEST = {
    frames: 9462,
    start_time: "2021-09-21 23:57:38.43",
    end_time: "2021-09-22 00:12:27.43",
    match_length: 888,
    framerate: 10.655405405405405,
    map: "dyson",
    players: [],
    session_id: session_id,
  };
  const [apiData, setApiData] = React.useState(null);
  const [replayNotFound, setReplayNotFound] = React.useState(false);
  useEffect(() => {
    fetch("https://ecranked.ddns.net/api/v1/replay/" + session_id)
      .then(async (response) => {
        console.log("finding api data");
        const data = await response.json();
        console.log("code:" + response.statusCode);
        if (response.status === 404) {
          console.error("Replay Not Found!");
          setReplayNotFound(true);
        } else {
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          setApiData(data);
          setReplayNotFound(false);
        }
      })
      .catch((error) => {
        setReplayNotFound(true);
        console.error("There was an error!", error);
      });
  }, [session_id]);

  function WhatApiRequest() {
    console.log("WhatApiRequest", apiData);
    if (replayNotFound) {
      return EMPTYREQUEST;
    }
    if (apiData) {
      return apiData;
    }

    return EMPTYREQUEST;
  }

  console.log("APIDATA2", WhatApiRequest());
  return (
    <ReplayBody
      style={
        replayNotFound ? { height: "0px", margin: "0px", opacity: "0%" } : {}
      }
    >
      <Timeline
        users={WhatApiRequest()["players"]}
        skimData={WhatApiRequest()}
      />
      {/* <CenterColumn userData={WhatApiRequest()} /> */}
      <Download session_id={session_id} />
    </ReplayBody>
  );
}
