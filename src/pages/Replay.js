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
  const EMPTYREQUEST = null;
  const [apiData, setApiData] = React.useState(null);
  const [replayNotFound, setReplayNotFound] = React.useState(false);
  if (session_id === "random") {
    session_id = "@random";
  }
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
      <Timeline skimData={WhatApiRequest()} />
      {/* <CenterColumn userData={WhatApiRequest()} /> */}
      <Download session_id={session_id} />
    </ReplayBody>
  );
}
