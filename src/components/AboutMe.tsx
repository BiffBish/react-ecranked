import styled from "styled-components";
import React, { useState } from "react";
import { useMe, User } from "@ecranked/api";

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
interface AboutStringBoxProps {
  user: User | null
}
const AboutStringBox = ({ user }: AboutStringBoxProps) => {
  const { me } = useMe();

  var is_editable = false;
  if (me == null) {
    is_editable = false;
  } else if (me?.oculus_id === user?.oculus_id) {
    is_editable = true;
  }
  if (me?.moderator) {
    is_editable = true;
  }


  const [currentText, setCurrentText] = useState<string>(user?.about_string ?? "");

  const [isEditing, setIsEditing] = useState(false);


  const onClickSubmit = async () => {
    if (currentText.length > 200) {
      return;
    }
    await user?.setAboutString(currentText);
    setIsEditing(false);
  };

  if (isEditing) {
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
          // type="textarea"
          name="userName"
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
        />
        <EditButtonsStyle>
          <EditButtonStyle
            onClick={() => {
              setIsEditing(false);
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
      if (user?.about_string == null) {
        return (
          <>
            <EditButtonStyle
              style={{ color: "white" }}
              onClick={() => {
                setCurrentText(user?.about_string ?? "");
                setIsEditing(true);
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
              {user?.about_string}
            </div>
            <EditButtonStyle
              onClick={() => {
                setCurrentText(user?.about_string ?? "");
                setIsEditing(true);
              }}
            >
              Edit
            </EditButtonStyle>
          </>
        );
      }
    } else {
      if (me == null) {
        return (
          <>
            <div style={{ whiteSpace: "pre-wrap" }}>
              {user?.about_string}
            </div>
            <EditTextButtonStyle>
              Login to change your aboutMe
            </EditTextButtonStyle>
          </>
        );
      } else {
        return (
          <>
            <div>{user?.about_string}</div>
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
interface FileUploadButtonProps {
  user: User | null
}
const FileUploadButton = ({ user }: FileUploadButtonProps) => {
  // return (
  //   <div>
  //     Disabled Temporaralily
  //   </div>
  // );




  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event?.target?.files?.[0] ?? null);
  };

  const handleSubmission = () => {
    if (!selectedFile) return
    if (!user) return

    user.setAvatar(selectedFile).then(() => {
      setSelectedFile(null);
    });

    // makeApiCall(
    //   "v1/user/" + user["oculus_id"] + "/avatar",
    //   "POST",
    //   {},
    //   formData
    // )
    //   .then((result) => {
    //     console.log("Success:", result.json);
    //     window.location.reload(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
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
interface ModeratorAvatarControlsProps {
  user: User | null
}
const ModeratorAvatarControls = ({ user }: ModeratorAvatarControlsProps) => {

  const onApprove = async () => {
    try {
      user?.approveAvatar();
    } catch (e) {
      console.log(e);
    }
  };
  const onRemove = async () => {
    try {
      user?.removeAvatar();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <EditButtonsStyle>
      <p style={{ width: "100%", textAlign: "center", margin: "0" }}>
        {" "}
        Moderator control's
      </p>
      <EditButtonStyle onClick={onRemove}>Remove</EditButtonStyle>

      {!user?.avatar_approved ? (
        <EditButtonStyle onClick={onApprove}>Approve</EditButtonStyle>
      ) : (
        <></>
      )}
    </EditButtonsStyle>
  );
};


interface AvatarControlsProps {
  user: User | null
}
const AvatarControls = ({ user }: AvatarControlsProps) => {

  const { me } = useMe()

  // eslint-disable-next-line
  var ownPage = false;
  if (me !== null && user !== null) {
    ownPage = (me.oculus_id === user.oculus_id);
  }
  if (me === null || user === null) {
    ownPage = false;
  }

  var avatar = user?.avatar;




  // var pending = userData["avatar_pending"];
  return (
    <>
      {me?.moderator && avatar ? (
        <ModeratorAvatarControls user={user} />
      ) : (
        <> </>
      )}
      <div>
        {avatar && !user?.avatar_approved ? (
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
              <FileUploadButton user={user} />
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
              <FileUploadButton user={user} />
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

interface AboutAvatarProps {
  user: User | null
}
const AboutAvatar = ({ user }: AboutAvatarProps) => {
  var avatar = user?.avatar

  // var pending = userData["avatar_pending"];

  console.log("User Data updated", user?.avatar)
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
          user={user}
        />
      </>
    );
  } else {
    return (
      <>
        <AvatarControls
          user={user}
        />
      </>
    );
  }
};

function timeDifference(current: number, previous: number) {
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

interface AboutMeProps {
  user: User | null
}
export const AboutMe = ({ user }: AboutMeProps) => {
  // var iconSrc = null;
  return (
    <AboutMeStyle>
      <div>
        <ContainerTitle>About Me</ContainerTitle>
      </div>
      <AboutStringBox user={user} />
      <AboutAvatar user={user} />
      <footer>
        Joined{" "}
        {
          !user ?
            <></> :
            user.join_date ?? 0 < 1633061708
              ? "before ECRanked launched"
              : timeDifference(Date.now(), user.join_date ?? 0 * 1000)}
      </footer>
    </AboutMeStyle>
  );
};
