import styled from "styled-components";
import React, { useState } from "react";
import { makeApiCall } from "../helpers/api/index";

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
const AboutStringBox = ({ userData, oculus_id }) => {
  var is_editable = false;
  if (oculus_id == null) {
    is_editable = false;
  }
  // eslint-disable-next-line
  if (oculus_id == parseInt(userData["oculus_id"])) {
    is_editable = true;
  }
  // eslint-disable-next-line
  if (localStorage.getItem("MODERATOR") == 1) {
    is_editable = true;
  }

  const updateIsEdit = (e, value = "null") => {};
  const [currentText, setCurrentText] = useState(userData["about_string"]);
  const [editing, setEditing] = useState(false);

  const onClickSubmit = () => {
    if (currentText.length > 200) {
      return;
    }

    //Unusual is not a cutie
    makeApiCall("v1/user/" + userData["oculus_id"], "PUT", {
      about_string: currentText,
    }).then((_) => {
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
          <EditButtonStyle
            onClick={() => {
              setEditing(false);
            }}
          >
            Discard
          </EditButtonStyle>

          <EditButtonStyle onClick={onClickSubmit}>Save</EditButtonStyle>
        </EditButtonsStyle>
      </>
    );
  } else {
    if (is_editable) {
      if (userData["about_string"] == null) {
        return (
          <>
            <EditButtonStyle
              style={{ color: "white" }}
              onClick={() => {
                setCurrentText(userData["about_string"]);
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
              {userData["about_string"]}
            </div>
            <EditButtonStyle
              onClick={() => {
                setCurrentText(userData["about_string"]);
                setEditing(true);
              }}
            >
              Edit
            </EditButtonStyle>
          </>
        );
      }
    } else {
      if (oculus_id == null) {
        return (
          <>
            <div style={{ whiteSpace: "pre-wrap" }}>
              {userData["about_string"]}
            </div>
            <EditTextButtonStyle>
              Login to change your aboutMe
            </EditTextButtonStyle>
          </>
        );
      } else {
        return (
          <>
            <div>{userData["about_string"]}</div>
          </>
        );
      }
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

    makeApiCall("v1/user/" + userData["oculus_id"], "PUT", {}, formData)
      .then((result) => {
        console.log("Success:", result.json);
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
    makeApiCall("v1/user/" + userData["oculus_id"] + "/avatar", "PUT", {
      approved: true,
    }).then((_) => {
      window.location.reload(false);
    });
  };
  const onRemove = () => {
    makeApiCall("v1/user/" + userData["oculus_id"] + "/avatar", "PUT", {
      approved: false,
    }).then((_) => {
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
        {avatar && userData["avatar_pending"] ? (
          <>
            <AvatarGuideText>
              Your picture is currently pending approval by a moderator. It is
              currently not public and cannot be seen by anyone else. Please
              contact a moderator if the image is pending for an extended period
              of time.
            </AvatarGuideText>
          </>
        ) : (
          <></>
        )}
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
        {ownPage && avatar ? (
          <>
            <AvatarGuideText>
              Replace your chassis picture with a new one. the new image will
              still be pending until a moderator approves of it
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
export const AboutMe = ({ userData }) => {
  const oculus_id = localStorage.getItem("OCULUS_ID");
  // var iconSrc = null;
  return (
    <AboutMeStyle>
      <div>
        <ContainerTitle>About Me</ContainerTitle>
      </div>
      <AboutStringBox userData={userData} oculus_id={oculus_id} />
      <AboutAvatar userData={userData} oculus_id={oculus_id} />
      <footer>
        Joined{" "}
        {userData.join_date < 1633061708
          ? "before ECRanked launched"
          : timeDifference(Date.now(), userData.join_date * 1000)}
      </footer>
    </AboutMeStyle>
  );
};
