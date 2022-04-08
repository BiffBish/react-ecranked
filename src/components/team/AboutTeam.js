/* eslint-disable */

import styled from "styled-components";
import React, { useState } from "react";

function timeDifference(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return "approximately " + Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return "approximately " + Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return "approximately " + Math.round(elapsed / msPerYear) + " years ago";
  }
}

const ContainerTitle = styled.div`
  font-size: 36px;
  font-weight: 400;
  margin: 10px 0px;
  text-align: center;
  flex: 0 0 100%;
  color: #fff;
`;

const AboutMeStyle = styled.div`
  padding: 10px;
  // margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  flex: 200px 2;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 10px;
`;

const EditTextButtonStyle = styled.div`
  color: #888;
  font-size: 10px;
`;
const EditButtonsStyle = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  background-color: #222;
  flex-wrap: wrap;
`;
const EditButtonStyle = styled.div`
  padding: 0px 10px;
  // margin: 20px 10px 20px;
  color: #aaa;
  font-size: 15px;
  cursor: pointer;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  background-color: #222;

  &:hover {
    background-color: #555;
    color: #000;
  }
`;
const AboutStringBox = ({ teamData, oculus_id }) => {
  var is_editable = false;
  if (oculus_id == null) {
    is_editable = false;
  }
  // eslint-disable-next-line
  if (oculus_id == parseInt(teamData["admin_id"])) {
    is_editable = true;
  }
  // eslint-disable-next-line
  if (localStorage.getItem("MODERATOR") == 1) {
    is_editable = true;
  }
  console.log(
    "[TEST] " +
      oculus_id +
      "   " +
      parseInt(teamData["admin_id"]) +
      "    " +
      is_editable
  );
  const updateIsEdit = (e, value = "null") => {};
  const [currentText, setCurrentText] = useState(teamData["description"]);
  const [editing, setEditing] = useState(false);

  const onClickSubmit = () => {
    if (currentText.length > 200) {
      alert("Too long please keep it under 200 characters");
      return;
    }

    const authToken = localStorage.getItem("AUTHORIZATION_TOKEN");

    const requestOptions = {
      method: "PUT",
      headers: { Authorization: authToken, "Content-Type": "application/json" },
      body: JSON.stringify({ description: currentText }),
    };
    console.log({ description: currentText });

    fetch(
      "https://ecranked.ddns.net/api/v1/team/" + teamData["id"],
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload(false);
      });
  };
  if (editing) {
    return (
      <>
        <textarea
          style={{
            backgroundColor: "transparent",
            // border: "none",
            outline: "none",
            color: "#fff",
            fontSize: "18px",
            padding: "8px",
            fontFamily: "Montserrat",
            flexGrow: 1,
            minWidth: "120px",
            // f: "Montserrat", sans-serif,
          }}
          type="textarea"
          name="userName"
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          onBlur={updateIsEdit}
        />
        <EditButtonsStyle>
          <div
            className="padded rounded button"
            onClick={() => {
              setEditing(false);
            }}
          >
            Discard
          </div>

          <EditButtonStyle onClick={onClickSubmit}>Save</EditButtonStyle>
        </EditButtonsStyle>
      </>
    );
  } else {
    if (is_editable) {
      if (teamData["description"] == null) {
        return (
          <>
            <EditButtonStyle
              style={{ color: "white" }}
              onClick={() => {
                setCurrentText(teamData["description"]);
                setEditing(true);
              }}
            >
              Click here to enter some text about yourself!
            </EditButtonStyle>
          </>
        );
      } else {
        return (
          <>
            <div style={{ whiteSpace: "pre-wrap" }}>
              {teamData["description"]}
            </div>
            <EditButtonStyle
              onClick={() => {
                setCurrentText(teamData["description"]);
                setEditing(true);
              }}
            >
              Edit
            </EditButtonStyle>
          </>
        );
      }
    } else {
      // if (oculus_id == null) {
      //   return (
      //     <>
      //       <div style={{ whiteSpace: "pre-wrap" }}>
      //         {userData["description"]}
      //       </div>
      //       <EditTextButtonStyle>
      //         This team doesn't have description set.
      //       </EditTextButtonStyle>
      //     </>
      //   );
      // } else {
      return (
        <>
          <div>{teamData["description"]}</div>
        </>
      );
      // }
    }
  }
};
const AvatarStyle = styled.img`
  // min-height: 100%;
  width: 100%;
  height: auto;
  min-width: 0;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  overflow: hidden;
`;
const SubmitButton = styled.button`
  padding: 0px 10px;
  // margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  &:hover {
    background-color: #555;
    color: #000;
  }
`;
const FileUploadButton = ({ userData }) => {
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append("image", selectedFile);

    fetch(
      "https://ecranked.ddns.net/api/v1/user/" +
        userData["oculus_id"] +
        "/avatar",
      {
        method: "POST",
        body: formData,
        headers: { Authorization: localStorage.getItem("AUTHORIZATION_TOKEN") },
      }
    )
      .then((response) => response.json())

      .then((result) => {
        console.log("Success:", result);
        window.location.reload(false);
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />

      <div>
        <SubmitButton onClick={handleSubmission}>Submit</SubmitButton>
      </div>
    </div>
  );
};
const ModeratorAvatarControls = ({ userData }) => {
  const onApprove = () => {
    fetch(
      "https://ecranked.ddns.net/api/v1/user/" +
        userData["oculus_id"] +
        "/avatar",
      {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approve: true }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload(false);
      });
  };
  const onRemove = () => {
    fetch(
      "https://ecranked.ddns.net/api/v1/user/" +
        userData["oculus_id"] +
        "/avatar",
      {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("AUTHORIZATION_TOKEN"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approve: false }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload(false);
      });
  };
  return (
    <EditButtonsStyle>
      <p style={{ width: "100%", textAlign: "center", margin: "0" }}>
        {" "}
        Moderator control's
      </p>
      <EditButtonStyle onClick={onRemove}>Remove</EditButtonStyle>

      {userData["avatar_pending"] ? (
        <EditButtonStyle onClick={onApprove}>Approve</EditButtonStyle>
      ) : (
        <></>
      )}
    </EditButtonsStyle>
  );
};
const AvatarControls = ({ moderator, userData, oculus_id }) => {
  // eslint-disable-next-line
  var ownPage = oculus_id == userData["oculus_id"];
  var avatar = userData["avatar"];
  // var pending = userData["avatar_pending"];
  return (
    <>
      {moderator && avatar ? (
        <ModeratorAvatarControls userData={userData} />
      ) : (
        <> </>
      )}
      <div>
        {ownPage && !avatar ? (
          <>
            <AvatarGuideText>
              Upload a picture of yourself in EchoVR! Requirements:
              <br />
              -Image is taken in EchoVR.
              <br />
              -Your chassis is visible.
              <br />
              <br /> The image wont be displayed on your page until its been
              approved by moderator.
            </AvatarGuideText>
            <div>
              <FileUploadButton userData={userData} />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
  // return <></>;
};
const AvatarGuideText = styled.p`
  font-size: 12px;
  color: rgb(170, 170, 170);
`;
const AvatarContainer = styled.div``;
const AboutAvatar = ({ userData, oculus_id }) => {
  var avatar = userData["avatar"];

  // var pending = userData["avatar_pending"];
  var isModerator = false;

  // eslint-disable-next-line
  if (localStorage.getItem("MODERATOR") == 1) {
    isModerator = true;
  }
  console.log(userData);
  if (avatar) {
    return (
      <>
        <AvatarContainer>
          <AvatarStyle src={avatar} />
        </AvatarContainer>

        {/* <EditButtonsStyle>
                  <EditButtonStyle
                    onClick={() => {
                      setEditing(false);
                    }}
                  >
                    Discard
                  </EditButtonStyle>
        
                  <EditButtonStyle onClick={onClickSubmit}>Save</EditButtonStyle>
                </EditButtonsStyle> */}
        <AvatarControls
          moderator={isModerator}
          userData={userData}
          oculus_id={oculus_id}
        />
      </>
    );
  } else {
    return (
      <>
        <AvatarControls
          moderator={isModerator}
          userData={userData}
          oculus_id={oculus_id}
        />
      </>
    );
  }
};

const TeamName = ({ allowEdit, requestedName }) => {
  // if (!allowEdit){

  return <div className="padded rounded button">Request team name change</div>;
  // }
};

export const AboutTeam = ({ teamData }) => {
  const oculus_id = localStorage.getItem("OCULUS_ID");
  var allowEdit = false;
  if (oculus_id == null) {
    allowEdit = false;
  }
  // eslint-disable-next-line
  if (oculus_id == parseInt(teamData["admin_id"])) {
    allowEdit = true;
  }
  // eslint-disable-next-line
  if (localStorage.getItem("MODERATOR") == 1) {
    allowEdit = true;
  }

  //allowEdit

  return (
    <AboutMeStyle>
      <div>
        <ContainerTitle>About Us</ContainerTitle>
      </div>
      <AboutStringBox teamData={teamData} oculus_id={oculus_id} />
      {/* <AboutAvatar userData={teamData} oculus_id={oculus_id} /> */}
      <footer>
        Joined{" "}
        {teamData.join_date < 1633061708
          ? "before ECRanked launched"
          : timeDifference(Date.now(), teamData.join_date * 1000)}
      </footer>
      <TeamName />
    </AboutMeStyle>
  );
};
