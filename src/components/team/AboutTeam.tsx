/* eslint-disable */

import styled from "styled-components";
import React, { useState } from "react";
import { Team, useMe } from "@ecranked/api";

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
  team: Team | null
}
const AboutStringBox = ({ team }: AboutStringBoxProps) => {
  const { me } = useMe();
  var is_editable = false;
  if (me) {
    is_editable = me.oculus_id === team?.admin_id;
  }
  if (me?.moderator) {
    is_editable = true;
  }


  const [currentText, setCurrentText] = useState(team?.description);
  const [editing, setEditing] = useState(false);

  const onClickSubmit = () => {
    if (currentText == null) {
      return;
    }

    if ((currentText?.length ?? 0) > 200) {
      alert("Too long please keep it under 200 characters");
      return;
    }

    team?.setDescription(currentText).then(() => {
      setEditing(false);
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
          name="userName"
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
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
      if (team?.description == null) {
        return (
          <>
            <EditButtonStyle
              style={{ color: "white" }}
              onClick={() => {
                setCurrentText(team?.description);
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
              {team.description}
            </div>
            <EditButtonStyle
              onClick={() => {
                setCurrentText(team.description);
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
          <div>{team?.description}</div>
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

// const FileUploadButton = ({ userData }) => {
//   const [selectedFile, setSelectedFile] = useState();

//   const changeHandler = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleSubmission = () => {
//     const formData = new FormData();

//     formData.append("image", selectedFile);
//     makeApiCall(
//       "v1/user/" + userData.oculus_id + "/avatar",
//       "POST",
//       {},
//       formData
//     )
//       .then((result) => {
//         console.log("Success:", result.json);
//         window.location.reload(false);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   return (
//     <div>
//       <input type="file" name="file" onChange={changeHandler} />

//       <div>
//         <SubmitButton onClick={handleSubmission}>Submit</SubmitButton>
//       </div>
//     </div>
//   );
// };
// const ModeratorAvatarControls = ({ userData }) => {
//   const onApprove = () => {
//     makeApiCall("v1/user/" + userData["oculus_id"] + "/avatar", "PUT", {
//       approve: true,
//     }).then((_) => {
//       window.location.reload(false);
//     });
//   };
//   const onRemove = () => {
//     makeApiCall("v1/user/" + userData["oculus_id"] + "/avatar", "PUT", {
//       approve: false,
//     }).then((_) => {
//       window.location.reload(false);
//     });
//   };
//   return (
//     <EditButtonsStyle>
//       <p style={{ width: "100%", textAlign: "center", margin: "0" }}>
//         {" "}
//         Moderator control's
//       </p>
//       <EditButtonStyle onClick={onRemove}>Remove</EditButtonStyle>

//       {userData["avatar_pending"] ? (
//         <EditButtonStyle onClick={onApprove}>Approve</EditButtonStyle>
//       ) : (
//         <></>
//       )}
//     </EditButtonsStyle>
//   );
// };
// const AvatarControls = ({ moderator, userData, oculus_id }) => {
//   // eslint-disable-next-line
//   var ownPage = oculus_id == userData["oculus_id"];
//   var avatar = userData["avatar"];
//   // var pending = userData["avatar_pending"];
//   return (
//     <>
//       {moderator && avatar ? (
//         <ModeratorAvatarControls userData={userData} />
//       ) : (
//         <> </>
//       )}
//       <div>
//         {ownPage && !avatar ? (
//           <>
//             <AvatarGuideText>
//               Upload a picture of yourself in EchoVR! Requirements:
//               <br />
//               -Image is taken in EchoVR.
//               <br />
//               -Your chassis is visible.
//               <br />
//               <br /> The image wont be displayed on your page until its been
//               approved by moderator.
//             </AvatarGuideText>
//             <div>
//               <FileUploadButton userData={userData} />
//             </div>
//           </>
//         ) : (
//           <></>
//         )}
//       </div>
//     </>
//   );
//   // return <></>;
// };
const AvatarGuideText = styled.p`
  font-size: 12px;
  color: rgb(170, 170, 170);
`;
const AvatarContainer = styled.div``;
// const AboutAvatar = ({ userData, oculus_id }) => {
//   var avatar = userData["avatar"];

//   // var pending = userData["avatar_pending"];
//   var isModerator = false;

//   // eslint-disable-next-line
//   if (localStorage.getItem("MODERATOR") == 1) {
//     isModerator = true;
//   }
//   console.log(userData);
//   if (avatar) {
//     return (
//       <>
//         <AvatarContainer>
//           <AvatarStyle src={avatar} />
//         </AvatarContainer>

//         {/* <EditButtonsStyle>
//                   <EditButtonStyle
//                     onClick={() => {
//                       setEditing(false);
//                     }}
//                   >
//                     Discard
//                   </EditButtonStyle>

//                   <EditButtonStyle onClick={onClickSubmit}>Save</EditButtonStyle>
//                 </EditButtonsStyle> */}
//         <AvatarControls
//           moderator={isModerator}
//           userData={userData}
//           oculus_id={oculus_id}
//         />
//       </>
//     );
//   } else {
//     return (
//       <>
//         <AvatarControls
//           moderator={isModerator}
//           userData={userData}
//           oculus_id={oculus_id}
//         />
//       </>
//     );
//   }
// };

interface TeamNameProps {
  allowEdit: boolean
}
const TeamName = ({ allowEdit }: TeamNameProps) => {
  // if (!allowEdit){

  return <div className="padded rounded button">Request team name change</div>;
  // }
};
interface AboutTeamProps {
  team: Team | null;
}

export const AboutTeam = ({ team }: AboutTeamProps) => {
  const { me } = useMe();

  var allowEdit = false;
  if (me?.oculus_id == null) {
    allowEdit = false;
  } else if (me?.oculus_id == team?.admin_id) {
    allowEdit = true;
  } else if (me?.moderator) {
    allowEdit = true;
  }

  var teamFooter = ""
  if (team?.join_date) {
    if (team.join_date < 1633061708) {
      teamFooter = "This team was created before the ECRanked platform was available."
    } else {
      teamFooter = "Joined " + timeDifference(Date.now(), team?.join_date * 1000)

    }
  } else {
    teamFooter = ""
  }

  return (
    <AboutMeStyle>
      <div>
        <ContainerTitle>About Us</ContainerTitle>
      </div>
      <AboutStringBox team={team} />
      {/* <AboutAvatar userData={teamData} oculus_id={oculus_id} /> */}
      <footer>
        {teamFooter}
      </footer>
      <TeamName allowEdit={allowEdit} />
    </AboutMeStyle>
  );
};
